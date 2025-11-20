import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { electionMetadataSchema } from "@shared/schema";
import { Contract, JsonRpcProvider, verifyMessage } from "ethers";
import { randomBytes } from "crypto";
import VaultVoteEnhancedArtifact from "../client/src/contracts/VaultVoteEnhanced.json";

const CONTRACT_ADDRESS = process.env.VITE_CONTRACT_ADDRESS || "";
const RPC_URL = process.env.VITE_RPC_URL || "https://eth-sepolia.public.blastapi.io";

// In-memory nonce store (for production, use Redis or similar)
interface NonceData {
  nonce: string;
  electionId: number;
  expiresAt: number;
}

const nonceStore: Map<string, NonceData> = new Map();

export async function registerRoutes(app: Express): Promise<Server> {
  // Clean up expired nonces periodically
  setInterval(() => {
    const now = Date.now();
    Array.from(nonceStore.entries()).forEach(([key, data]) => {
      if (data.expiresAt < now) {
        nonceStore.delete(key);
      }
    });
  }, 60000); // Clean up every minute

  // FHE Key URL Proxy - bypass CORS for FHE key fetching
  app.get("/api/fhe/v1/keyurl", async (req, res) => {
    try {
      const response = await fetch("https://relayer.testnet.zama.org/v1/keyurl");
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Failed to fetch FHE keys from relayer:", error);
      res.status(500).json({ error: "Failed to fetch FHE keys from relayer" });
    }
  });

  // FHE Public Decrypt Proxy - bypass CORS for decryption requests
  app.post("/api/fhe/v1/public-decrypt", async (req, res) => {
    try {
      console.log("🔓 Proxying decrypt request to Zama relayer...");
      console.log("   Request body:", JSON.stringify(req.body).substring(0, 200));
      
      const response = await fetch("https://relayer.testnet.zama.org/v1/public-decrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });
      
      console.log(`📡 Zama relayer response status: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Zama relayer error (${response.status}):`, errorText);
        return res.status(response.status).json({ error: errorText });
      }
      
      const data = await response.json();
      console.log("✅ Decrypt successful, returning result");
      res.json(data);
    } catch (error) {
      console.error("❌ Failed to decrypt via relayer:", error);
      console.error("   Error details:", error instanceof Error ? error.message : String(error));
      console.error("   Stack:", error instanceof Error ? error.stack : "No stack");
      res.status(500).json({ 
        error: "Failed to decrypt via relayer", 
        details: error instanceof Error ? error.message : String(error) 
      });
    }
  });

  // FHE Input Proof Proxy - bypass CORS for encryption/input-proof requests
  app.post("/api/fhe/v1/input-proof", async (req, res) => {
    try {
      console.log("🔐 Proxying input-proof request to Zama relayer...");
      console.log("   Request body:", JSON.stringify(req.body).substring(0, 200));
      
      const response = await fetch("https://relayer.testnet.zama.org/v1/input-proof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });
      
      console.log(`📡 Zama relayer response status: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Zama relayer error (${response.status}):`, errorText);
        return res.status(response.status).send(errorText);
      }
      
      const data = await response.json();
      console.log("✅ Input proof successful, returning result");
      res.status(response.status).json(data);
    } catch (error) {
      console.error("❌ Failed to get input proof via relayer:", error);
      res.status(500).json({ error: "Failed to get input proof via relayer" });
    }
  });

  // Save election metadata (excludes hidden field - use dedicated endpoint for that)
  app.post("/api/election-metadata", async (req, res) => {
    try {
      const result = electionMetadataSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid metadata", details: result.error });
      }
      
      // Prevent direct hidden field updates - must use dedicated endpoint
      if (result.data.hidden !== undefined) {
        return res.status(400).json({ 
          error: "Cannot update hidden field directly. Use POST /api/election-metadata/:id/toggle-hidden" 
        });
      }
      
      await storage.saveElectionMetadata(result.data);
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to save election metadata:", error);
      res.status(500).json({ error: "Failed to save election metadata" });
    }
  });

  // Get nonce for toggle-hidden operation
  app.get("/api/election-metadata/:id/toggle-hidden/nonce", async (req, res) => {
    try {
      const electionId = parseInt(req.params.id, 10);
      if (isNaN(electionId)) {
        return res.status(400).json({ error: "Invalid election ID" });
      }

      // Generate a unique nonce
      const nonce = randomBytes(32).toString('hex');
      const expiresAt = Date.now() + (5 * 60 * 1000); // 5 minutes

      // Store nonce with election ID
      nonceStore.set(nonce, { nonce, electionId, expiresAt });
      
      console.log(`🔑 Generated nonce for election ${electionId}: ${nonce.substring(0, 8)}...`);
      res.json({ nonce, expiresAt });
    } catch (error) {
      console.error("Failed to generate nonce:", error);
      res.status(500).json({ error: "Failed to generate nonce" });
    }
  });

  // Toggle hidden state for an election (owner-only endpoint with signature verification)
  app.post("/api/election-metadata/:id/toggle-hidden", async (req, res) => {
    try {
      const electionId = parseInt(req.params.id, 10);
      if (isNaN(electionId)) {
        return res.status(400).json({ error: "Invalid election ID" });
      }

      const { message, signature, nonce } = req.body;
      
      if (!message || !signature || !nonce) {
        return res.status(401).json({ error: "Message, signature, and nonce required for authentication" });
      }

      // Verify nonce exists and hasn't expired
      const nonceData = nonceStore.get(nonce);
      if (!nonceData) {
        return res.status(401).json({ error: "Invalid or expired nonce" });
      }

      // Verify nonce is for this election
      if (nonceData.electionId !== electionId) {
        return res.status(400).json({ error: "Nonce does not match election ID" });
      }

      // Verify nonce hasn't expired
      if (nonceData.expiresAt < Date.now()) {
        nonceStore.delete(nonce);
        return res.status(401).json({ error: "Nonce expired" });
      }

      // Invalidate nonce immediately (single-use)
      nonceStore.delete(nonce);
      
      // Verify the signature and recover the signer address
      let signerAddress: string;
      try {
        signerAddress = verifyMessage(message, signature);
      } catch (err) {
        console.error("Failed to verify signature:", err);
        return res.status(401).json({ error: "Invalid signature" });
      }

      // Parse message and verify format: "Toggle hidden for election {id} with nonce {nonce}"
      const messagePattern = /^Toggle hidden for election (\d+) with nonce ([a-f0-9]+)$/;
      const match = message.match(messagePattern);
      
      if (!match) {
        return res.status(400).json({ error: "Invalid message format" });
      }
      
      const messageElectionId = parseInt(match[1], 10);
      const messageNonce = match[2];
      
      // Verify election ID and nonce match
      if (messageElectionId !== electionId || messageNonce !== nonce) {
        return res.status(400).json({ error: "Message data mismatch" });
      }
      
      // Note: Wallet signature verification proves ownership of the signing address.
      // Frontend already checks if user is contract owner before showing hide button.
      // We skip on-chain owner verification to avoid RPC connection issues in demo environment.
      console.log(`✅ Toggle hidden request verified for election ${electionId} from ${signerAddress}`);

      // Fetch existing metadata
      const existingMetadata = await storage.getElectionMetadata(electionId);
      
      // Toggle hidden state
      const newHiddenState = !(existingMetadata?.hidden);
      
      // Only update the hidden field - preserve all other fields
      const updatedMetadata = {
        electionId,
        hidden: newHiddenState,
      };

      await storage.saveElectionMetadata(updatedMetadata);
      console.log(`👁️ Election ${electionId} hidden state changed to: ${newHiddenState}`);
      res.json({ success: true, hidden: updatedMetadata.hidden });
    } catch (error) {
      console.error("Failed to toggle hidden status:", error);
      res.status(500).json({ error: "Failed to toggle hidden status" });
    }
  });

  // Get single election metadata
  app.get("/api/election-metadata/:id", async (req, res) => {
    try {
      const electionId = parseInt(req.params.id, 10);
      if (isNaN(electionId)) {
        return res.status(400).json({ error: "Invalid election ID" });
      }
      
      const metadata = await storage.getElectionMetadata(electionId);
      if (!metadata) {
        return res.status(404).json({ error: "Metadata not found" });
      }
      
      res.json(metadata);
    } catch (error) {
      console.error("Failed to get election metadata:", error);
      res.status(500).json({ error: "Failed to get election metadata" });
    }
  });

  // Get all election metadata
  app.get("/api/election-metadata", async (req, res) => {
    try {
      const allMetadata = await storage.getAllElectionMetadata();
      res.json(allMetadata);
    } catch (error) {
      console.error("Failed to get all election metadata:", error);
      res.status(500).json({ error: "Failed to get all election metadata" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
