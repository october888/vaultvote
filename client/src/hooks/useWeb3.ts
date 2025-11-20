import { useState, useEffect } from "react";
import { BrowserProvider, JsonRpcProvider, Signer } from "ethers";
import type { WalletState } from "@shared/schema";
import { initFhevm } from "@/lib/fheClient";

// Default RPC URL for read-only access when no wallet is connected
// Always use Sepolia RPC for production deployment
const DEFAULT_RPC_URL = import.meta.env.VITE_RPC_URL || "https://eth-sepolia.public.blastapi.io";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function useWeb3() {
  const [provider, setProvider] = useState<BrowserProvider | JsonRpcProvider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    isOwner: false,
    chainId: null,
  });

  useEffect(() => {
    async function initializeProvider() {
      if (typeof window !== 'undefined' && window.ethereum) {
        // Just set up read-only provider initially
        // User must click "Connect Wallet" to actually connect
        const rpcProvider = new JsonRpcProvider(DEFAULT_RPC_URL);
        setProvider(rpcProvider);

        // Listen for account changes
        window.ethereum.on?.('accountsChanged', async (accounts: string[]) => {
          if (accounts.length === 0) {
            disconnect();
          } else {
            // Silently update to new account without re-requesting
            try {
              const browserProvider = new BrowserProvider(window.ethereum);
              const newSigner = await browserProvider.getSigner();
              const address = await newSigner.getAddress();
              const network = await browserProvider.getNetwork();
              
              setProvider(browserProvider);
              setSigner(newSigner);
              setWalletState({
                address,
                isConnected: true,
                isOwner: false,
                chainId: Number(network.chainId),
              });
            } catch (error) {
              console.error("Failed to update account:", error);
              disconnect();
            }
          }
        });

        // Listen for chain changes
        window.ethereum.on?.('chainChanged', () => {
          window.location.reload();
        });
      } else {
        // No wallet available - use default JSON-RPC provider for read-only access
        try {
          const rpcProvider = new JsonRpcProvider(DEFAULT_RPC_URL);
          setProvider(rpcProvider);
        } catch (error) {
          console.warn("Failed to initialize default RPC provider:", error);
        }
      }
    }
    
    initializeProvider();
  }, []);

  async function connectWallet() {
    if (!window.ethereum) {
      console.error("No window.ethereum found");
      throw new Error("No Web3 provider found. Please install MetaMask.");
    }
    
    try {
      const browserProvider = new BrowserProvider(window.ethereum);
      setProvider(browserProvider);
      
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      
      const newSigner = await browserProvider.getSigner();
      setSigner(newSigner);

      const address = await newSigner.getAddress();
      const network = await browserProvider.getNetwork();

      const currentChainId = Number(network.chainId);
      const expectedChainId = Number(import.meta.env.VITE_CHAIN_ID || 11155111);

      // Check if user is on the correct network
      if (currentChainId !== expectedChainId) {
        try {
          // Try to switch to Sepolia network
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${expectedChainId.toString(16)}` }],
          });
          
          // Reload to reinitialize with correct network
          window.location.reload();
          return;
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: `0x${expectedChainId.toString(16)}`,
                  chainName: 'Sepolia Testnet',
                  nativeCurrency: {
                    name: 'Sepolia ETH',
                    symbol: 'ETH',
                    decimals: 18,
                  },
                  rpcUrls: [import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/'],
                  blockExplorerUrls: ['https://sepolia.etherscan.io'],
                }],
              });
              
              // Reload to reinitialize with correct network
              window.location.reload();
              return;
            } catch (addError) {
              throw new Error('Failed to add Sepolia network to MetaMask. Please add it manually.');
            }
          }
          throw new Error('Please switch to Sepolia network in MetaMask.');
        }
      }

      // Initialize FHE instance for encryption/decryption
      try {
        await initFhevm();
      } catch (fheError) {
        console.error("⚠️ Failed to initialize FHE:", fheError);
        // Continue wallet connection even if FHE init fails
      }

      setWalletState({
        address,
        isConnected: true,
        isOwner: false, // Will be updated when contract is loaded
        chainId: currentChainId,
      });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    }
  }

  function disconnect() {
    setSigner(null);
    setWalletState({
      address: null,
      isConnected: false,
      isOwner: false,
      chainId: null,
    });
    
    // Reset to read-only provider
    try {
      const rpcProvider = new JsonRpcProvider(DEFAULT_RPC_URL);
      setProvider(rpcProvider);
    } catch (error) {
      console.warn("Failed to reset to read-only provider:", error);
    }
  }

  function updateOwnerStatus(isOwner: boolean) {
    setWalletState(prev => ({ ...prev, isOwner }));
  }

  function truncateAddress(address: string): string {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  async function switchNetwork() {
    if (!window.ethereum) {
      throw new Error("No Web3 provider found. Please install MetaMask.");
    }

    const expectedChainId = Number(import.meta.env.VITE_CHAIN_ID || 11155111);

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${expectedChainId.toString(16)}` }],
      });
      window.location.reload();
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${expectedChainId.toString(16)}`,
              chainName: 'Sepolia Testnet',
              nativeCurrency: {
                name: 'Sepolia ETH',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: [import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/'],
              blockExplorerUrls: ['https://sepolia.etherscan.io'],
            }],
          });
          window.location.reload();
        } catch (addError) {
          throw new Error('Failed to add Sepolia network to MetaMask.');
        }
      } else {
        throw switchError;
      }
    }
  }

  return {
    provider,
    signer,
    walletState,
    connectWallet,
    disconnect,
    updateOwnerStatus,
    truncateAddress,
    switchNetwork,
  };
}
