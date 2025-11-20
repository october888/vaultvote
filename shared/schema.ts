import { z } from "zod";

// Election state enum matching Solidity
export enum ElectionState {
  Created = 0,
  Open = 1,
  Closed = 2,
  Revealed = 3
}

// Election data structure (Enhanced)
export const electionSchema = z.object({
  id: z.number(),
  title: z.string(),
  choices: z.number(),
  choiceLabels: z.array(z.string()),
  state: z.nativeEnum(ElectionState),
  fullyRevealed: z.boolean(),
  revealedResults: z.array(z.string()).optional(),
  winner: z.string().optional(),
  votingStartTime: z.string().optional(),
  votingEndTime: z.string().optional(),
  resultRevealTime: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  hidden: z.boolean().optional(),
});

export type Election = z.infer<typeof electionSchema>;

// Form schemas for creating elections
export const createElectionSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  choiceLabels: z
    .array(z.string().min(1, "Choice label cannot be empty").trim())
    .min(2, "Must have at least 2 choices")
    .max(10, "Maximum 10 choices allowed"),
  votingStartTime: z.string().optional(),
  votingEndTime: z.string().optional(),
  resultRevealTime: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type CreateElectionInput = z.infer<typeof createElectionSchema>;

// Election metadata (stored separately from contract)
export const electionMetadataSchema = z.object({
  electionId: z.number(),
  description: z.string().optional(),
  votingStartTime: z.string().optional(),
  votingEndTime: z.string().optional(),
  resultRevealTime: z.string().optional(),
  imageUrl: z.string().optional(),
  hidden: z.boolean().optional(),
});

export type ElectionMetadata = z.infer<typeof electionMetadataSchema>;

// Form schemas for casting votes
export const castVoteSchema = z.object({
  electionId: z.number(),
  choiceIndex: z.number(),
});

export type CastVoteInput = z.infer<typeof castVoteSchema>;

// Wallet connection state
export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isOwner: boolean;
  chainId: number | null;
}

// Transaction status
export interface TransactionStatus {
  isPending: boolean;
  hash: string | null;
  error: string | null;
}

// Contract interaction types (Enhanced)
export interface VaultVoteContract {
  electionCount(): Promise<number>;
  getElection(id: number): Promise<[string, string[], number, boolean]>;
  getRevealedResults(id: number): Promise<bigint[]>;
  getWinner(id: number): Promise<[bigint, number]>;
  createElection(
    title: string,
    choiceLabels: string[],
    zeroInputs: string[],
    zeroProofs: string[]
  ): Promise<any>;
  openElection(id: number): Promise<any>;
  closeElection(id: number): Promise<any>;
  castVote(
    id: number,
    choiceIndex: number,
    voteInput: string,
    voteProof: string
  ): Promise<any>;
  requestChoiceReveal(id: number, choiceIndex: number): Promise<any>;
  resolveChoiceCallback(
    id: number,
    choiceIndex: number,
    cleartexts: string,
    decryptionProof: string
  ): Promise<any>;
  hasVoted(id: number, address: string): Promise<boolean>;
  owner(): Promise<string>;
  on(eventName: any, listener: (...args: any[]) => void): void;
  off(eventName: any, listener: (...args: any[]) => void): void;
  filters: {
    ChoiceRevealRequested(id: number, choiceIndex: number): any;
  };
}
