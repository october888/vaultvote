// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;

import { FHE, euint32, externalEuint32 } from "@fhevm/solidity/lib/FHE.sol";
import { ZamaEthereumConfig } from "@fhevm/solidity/config/ZamaConfig.sol";

/**
 * VaultVote.sol
 * Private Voting Booth for Zama Dev Program
 * 
 * This contract demonstrates a complete private voting system using Zama's FHEVM where:
 * - Votes are encrypted client-side using FHE
 * - The contract performs homomorphic addition on encrypted votes
 * - Results remain encrypted until admin reveals them
 * - No plaintext votes ever exist on-chain
 */
contract VaultVote is ZamaEthereumConfig {
    address public owner;

    enum ElectionState { Created, Open, Closed, Revealed }

    struct Election {
        string title;
        uint256 choices;             // number of choices
        ElectionState state;
        euint32 encryptedTally;      // encrypted sum of all votes
        string revealedResult;       // plaintext results after decryption
        bool revealRequested;        // tracks if reveal has been requested (FHEVM 0.9.1)
        bytes32 expectedTallyHandle; // handle that was requested for reveal (FHEVM 0.9.1 security)
        mapping(address => bool) hasVoted;
    }

    mapping(uint256 => Election) public elections;
    uint256 public electionCount;

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner");
        _;
    }

    event ElectionCreated(uint256 indexed id, string title, uint256 choices);
    event ElectionOpened(uint256 indexed id);
    event ElectionClosed(uint256 indexed id);
    event VoteCast(uint256 indexed id, address voter);
    event TallyUpdated(uint256 indexed id);
    event TallyRevealRequested(uint256 indexed id, bytes32 tallyHandle);
    event TallyRevealed(uint256 indexed id, string plaintextResult);

    constructor() {
        owner = msg.sender;
    }

    /**
     * Create a new election with encrypted zero tally
     * @param title Election title
     * @param choices Number of voting choices
     * @param zeroInput Encrypted zero value from client (externalEuint32)
     * @param zeroProof Zero-knowledge proof for the encrypted zero
     */
    function createElection(
        string calldata title,
        uint256 choices,
        externalEuint32 zeroInput,
        bytes calldata zeroProof
    ) external onlyOwner returns (uint256) {
        require(choices > 0, "choices>0");
        
        uint256 id = electionCount++;
        Election storage e = elections[id];
        e.title = title;
        e.choices = choices;
        e.state = ElectionState.Created;
        e.revealRequested = false;  // Initialize reveal flag (FHEVM 0.9.1)
        
        // Initialize encrypted tally from external input with ZK proof verification
        e.encryptedTally = FHE.fromExternal(zeroInput, zeroProof);
        
        // Grant access to contract
        FHE.allowThis(e.encryptedTally);
        
        emit ElectionCreated(id, title, choices);
        return id;
    }

    /**
     * Open an election for voting
     */
    function openElection(uint256 id) external onlyOwner {
        Election storage e = elections[id];
        require(e.state == ElectionState.Created, "invalid state");
        e.state = ElectionState.Open;
        emit ElectionOpened(id);
    }

    /**
     * Close an election (no more votes accepted)
     */
    function closeElection(uint256 id) external onlyOwner {
        Election storage e = elections[id];
        require(e.state == ElectionState.Open, "not open");
        e.state = ElectionState.Closed;
        emit ElectionClosed(id);
    }

    /**
     * Cast an encrypted vote
     * @param id Election ID
     * @param voteInput Encrypted vote value from client (externalEuint32)
     * @param voteProof Zero-knowledge proof for the encrypted vote
     */
    function castVote(
        uint256 id,
        externalEuint32 voteInput,
        bytes calldata voteProof
    ) external {
        Election storage e = elections[id];
        require(e.state == ElectionState.Open, "election not open");
        require(!e.hasVoted[msg.sender], "already voted");

        // Convert external encrypted input to euint32 (with ZK proof verification)
        euint32 vote = FHE.fromExternal(voteInput, voteProof);
        
        // Perform homomorphic addition of encrypted votes
        e.encryptedTally = FHE.add(e.encryptedTally, vote);
        
        // Grant access permissions
        FHE.allowThis(e.encryptedTally);
        FHE.allow(e.encryptedTally, owner); // Allow owner to decrypt

        e.hasVoted[msg.sender] = true;
        emit VoteCast(id, msg.sender);
        emit TallyUpdated(id);
    }

    /**
     * Get the encrypted tally handle (for re-encryption or decryption)
     * @param id Election ID
     * @return The encrypted tally as euint32 handle
     */
    function getEncryptedTally(uint256 id) external view returns (euint32) {
        return elections[id].encryptedTally;
    }

    /**
     * Request tally reveal (FHEVM 0.9.1 self-relaying decryption pattern)
     * Makes the encrypted tally publicly decryptable and emits event for frontend
     * Frontend will listen to this event, decrypt using publicDecrypt(), and call resolveTallyCallback()
     * @param id Election ID
     */
    function requestTallyReveal(uint256 id) external onlyOwner {
        Election storage e = elections[id];
        require(e.state == ElectionState.Closed, "must be closed");
        require(!e.revealRequested, "reveal already requested");
        
        // CRITICAL: Make handle publicly decryptable so publicDecrypt() can be used
        // This is safe because voting has ended and only owner can request reveal
        e.encryptedTally = FHE.makePubliclyDecryptable(e.encryptedTally);
        
        // Store the expected handle for verification in resolveTallyCallback
        bytes32 tallyHandle = FHE.toBytes32(e.encryptedTally);
        e.expectedTallyHandle = tallyHandle;
        
        // Mark as requested to prevent duplicate requests
        e.revealRequested = true;
        
        // Emit event with handle - frontend will pick this up and decrypt
        emit TallyRevealRequested(id, tallyHandle);
    }
    
    /**
     * Resolve tally callback (FHEVM 0.9.1 self-relaying decryption pattern)
     * Called by anyone after decrypting the tally using publicDecrypt()
     * Verifies the decryption proof and stores the plaintext result
     * Note: No access control needed since the proof verification ensures correctness
     * @param id Election ID
     * @param cleartexts ABI-encoded decrypted values
     * @param decryptionProof Proof of correct decryption
     */
    function resolveTallyCallback(
        uint256 id,
        bytes memory cleartexts,
        bytes memory decryptionProof
    ) external {
        require(id < electionCount, "invalid election");
        Election storage e = elections[id];
        require(e.revealRequested, "reveal not requested");
        require(e.state == ElectionState.Closed, "must be closed");
        require(e.state != ElectionState.Revealed, "already revealed"); // Prevent re-revelation
        
        // Prepare handles list for verification - MUST use the stored expected handle
        bytes32[] memory handlesList = new bytes32[](1);
        handlesList[0] = e.expectedTallyHandle;
        
        // CRITICAL: Verify the decryption proof using FHEVM 0.9.1 API
        // This cryptographically ensures the plaintext matches the encrypted value
        // The proof MUST match the stored expectedTallyHandle to prevent replay/forgery attacks
        FHE.checkSignatures(handlesList, cleartexts, decryptionProof);
        
        // Decode the plaintext tally - proof verification guarantees this is correct
        uint32 revealedTally = abi.decode(cleartexts, (uint32));
        
        // Store result and update state
        e.state = ElectionState.Revealed;
        e.revealedResult = string(abi.encodePacked(revealedTally));
        
        emit TallyRevealed(id, e.revealedResult);
    }

    /**
     * Get election info
     */
    function getElection(uint256 id) external view returns (
        string memory title,
        uint256 choices,
        ElectionState state,
        string memory revealedResult
    ) {
        Election storage e = elections[id];
        return (e.title, e.choices, e.state, e.revealedResult);
    }

    /**
     * Check if an address has voted
     */
    function hasVoted(uint256 id, address voter) external view returns (bool) {
        return elections[id].hasVoted[voter];
    }
}
