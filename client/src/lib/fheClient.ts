import { getAddress, Contract, EventLog } from 'ethers';

type FhevmInstance = any;

declare global {
  interface Window {
    ethereum?: any;
    RelayerSDK?: any;
    relayerSDK?: any;
  }
}

let fhevmInstance: FhevmInstance | null = null;

/**
 * Initialize FH-EVM instance using CDN-loaded RelayerSDK
 * FHEVM 0.9.1 with RelayerSDK 0.3.0-5
 * Matches the working pattern from 0xchriswilder/fhevm-react-template
 */
export async function initFhevm(): Promise<FhevmInstance> {
  if (fhevmInstance) return fhevmInstance;

  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('Ethereum provider not found. Please install MetaMask or connect a wallet.');
  }

  // Check for both uppercase and lowercase versions of RelayerSDK
  let sdk = (window as any).RelayerSDK || (window as any).relayerSDK;
  
  if (!sdk) {
    throw new Error('RelayerSDK not loaded. Please include the script tag in your HTML:\n<script src="https://cdn.zama.org/relayer-sdk-js/0.3.0-5/relayer-sdk-js.umd.cjs"></script>');
  }

  const { initSDK, createInstance, SepoliaConfig } = sdk;

  // Initialize SDK with CDN
  await initSDK();
  console.log('✅ FHEVM SDK initialized with CDN');
  
  // Use backend proxy for relayer to avoid CORS issues in production
  const relayerUrl = window.location.origin + '/api/fhe';
  
  const config = { 
    ...SepoliaConfig, 
    network: window.ethereum,
    relayerUrl: relayerUrl
  };
  
  console.log('🔧 Using relayer proxy:', relayerUrl);
  
  try {
    fhevmInstance = await createInstance(config);
    console.log('✅ FHEVM instance created successfully!');
    return fhevmInstance;
  } catch (err) {
    console.error('FHEVM browser instance creation failed:', err);
    throw err;
  }
}

/**
 * Get the initialized FhevmInstance
 * Throws if not initialized yet
 */
export function getFhevmInstance(): FhevmInstance {
  if (!fhevmInstance) {
    throw new Error("FHE is not initialized yet. Call initFhevm() first.");
  }
  return fhevmInstance;
}

/**
 * Encrypt a zero value (used for initializing election tallies)
 * Requires user address for encryption
 */
export async function encryptZero(
  contractAddress: string,
  userAddress: string
): Promise<{ handles: Uint8Array[]; inputProof: Uint8Array }> {
  console.log("🔐 encryptZero: Initializing FHE instance...");
  const fhe = await initFhevm();
  
  // Checksum addresses to ensure proper format
  const checksummedContract = getAddress(contractAddress);
  const checksummedUser = getAddress(userAddress);
  
  console.log("🔐 encryptZero: Creating encrypted input...");
  const input = fhe.createEncryptedInput(checksummedContract, checksummedUser);
  
  // Add a u32 with value 0
  console.log("🔐 encryptZero: Adding value 0...");
  input.add32(0);
  
  // Encrypt and get the proof
  console.log("🔐 encryptZero: Encrypting...");
  const encryptedInput = await input.encrypt();
  
  console.log("✅ encryptZero: Encryption complete!");
  return {
    handles: encryptedInput.handles,
    inputProof: encryptedInput.inputProof,
  };
}

/**
 * Encrypt a vote choice (1-based index for the chosen option)
 * Requires user address for encryption
 */
export async function encryptVoteChoice(
  contractAddress: string,
  userAddress: string,
  choiceIndex: number
): Promise<{ handles: Uint8Array[]; inputProof: Uint8Array }> {
  console.log("🔐 encryptVoteChoice: Initializing FHE instance...");
  const fhe = await initFhevm();
  
  // Checksum addresses to ensure proper format
  const checksummedContract = getAddress(contractAddress);
  const checksummedUser = getAddress(userAddress);
  
  console.log("🔐 encryptVoteChoice: Creating encrypted input...");
  const input = fhe.createEncryptedInput(checksummedContract, checksummedUser);
  
  // Add a u32 with the choice (1-based index)
  console.log(`🔐 encryptVoteChoice: Adding choice ${choiceIndex}...`);
  input.add32(choiceIndex);
  
  // Encrypt and get the proof
  console.log("🔐 encryptVoteChoice: Encrypting...");
  const encryptedInput = await input.encrypt();
  
  console.log("✅ encryptVoteChoice: Encryption complete!");
  return {
    handles: encryptedInput.handles,
    inputProof: encryptedInput.inputProof,
  };
}

/**
 * Retry helper with exponential backoff
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelayMs: number = 1000
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      
      // Don't retry on the last attempt
      if (attempt === maxRetries) {
        break;
      }
      
      // Check if it's a retryable error (HTTP 500, timeouts, network errors)
      const isRetryable = 
        error?.message?.includes('500') ||
        error?.message?.includes('timeout') ||
        error?.message?.includes('network') ||
        error?.message?.includes('ECONNRESET');
      
      if (!isRetryable) {
        // Non-retryable error, throw immediately
        throw error;
      }
      
      // Calculate delay with exponential backoff
      const delayMs = initialDelayMs * Math.pow(2, attempt);
      console.log(`⏳ Retry attempt ${attempt + 1}/${maxRetries} after ${delayMs}ms...`);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  throw lastError;
}

/**
 * Decrypt a handle using public decryption (FHEVM 0.9.1)
 * This is used after calling requestTallyReveal() on the contract
 * @param handle The encrypted handle (bytes32)
 * @returns Object containing clearValue, abiEncodedClearValues, and decryptionProof
 */
export async function decryptHandle(handle: string): Promise<{
  clearValue: number;
  abiEncodedClearValues: string;
  decryptionProof: string;
}> {
  console.log("🔓 decryptHandle: Calling publicDecrypt...");
  console.log("   Handle:", handle);
  
  // Get the FHEVM instance
  const fhe = await initFhevm();
  
  try {
    // publicDecrypt is a method on the instance, takes an array of handles
    // No retry logic - single attempt only
    const result: any = await fhe.publicDecrypt([handle]);
    
    console.log("🔍 Decryption result type:", typeof result);
    console.log("🔍 Decryption result keys:", result ? Object.keys(result) : 'null/undefined');
    
    // Defensive checks
    if (!result) {
      throw new Error("publicDecrypt returned null or undefined");
    }
    
    // Check clearValues property specifically
    console.log("🔍 result.clearValues exists?", 'clearValues' in result);
    console.log("🔍 result.clearValues type:", typeof result.clearValues);
    console.log("🔍 result.clearValues isArray?", Array.isArray(result.clearValues));
    console.log("🔍 result.clearValues value:", result.clearValues);
    
    // Check if result has the expected structure
    // RelayerSDK might return different structure than expected
    // Try to handle both possible formats
    let clearValue: number;
    let abiEncodedClearValues: string;
    let decryptionProof: string;
    
    // Format 1: { clearValues, abiEncodedClearValues, decryptionProof } (RelayerSDK 0.3.0-5)
    if (result.clearValues !== undefined && result.clearValues !== null) {
      console.log("📋 Result has clearValues property (RelayerSDK format)");
      
      // Check if it's an array
      if (!Array.isArray(result.clearValues)) {
        console.log("⚠️ clearValues is not an array, it's a:", typeof result.clearValues);
        console.log("🔍 clearValues object keys:", Object.keys(result.clearValues));
        
        // clearValues might be an object with numeric keys: { "0": value }
        if (typeof result.clearValues === 'object' && result.clearValues !== null) {
          // Try to get the first value from the object
          const firstKey = Object.keys(result.clearValues)[0];
          if (firstKey !== undefined) {
            clearValue = Number(result.clearValues[firstKey]);
            console.log(`   Extracted value from key "${firstKey}":`, clearValue);
          } else {
            throw new Error("clearValues object is empty");
          }
        } else {
          // Maybe it's a single primitive value?
          clearValue = Number(result.clearValues);
        }
      } else {
        if (result.clearValues.length === 0) {
          throw new Error("publicDecrypt returned empty clearValues array");
        }
        // clearValues contains BigInt, convert to Number
        clearValue = Number(result.clearValues[0]);
      }
      
      abiEncodedClearValues = result.abiEncodedClearValues;
      decryptionProof = result.decryptionProof;
      console.log("   Clear value (converted to number):", clearValue);
    }
    // Format 2: { values, abiEncodedClearValues, decryptionProof } (older format)
    else if (result.values && Array.isArray(result.values)) {
      console.log("📋 Result has values property (older format)");
      if (result.values.length === 0) {
        throw new Error("publicDecrypt returned empty values array");
      }
      clearValue = Number(result.values[0]);
      abiEncodedClearValues = result.abiEncodedClearValues;
      decryptionProof = result.decryptionProof;
    }
    // Format 3: Direct array return [value, abiEncoded, proof]
    else if (Array.isArray(result)) {
      console.log("📋 Result is array format");
      clearValue = Number(result[0]);
      abiEncodedClearValues = result[1];
      decryptionProof = result[2];
    }
    // Unknown format
    else if (typeof result === 'object') {
      console.log("📋 Result is object format with unknown structure");
      throw new Error(`publicDecrypt returned unexpected structure with keys: ${Object.keys(result).join(', ')}`);
    }
    else {
      throw new Error(`publicDecrypt returned unexpected type: ${typeof result}`);
    }
    
    if (!abiEncodedClearValues) {
      throw new Error("publicDecrypt did not return abiEncodedClearValues");
    }
    
    if (!decryptionProof) {
      throw new Error("publicDecrypt did not return decryptionProof");
    }
    
    console.log("✅ decryptHandle: Decryption complete!");
    console.log("   Clear value:", clearValue);
    
    return {
      clearValue,
      abiEncodedClearValues,
      decryptionProof,
    };
  } catch (err: any) {
    console.error("❌ Failed to decrypt handle:", err);
    console.error("   Error message:", err?.message);
    console.error("   Error stack:", err?.stack);
    const errorMessage = err?.message || String(err);
    throw new Error(`Decryption failed: ${errorMessage}`);
  }
}

/**
 * Listen for TallyRevealRequested event and automatically decrypt + submit callback
 * @param contract The VaultVote contract instance
 * @param electionId The election ID to watch
 * @param onDecrypted Callback when decryption is complete
 * @returns Cleanup function to remove the event listener
 */
export async function watchTallyRevealAndDecrypt(
  contract: Contract,
  electionId: number,
  onDecrypted: (clearValue: number) => void
): Promise<() => void> {
  console.log(`👁️ Watching for TallyRevealRequested event for election ${electionId}...`);
  
  let listenerActive = true;
  
  // Create event listener with error handling and cleanup
  const eventHandler = async (id: bigint, tallyHandle: string, event: EventLog) => {
    console.log("🔔 TallyRevealRequested event received!");
    console.log("   Election ID:", id.toString());
    console.log("   Tally Handle:", tallyHandle);
    
    // Only process if it's our election
    if (Number(id) !== electionId) {
      console.log("   Skipping - different election ID");
      return;
    }
    
    if (!listenerActive) {
      console.log("   Skipping - listener was already removed");
      return;
    }
    
    try {
      // Decrypt the handle using publicDecrypt
      console.log("🔓 Decrypting tally...");
      const { clearValue, abiEncodedClearValues, decryptionProof } = await decryptHandle(tallyHandle);
      
      console.log("✅ Decryption successful! Clear value:", clearValue);
      
      // Call the callback with the decrypted value
      if (listenerActive) {
        onDecrypted(clearValue);
      }
      
      // Submit the callback transaction
      console.log("📤 Calling resolveTallyCallback...");
      const tx = await contract.resolveTallyCallback(
        electionId,
        abiEncodedClearValues,
        decryptionProof
      );
      
      console.log("⏳ Waiting for callback transaction confirmation...");
      await tx.wait();
      console.log("✅ Tally revealed and stored on-chain!");
      
      // Cleanup after successful processing
      cleanup();
      
    } catch (err: any) {
      console.error("❌ Failed to decrypt and submit callback:", err);
      // Remove listener on error to prevent stale listeners
      cleanup();
      throw err;
    }
  };
  
  // Attach the event listener using on() for better control
  contract.on("TallyRevealRequested", eventHandler);
  
  // Return cleanup function that can be called manually or automatically
  const cleanup = () => {
    if (!listenerActive) return; // Already cleaned up
    
    listenerActive = false;
    try {
      contract.off("TallyRevealRequested", eventHandler);
      console.log("🧹 Cleaned up TallyRevealRequested event listener");
    } catch (err) {
      console.warn("⚠️ Failed to remove event listener:", err);
    }
  };
  
  return cleanup;
}
