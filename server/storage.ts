import { type ElectionMetadata } from "@shared/schema";
import * as fs from "fs/promises";
import * as path from "path";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  saveElectionMetadata(metadata: ElectionMetadata): Promise<void>;
  getElectionMetadata(electionId: number): Promise<ElectionMetadata | undefined>;
  getAllElectionMetadata(): Promise<ElectionMetadata[]>;
}

export class FileStorage implements IStorage {
  private electionMetadata: Map<number, ElectionMetadata>;
  private dataFile: string;
  private saveTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.electionMetadata = new Map();
    this.dataFile = path.join(process.cwd(), 'election-metadata.json');
    this.loadData();
  }

  private async loadData(): Promise<void> {
    try {
      const data = await fs.readFile(this.dataFile, 'utf-8');
      const metadataArray: ElectionMetadata[] = JSON.parse(data);
      this.electionMetadata = new Map(metadataArray.map(m => [m.electionId, m]));
      console.log(`📂 Loaded ${metadataArray.length} election metadata from file`);
    } catch (error) {
      console.log('📂 No existing metadata file, starting fresh');
    }
  }

  private async saveData(): Promise<void> {
    try {
      const metadataArray = Array.from(this.electionMetadata.values());
      await fs.writeFile(this.dataFile, JSON.stringify(metadataArray, null, 2), 'utf-8');
      console.log(`💾 Saved ${metadataArray.length} election metadata to file`);
    } catch (error) {
      console.error('Failed to save metadata to file:', error);
    }
  }

  private debounceSave(): void {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(() => {
      this.saveData();
    }, 500);
  }

  async saveElectionMetadata(metadata: ElectionMetadata): Promise<void> {
    this.electionMetadata.set(metadata.electionId, metadata);
    this.debounceSave();
  }

  async getElectionMetadata(electionId: number): Promise<ElectionMetadata | undefined> {
    return this.electionMetadata.get(electionId);
  }

  async getAllElectionMetadata(): Promise<ElectionMetadata[]> {
    return Array.from(this.electionMetadata.values());
  }
}

export const storage = new FileStorage();
