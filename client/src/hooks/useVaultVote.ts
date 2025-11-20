import { useState, useEffect } from "react";
import { Contract, BrowserProvider, JsonRpcProvider, Signer, hexlify } from "ethers";
import type { VaultVoteContract, Election, ElectionState, CreateElectionInput } from "@shared/schema";
import { encryptZero, encryptVoteChoice, decryptHandle } from "@/lib/fheClient";
import VaultVoteEnhancedArtifact from "@/contracts/VaultVoteEnhanced.json";

/**
 * VaultVoteEnhanced Contract ABI
 * Imported from compiled contract artifacts to ensure exact type matching
 */
const VAULTVOTE_ABI = VaultVoteEnhancedArtifact.abi;

/**
 * Contract address - update after deployment
 * For development, use local Hardhat network address
 * For production, use deployed contract address on Zama network
 */
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || "";

interface UseVaultVoteResult {
  contract: VaultVoteContract | null;
  isContractReady: boolean;
  owner: string | null;
  createElection: (data: CreateElectionInput) => Promise<void>;
  openElection: (id: number) => Promise<void>;
  closeElection: (id: number) => Promise<void>;
  castVote: (id: number, choiceIndex: number) => Promise<void>;
  requestChoiceReveal: (id: number, choiceIndex: number, onDecrypted?: (clearValue: number) => void) => Promise<void>;
  getElection: (id: number) => Promise<Election | null>;
  getAllElections: () => Promise<Election[]>;
  getRevealedResults: (id: number) => Promise<number[]>;
  getWinner: (id: number) => Promise<{ winningIndex: number; winningVotes: number } | null>;
  hasVoted: (id: number, address: string) => Promise<boolean>;
  getUserVote: (id: number, address: string) => number | null;
}

export function useVaultVote(
  provider: BrowserProvider | JsonRpcProvider | null,
  signer: Signer | null
): UseVaultVoteResult {
  const [readContract, setReadContract] = useState<VaultVoteContract | null>(null);
  const [writeContract, setWriteContract] = useState<VaultVoteContract | null>(null);
  const [owner, setOwner] = useState<string | null>(null);
  const [isContractReady, setIsContractReady] = useState(false);

  // Initialize read-only contract with provider (works without wallet connection)
  useEffect(() => {
    if (!provider || !CONTRACT_ADDRESS) {
      setReadContract(null);
      setIsContractReady(false);
      return;
    }

    try {
      const contract = new Contract(
        CONTRACT_ADDRESS,
        VAULTVOTE_ABI,
        provider
      ) as unknown as VaultVoteContract;

      setReadContract(contract);
      
      // Fetch owner
      contract.owner().then(ownerAddress => {
        setOwner(ownerAddress);
        setIsContractReady(true);
      }).catch(error => {
        console.error("Failed to fetch owner:", error);
        setIsContractReady(false);
      });
    } catch (error) {
      console.error("Failed to initialize read contract:", error);
      setReadContract(null);
      setIsContractReady(false);
    }
  }, [provider]);

  // Initialize write contract with signer (required for mutations)
  useEffect(() => {
    if (!signer || !CONTRACT_ADDRESS) {
      setWriteContract(null);
      return;
    }

    try {
      const contract = new Contract(
        CONTRACT_ADDRESS,
        VAULTVOTE_ABI,
        signer
      ) as unknown as VaultVoteContract;

      setWriteContract(contract);
    } catch (error) {
      console.error("Failed to initialize write contract:", error);
      setWriteContract(null);
    }
  }, [signer]);

  async function createElection(data: CreateElectionInput): Promise<void> {
    console.log("📝 createElection called with:", data);
    
    if (!writeContract || !signer || !readContract) {
      console.error("❌ Wallet not connected");
      throw new Error("Wallet not connected - please connect your wallet to create elections");
    }

    console.log("✅ Write contract and signer available");

    // Get user address for encryption
    const userAddress = await signer.getAddress();
    console.log("👤 User address:", userAddress);

    console.log(`🔐 Encrypting ${data.choiceLabels.length} zero values (one per choice)...`);
    
    // Encrypt one zero for each choice
    const zeroInputs = [];
    const zeroProofs = [];
    
    for (let i = 0; i < data.choiceLabels.length; i++) {
      console.log(`  Encrypting zero for choice ${i + 1}/${data.choiceLabels.length}...`);
      const { handles, inputProof } = await encryptZero(CONTRACT_ADDRESS, userAddress);
      
      console.log(`🔍 Encryption result for choice ${i}:`, { 
        handlesLength: handles.length, 
        handleType: typeof handles[0],
        handleSize: handles[0]?.length || handles[0]?.byteLength,
        proofSize: inputProof?.length || inputProof?.byteLength
      });
      
      if (!handles || handles.length === 0) {
        throw new Error(`Invalid encryption result for choice ${i}: no handles returned`);
      }
      
      const handle = handles[0];
      const handleLength = handle.byteLength || handle.length;
      
      // RelayerSDK returns either 32 bytes (bytes32) or 96 bytes (full handle)
      // Contract expects bytes32, so use first 32 bytes if it's 96, or use as-is if it's 32
      let handleBytes32: string;
      if (handleLength === 32) {
        handleBytes32 = hexlify(handle);
      } else if (handleLength === 96) {
        handleBytes32 = hexlify(handle.slice(0, 32));
      } else {
        throw new Error(`Invalid encryption result for choice ${i}: expected 32 or 96 bytes, got ${handleLength} bytes`);
      }
      
      zeroInputs.push(handleBytes32);
      zeroProofs.push(hexlify(inputProof));
    }
    
    console.log("✅ All zero values encrypted!");
    console.log("📤 Sending transaction to contract...");
    
    // Call enhanced contract with choice labels and encrypted zeros
    const tx = await writeContract.createElection(data.title, data.choiceLabels, zeroInputs, zeroProofs);
    console.log("⏳ Waiting for transaction confirmation...");
    await tx.wait();
    console.log("✅ Transaction confirmed!");
    
    // Get the new election ID (it's the current count - 1 since we just added one)
    const electionCount = await readContract.electionCount();
    const newElectionId = Number(electionCount) - 1;
    console.log("📋 New election ID:", newElectionId);
    
    // Save metadata to backend
    const metadata = {
      electionId: newElectionId,
      description: data.description || undefined,
      votingStartTime: data.votingStartTime || undefined,
      votingEndTime: data.votingEndTime || undefined,
      resultRevealTime: data.resultRevealTime || undefined,
      imageUrl: data.imageUrl || undefined,
    };
    
    try {
      const response = await fetch('/api/election-metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metadata),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to save metadata: ${response.statusText}`);
      }
      
      console.log("💾 Metadata saved to backend for election", newElectionId);
    } catch (error) {
      console.error("Failed to save metadata to backend:", error);
      // Don't throw - election was created successfully, metadata save is secondary
    }
  }

  async function openElection(id: number): Promise<void> {
    if (!writeContract) throw new Error("Wallet not connected - please connect your wallet");
    const tx = await writeContract.openElection(id);
    await tx.wait();
  }

  async function closeElection(id: number): Promise<void> {
    if (!writeContract) {
      console.error("❌ Write contract not available");
      throw new Error("Wallet not connected - please connect your wallet");
    }
    console.log(`🔒 Closing election ${id}...`);
    const tx = await writeContract.closeElection(id);
    await tx.wait();
    console.log(`✅ Election ${id} closed successfully`);
  }

  async function castVote(
    id: number,
    choiceIndex: number
  ): Promise<void> {
    if (!writeContract || !signer) throw new Error("Wallet not connected - please connect your wallet to vote");

    console.log(`🗳️ Casting vote for choice ${choiceIndex}...`);

    // Get user address for encryption
    const userAddress = await signer.getAddress();

    // Encrypt value "1" for the chosen option
    const { handles, inputProof } = await encryptVoteChoice(CONTRACT_ADDRESS, userAddress, 1);
    
    console.log('🔍 Encryption result:', {
      handlesCount: handles.length,
      handle0Length: handles[0]?.length,
      handle0ByteLength: handles[0]?.byteLength,
      handle0Type: typeof handles[0],
      isUint8Array: handles[0] instanceof Uint8Array
    });
    
    if (handles.length !== 1) {
      throw new Error(`Invalid encryption result: expected 1 handle, got ${handles.length}`);
    }
    
    const handle = handles[0];
    
    // Handle might be a Buffer or Uint8Array - check byteLength instead of length
    const handleLength = handle.byteLength || handle.length;
    
    // RelayerSDK returns either 32 bytes (bytes32) or 96 bytes (full handle)
    // Contract expects bytes32, so use first 32 bytes if it's 96, or use as-is if it's 32
    let voteInput: string;
    if (handleLength === 32) {
      // Already bytes32, use as-is
      voteInput = hexlify(handle);
    } else if (handleLength === 96) {
      // Full handle, take first 32 bytes
      voteInput = hexlify(handle.slice(0, 32));
    } else {
      throw new Error(`Invalid encryption result: expected 32 or 96 bytes, got ${handleLength} bytes`);
    }
    
    const proofHex = hexlify(inputProof);
    
    // Enhanced contract: pass id, choiceIndex, encrypted vote, and proof
    const tx = await writeContract.castVote(id, choiceIndex, voteInput, proofHex);
    await tx.wait();
    console.log("✅ Vote cast successfully!");
    
    // Store user's vote in localStorage for later display
    const userVotesKey = `userVotes_${userAddress.toLowerCase()}`;
    const userVotes = JSON.parse(localStorage.getItem(userVotesKey) || '{}');
    userVotes[String(id)] = choiceIndex;
    localStorage.setItem(userVotesKey, JSON.stringify(userVotes));
    console.log(`📝 Stored user vote: Election ${id}, Choice ${choiceIndex}`);
  }

  /**
   * Request reveal for a specific choice
   */
  async function requestChoiceReveal(
    id: number,
    choiceIndex: number,
    onDecrypted?: (clearValue: number) => void
  ): Promise<void> {
    if (!writeContract) throw new Error("Wallet not connected - please connect your wallet");
    
    console.log(`🔔 Requesting reveal for choice ${choiceIndex}...`);
    
    // Listen for ChoiceRevealRequested event
    // Note: Only filter by indexed parameters (id), not non-indexed (choiceIndex)
    // Pass null for non-indexed parameters to avoid filtering on them
    const filter = writeContract.filters.ChoiceRevealRequested(id, null as any);
    
    // Create promise to wait for event and callback completion
    const eventPromise = new Promise<void>((resolve, reject) => {
      const handleEvent = async (event: any) => {
        console.log("📡 ChoiceRevealRequested event received!");
        console.log("   Event object:", event);
        
        // When using filters with ethers.js, the callback receives the event object
        // The event parameters are in event.args array
        // For ChoiceRevealRequested(uint256 indexed electionId, uint256 choiceIndex, bytes32 handle)
        // event.args[0] = electionId
        // event.args[1] = choiceIndex  
        // event.args[2] = handle
        
        const electionId = event.args?.[0];
        const choiceIdx = event.args?.[1];
        const handle = event.args?.[2];
        
        console.log("   Election ID:", electionId?.toString());
        console.log("   Choice Index:", choiceIdx?.toString());
        console.log("   Handle:", handle);
        
        // Filter manually for the specific choiceIndex since it's not indexed
        if (choiceIdx !== undefined && Number(choiceIdx) !== choiceIndex) {
          console.log(`⏭️ Skipping event for different choice: ${choiceIdx} (waiting for ${choiceIndex})`);
          return;
        }
        
        if (!handle) {
          console.error("❌ No handle received in event");
          reject(new Error("No handle received in ChoiceRevealRequested event"));
          return;
        }
        
        try {
          // Decrypt the handle using publicDecrypt
          const { clearValue, abiEncodedClearValues, decryptionProof } = await decryptHandle(handle);
          console.log("✅ Decrypted value:", clearValue);
          
          if (onDecrypted) onDecrypted(clearValue);
          
          // Submit the callback transaction
          console.log("📤 Calling resolveChoiceCallback...");
          const tx = await writeContract.resolveChoiceCallback(
            id,
            choiceIndex,
            abiEncodedClearValues,
            decryptionProof
          );
          await tx.wait();
          console.log("✅ Choice revealed and stored on-chain!");
          
          // Resolve the promise after callback is complete
          resolve();
        } catch (err: any) {
          console.error("❌ Failed to decrypt and submit callback:", err);
          reject(err);
        } finally {
          // Clean up event listener
          writeContract.off(filter, handleEvent);
        }
      };
      
      // Set up event listener BEFORE sending the transaction
      writeContract.on(filter, handleEvent);
    });
    
    try {
      // Request the reveal
      const tx = await writeContract.requestChoiceReveal(id, choiceIndex);
      await tx.wait();
      console.log("✅ RequestChoiceReveal transaction confirmed!");
      
      // Wait for the event and callback to complete
      await eventPromise;
    } catch (err: any) {
      // Clean up listener on error
      writeContract.off(filter, undefined as any);
      throw err;
    }
  }

  async function getElection(id: number): Promise<Election | null> {
    if (!readContract) return null;

    try {
      const [title, choiceLabels, state, fullyRevealed] = await readContract.getElection(id);

      console.log(`📊 Election ${id} data:`, {
        title,
        state: Number(state),
        fullyRevealed,
        choicesCount: choiceLabels.length
      });

      // Fetch metadata from backend
      let metadata: any = {};
      try {
        const response = await fetch(`/api/election-metadata/${id}`);
        if (response.ok) {
          metadata = await response.json();
        }
      } catch (error) {
        console.warn(`Failed to fetch metadata for election ${id}:`, error);
        // Continue without metadata
      }
      
      const election: Election = {
        id,
        title,
        choices: choiceLabels.length,
        choiceLabels,
        state: Number(state) as ElectionState,
        fullyRevealed,
        description: metadata.description,
        votingStartTime: metadata.votingStartTime,
        votingEndTime: metadata.votingEndTime,
        resultRevealTime: metadata.resultRevealTime,
        imageUrl: metadata.imageUrl,
        hidden: metadata.hidden,
      };

      // Fetch revealed results and winner if fully revealed
      if (fullyRevealed) {
        try {
          const results = await readContract.getRevealedResults(id);
          election.revealedResults = results.map((r: bigint) => r.toString());
          console.log(`✅ Results for election ${id}:`, election.revealedResults);
          
          const [winningIndex, _] = await readContract.getWinner(id);
          const idx = Number(winningIndex);
          if (idx >= 0 && idx < choiceLabels.length) {
            election.winner = choiceLabels[idx];
            console.log(`🏆 Winner for election ${id}:`, election.winner);
          }
        } catch (err) {
          console.error(`Failed to fetch results/winner for election ${id}:`, err);
        }
      }

      return election;
    } catch (error) {
      console.error(`Failed to fetch election ${id}:`, error);
      return null;
    }
  }

  async function getRevealedResults(id: number): Promise<number[]> {
    if (!readContract) return [];
    
    try {
      const results = await readContract.getRevealedResults(id);
      return results.map((r: bigint) => Number(r));
    } catch (error) {
      console.error(`Failed to fetch revealed results for election ${id}:`, error);
      return [];
    }
  }

  async function getWinner(id: number): Promise<{ winningIndex: number; winningVotes: number } | null> {
    if (!readContract) return null;
    
    try {
      const [winningIndex, winningVotes] = await readContract.getWinner(id);
      return {
        winningIndex: Number(winningIndex),
        winningVotes: Number(winningVotes),
      };
    } catch (error) {
      console.error(`Failed to fetch winner for election ${id}:`, error);
      return null;
    }
  }

  async function getAllElections(): Promise<Election[]> {
    if (!readContract) return [];

    try {
      const count = await readContract.electionCount();
      
      // Fetch all metadata at once for efficiency
      let allMetadata: Record<number, any> = {};
      try {
        const response = await fetch('/api/election-metadata');
        if (response.ok) {
          const metadataArray = await response.json();
          console.log('📦 Fetched metadata from API:', metadataArray);
          // Convert array to map for quick lookup
          allMetadata = metadataArray.reduce((acc: any, m: any) => {
            acc[m.electionId] = m;
            return acc;
          }, {});
          console.log('🗺️ Metadata map:', allMetadata);
        } else {
          console.warn('Failed to fetch metadata, status:', response.status);
        }
      } catch (error) {
        console.warn("Failed to fetch all metadata:", error);
        // Continue without metadata
      }
      
      const elections: Election[] = [];

      for (let i = 0; i < Number(count); i++) {
        try {
          const [title, choiceLabels, state, fullyRevealed] = await readContract.getElection(i);
          
          // Get metadata from the pre-fetched map
          const metadata = allMetadata[i] || {};
          
          const election: Election = {
            id: i,
            title,
            choices: choiceLabels.length,
            choiceLabels,
            state: Number(state) as ElectionState,
            fullyRevealed,
            description: metadata.description,
            votingStartTime: metadata.votingStartTime,
            votingEndTime: metadata.votingEndTime,
            resultRevealTime: metadata.resultRevealTime,
            imageUrl: metadata.imageUrl,
            hidden: metadata.hidden,
          };
          
          console.log(`🔍 Election ${i} loaded with hidden=${metadata.hidden}`);

          // Fetch revealed results and winner if fully revealed
          if (fullyRevealed) {
            try {
              const results = await readContract.getRevealedResults(i);
              election.revealedResults = results.map((r: bigint) => r.toString());
              
              const [winningIndex, _] = await readContract.getWinner(i);
              const idx = Number(winningIndex);
              if (idx >= 0 && idx < choiceLabels.length) {
                election.winner = choiceLabels[idx];
              }
            } catch (err) {
              console.error(`Failed to fetch results/winner for election ${i}:`, err);
            }
          }
          
          elections.push(election);
        } catch (error) {
          console.error(`Failed to fetch election ${i}:`, error);
        }
      }

      return elections;
    } catch (error) {
      console.error("Failed to fetch elections:", error);
      return [];
    }
  }

  async function hasVoted(id: number, address: string): Promise<boolean> {
    if (!readContract) return false;
    try {
      return await readContract.hasVoted(id, address);
    } catch (error) {
      return false;
    }
  }

  function getUserVote(id: number, address: string): number | null {
    try {
      const userVotesKey = `userVotes_${address.toLowerCase()}`;
      const userVotes = JSON.parse(localStorage.getItem(userVotesKey) || '{}');
      const voteIndex = userVotes[String(id)];
      // Defensive check: ensure vote index is a valid number
      if (typeof voteIndex === 'number' && voteIndex >= 0) {
        return voteIndex;
      }
      return null;
    } catch (error) {
      console.error('Failed to get user vote from localStorage:', error);
      return null;
    }
  }

  return {
    contract: writeContract || readContract,
    isContractReady,
    owner,
    createElection,
    openElection,
    closeElection,
    castVote,
    requestChoiceReveal,
    getElection,
    getAllElections,
    getRevealedResults,
    getWinner,
    hasVoted,
    getUserVote,
  };
}
