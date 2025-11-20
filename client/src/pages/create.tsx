import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useWeb3 } from "@/hooks/useWeb3";
import { useVaultVote } from "@/hooks/useVaultVote";
import { WalletConnect } from "@/components/WalletConnect";
import { CreateElectionForm } from "@/components/CreateElectionForm";
import { EmptyState } from "@/components/EmptyState";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import type { CreateElectionInput } from "@shared/schema";
import { Shield, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Create() {
  const [, setLocation] = useLocation();
  const { walletState, connectWallet, disconnect, provider, signer, truncateAddress, updateOwnerStatus, switchNetwork } = useWeb3();
  const vaultVote = useVaultVote(provider, signer);
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);

  // Check if connected wallet is the contract owner
  useEffect(() => {
    if (walletState.address && vaultVote.owner) {
      const isOwner = walletState.address.toLowerCase() === vaultVote.owner.toLowerCase();
      if (walletState.isOwner !== isOwner) {
        updateOwnerStatus(isOwner);
      }
    }
  }, [walletState.address, vaultVote.owner, walletState.isOwner]);

  async function handleCreateElection(data: CreateElectionInput) {
    if (isCreating) return; // Prevent double submission
    
    console.log("🚀 Starting election creation...", data);
    
    if (!vaultVote.isContractReady) {
      console.error("❌ Contract not ready");
      toast({
        title: "Contract Not Ready",
        description: "Please ensure contract is deployed and connected",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCreating(true);
      console.log("✅ Contract ready, creating election...");
      
      // Get current election count to determine ID
      const currentElections = JSON.parse(localStorage.getItem('electionMetadata') || '{}');
      const nextId = Object.keys(currentElections).length;
      
      // Store metadata locally
      const metadata = {
        description: data.description,
        votingStartTime: data.votingStartTime,
        votingEndTime: data.votingEndTime,
        resultRevealTime: data.resultRevealTime,
        imageUrl: data.imageUrl,
      };
      currentElections[nextId] = metadata;
      localStorage.setItem('electionMetadata', JSON.stringify(currentElections));
      
      await vaultVote.createElection(data);
      
      console.log("✅ Election created successfully");
      toast({
        title: "Election Created",
        description: `"${data.title}" has been created with ${data.choiceLabels.length} choices`,
      });

      // Navigate to my-elections page
      setLocation("/my-elections");
    } catch (error: any) {
      console.error("❌ Create election error:", error);
      console.error("Error stack:", error?.stack);
      toast({
        title: "Creation Failed",
        description: error?.message || "Failed to create election. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  }

  if (!walletState.isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <EmptyState
          icon={AlertCircle}
          title="Wallet Not Connected"
          description="Please connect your wallet to create elections"
          action={
            <Button onClick={() => connectWallet()} data-testid="button-connect-wallet">
              Connect Wallet
            </Button>
          }
        />
      </div>
    );
  }

  if (!walletState.isOwner) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Create Election</h1>
            <WalletConnect
              walletState={walletState}
              onConnect={connectWallet}
              onDisconnect={disconnect}
              truncateAddress={truncateAddress}
              onSwitchNetwork={switchNetwork}
            />
          </div>
        </header>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              You are not the contract owner. Only the owner can create elections.
              <div className="mt-4">
                <Link href="/explore">
                  <Button variant="outline" data-testid="button-explore">
                    Explore Elections Instead
                  </Button>
                </Link>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" data-testid="heading-create">Create Election</h1>
            <p className="text-sm text-muted-foreground">Set up a new private voting election</p>
          </div>
          <WalletConnect
            walletState={walletState}
            onConnect={connectWallet}
            onDisconnect={disconnect}
            truncateAddress={truncateAddress}
            onSwitchNetwork={switchNetwork}
          />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Info Alert */}
        <Alert className="mb-8">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Elections use Fully Homomorphic Encryption (FHE) to ensure votes remain private.
            Individual ballots are encrypted and can never be decrypted - only aggregate results.
          </AlertDescription>
        </Alert>

        {/* Create Form */}
        <CreateElectionForm
          onSubmit={handleCreateElection}
          isPending={isCreating || !vaultVote.isContractReady}
        />
      </div>
    </div>
  );
}
