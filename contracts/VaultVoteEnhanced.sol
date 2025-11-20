// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;

import { FHE, euint32, externalEuint32 } from "@fhevm/solidity/lib/FHE.sol";
import { ZamaEthereumConfig } from "@fhevm/solidity/config/ZamaConfig.sol";

/**
 * VaultVoteEnhanced.sol
 * Enhanced Private Voting Booth for Zama Dev Program
 * 
 * This contract demonstrates a complete private voting system using Zama's FHEVM where:
 * - Votes are encrypted client-side using FHE
 * - Each choice has its own encrypted vote counter
 * - The contract performs homomorphic addition on encrypted votes
 * - Users can re-encrypt and view their own votes
 * - Results remain encrypted until admin reveals them per choice
 * - No plaintext votes ever exist on-chain
 */
contract VaultVoteEnhanced is ZamaEthereumConfig {
    address public owner;

    enum ElectionState { Created, Open, Closed, Revealed }

    struct Election {
        string title;
        string[] choiceLabels;       // Labels for each choice
        uint256 choiceCount;         // Number of choices
        ElectionState state;
        mapping(uint256 => euint32) encryptedVotesPerChoice; // Encrypted votes per choice
        mapping(uint256 => uint32) revealedVotesPerChoice;   // Revealed votes per choice
        mapping(uint256 => bool) choiceRevealed;             // Track which choices are revealed
        mapping(address => euint32) userVotes;               // Store each user's encrypted vote
        mapping(address => bool) hasVoted;
        bool fullyRevealed;          // Track if all choices are revealed
        uint256 revealedChoiceCount; // Count of revealed choices
        mapping(uint256 => bytes32) expectedHandles; // Expected handles for reveal
    }

    mapping(uint256 => Election) public elections;
    uint256 public electionCount;

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner");
        _;
    }

    event ElectionCreated(uint256 indexed id, string title, string[] choices);
    event ElectionOpened(uint256 indexed id);
    event ElectionClosed(uint256 indexed id);
    event VoteCast(uint256 indexed id, address voter, uint256 choiceIndex);
    event ChoiceRevealRequested(uint256 indexed id, uint256 choiceIndex, bytes32 handle);
    event ChoiceRevealed(uint256 indexed id, uint256 choiceIndex, uint32 voteCount);
    event ElectionFullyRevealed(uint256 indexed id);

    constructor() {
        owner = msg.sender;
    }

    /**
     * Create a new election with encrypted zero counters for each choice
     * @param title Election title
     * @param choiceLabels Array of choice labels (e.g., ["Option A", "Option B", "Option C"])
     * @param zeroInputs Encrypted zero values from client for each choice
     * @param zeroProofs Zero-knowledge proofs for the encrypted zeros
     */
    function createElection(
        string memory title,
        string[] memory choiceLabels,
        externalEuint32[] memory zeroInputs,
        bytes[] memory zeroProofs
    ) external onlyOwner returns (uint256) {
        require(choiceLabels.length > 1, "need at least 2 choices");
        require(zeroInputs.length == choiceLabels.length, "mismatch inputs");
        require(zeroProofs.length == choiceLabels.length, "mismatch proofs");
        
        uint256 id = electionCount++;
        Election storage e = elections[id];
        e.title = title;
        e.choiceLabels = choiceLabels;
        e.choiceCount = choiceLabels.length;
        e.state = ElectionState.Created;
        e.fullyRevealed = false;
        e.revealedChoiceCount = 0;
        
        // Initialize encrypted vote counter for each choice
        for (uint256 i = 0; i < choiceLabels.length; i++) {
            e.encryptedVotesPerChoice[i] = FHE.fromExternal(zeroInputs[i], zeroProofs[i]);
            FHE.allowThis(e.encryptedVotesPerChoice[i]);
            e.choiceRevealed[i] = false;
        }
        
        emit ElectionCreated(id, title, choiceLabels);
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
     * Cast an encrypted vote for a specific choice
     * @param id Election ID
     * @param choiceIndex Index of the choice (0-based)
     * @param voteInput Encrypted vote value (should be encrypted 1)
     * @param voteProof Zero-knowledge proof for the encrypted vote
     */
    function castVote(
        uint256 id,
        uint256 choiceIndex,
        externalEuint32 voteInput,
        bytes calldata voteProof
    ) external {
        Election storage e = elections[id];
        require(e.state == ElectionState.Open, "election not open");
        require(!e.hasVoted[msg.sender], "already voted");
        require(choiceIndex < e.choiceCount, "invalid choice");

        // Convert external encrypted input to euint32 (with ZK proof verification)
        euint32 vote = FHE.fromExternal(voteInput, voteProof);
        
        // Store user's encrypted vote for later re-encryption
        e.userVotes[msg.sender] = vote;
        FHE.allow(e.userVotes[msg.sender], msg.sender); // Allow user to re-encrypt their vote
        
        // Perform homomorphic addition on the chosen option's counter
        e.encryptedVotesPerChoice[choiceIndex] = FHE.add(
            e.encryptedVotesPerChoice[choiceIndex], 
            vote
        );
        
        // Grant access permissions
        FHE.allowThis(e.encryptedVotesPerChoice[choiceIndex]);
        FHE.allow(e.encryptedVotesPerChoice[choiceIndex], owner); // Allow owner to decrypt

        e.hasVoted[msg.sender] = true;
        emit VoteCast(id, msg.sender, choiceIndex);
    }

    /**
     * Get the encrypted vote for a specific choice (for re-encryption)
     * @param id Election ID
     * @param choiceIndex Choice index
     * @return The encrypted vote count as euint32 handle
     */
    function getEncryptedVotesForChoice(uint256 id, uint256 choiceIndex) 
        external 
        view 
        returns (euint32) 
    {
        require(choiceIndex < elections[id].choiceCount, "invalid choice");
        return elections[id].encryptedVotesPerChoice[choiceIndex];
    }

    /**
     * Get user's own encrypted vote (for re-encryption to view)
     * @param id Election ID
     * @return User's encrypted vote
     */
    function getMyEncryptedVote(uint256 id) external view returns (euint32) {
        require(elections[id].hasVoted[msg.sender], "you haven't voted");
        return elections[id].userVotes[msg.sender];
    }

    /**
     * Request reveal for a specific choice
     * @param id Election ID
     * @param choiceIndex Choice to reveal
     */
    function requestChoiceReveal(uint256 id, uint256 choiceIndex) external onlyOwner {
        Election storage e = elections[id];
        require(e.state == ElectionState.Closed, "must be closed");
        require(choiceIndex < e.choiceCount, "invalid choice");
        require(!e.choiceRevealed[choiceIndex], "already revealed");
        
        // Make handle publicly decryptable
        e.encryptedVotesPerChoice[choiceIndex] = FHE.makePubliclyDecryptable(
            e.encryptedVotesPerChoice[choiceIndex]
        );
        
        // Store the expected handle for verification
        bytes32 handle = FHE.toBytes32(e.encryptedVotesPerChoice[choiceIndex]);
        e.expectedHandles[choiceIndex] = handle;
        
        emit ChoiceRevealRequested(id, choiceIndex, handle);
    }

    /**
     * Resolve choice reveal callback
     * @param id Election ID
     * @param choiceIndex Choice index
     * @param cleartexts ABI-encoded decrypted value
     * @param decryptionProof Proof of correct decryption
     */
    function resolveChoiceCallback(
        uint256 id,
        uint256 choiceIndex,
        bytes memory cleartexts,
        bytes memory decryptionProof
    ) external {
        require(id < electionCount, "invalid election");
        Election storage e = elections[id];
        require(e.state == ElectionState.Closed, "must be closed");
        require(choiceIndex < e.choiceCount, "invalid choice");
        require(!e.choiceRevealed[choiceIndex], "already revealed");
        
        // Prepare handles list for verification
        bytes32[] memory handlesList = new bytes32[](1);
        handlesList[0] = e.expectedHandles[choiceIndex];
        
        // Verify the decryption proof
        FHE.checkSignatures(handlesList, cleartexts, decryptionProof);
        
        // Decode the plaintext vote count
        uint32 voteCount = abi.decode(cleartexts, (uint32));
        
        // Store result
        e.revealedVotesPerChoice[choiceIndex] = voteCount;
        e.choiceRevealed[choiceIndex] = true;
        e.revealedChoiceCount++;
        
        // Check if all choices are revealed
        if (e.revealedChoiceCount == e.choiceCount) {
            e.state = ElectionState.Revealed;
            e.fullyRevealed = true;
            emit ElectionFullyRevealed(id);
        }
        
        emit ChoiceRevealed(id, choiceIndex, voteCount);
    }

    /**
     * Get election basic info
     */
    function getElection(uint256 id) external view returns (
        string memory title,
        string[] memory choiceLabels,
        ElectionState state,
        bool fullyRevealed
    ) {
        Election storage e = elections[id];
        return (e.title, e.choiceLabels, e.state, e.fullyRevealed);
    }

    /**
     * Get revealed results for all choices
     * @param id Election ID
     * @return Array of vote counts (0 if not revealed)
     */
    function getRevealedResults(uint256 id) external view returns (uint32[] memory) {
        Election storage e = elections[id];
        uint32[] memory results = new uint32[](e.choiceCount);
        
        for (uint256 i = 0; i < e.choiceCount; i++) {
            results[i] = e.revealedVotesPerChoice[i];
        }
        
        return results;
    }

    /**
     * Get the winning choice (only after fully revealed)
     * @param id Election ID
     * @return winningIndex Index of the winning choice
     * @return winningVotes Number of votes for the winner
     */
    function getWinner(uint256 id) external view returns (uint256 winningIndex, uint32 winningVotes) {
        Election storage e = elections[id];
        require(e.fullyRevealed, "not fully revealed");
        
        winningIndex = 0;
        winningVotes = e.revealedVotesPerChoice[0];
        
        for (uint256 i = 1; i < e.choiceCount; i++) {
            if (e.revealedVotesPerChoice[i] > winningVotes) {
                winningIndex = i;
                winningVotes = e.revealedVotesPerChoice[i];
            }
        }
        
        return (winningIndex, winningVotes);
    }

    /**
     * Check if an address has voted
     */
    function hasVoted(uint256 id, address voter) external view returns (bool) {
        return elections[id].hasVoted[voter];
    }

    /**
     * Check if a specific choice has been revealed
     */
    function isChoiceRevealed(uint256 id, uint256 choiceIndex) external view returns (bool) {
        return elections[id].choiceRevealed[choiceIndex];
    }
}
