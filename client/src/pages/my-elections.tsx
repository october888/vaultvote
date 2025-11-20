import { useState, useEffect } from "react";
import { useWeb3 } from "@/hooks/useWeb3";
import { useVaultVote } from "@/hooks/useVaultVote";
import { WalletConnect } from "@/components/WalletConnect";
import { ElectionCard } from "@/components/ElectionCard";
import { TallyDialog } from "@/components/TallyDialog";
import { ElectionDetailsDialog } from "@/components/ElectionDetailsDialog";
import { EmptyState } from "@/components/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import type { Election } from "@shared/schema";
import { ElectionState } from "@shared/schema";
import { Shield, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function MyElections() {
  const { walletState, connectWallet, disconnect, provider, signer, truncateAddress, updateOwnerStatus, switchNetwork } = useWeb3();
  const vaultVote = useVaultVote(provider, signer);
  const { toast } = useToast();
  
  const [elections, setElections] = useState<Election[]>([]);
  const [selectedElection, setSelectedElection] = useState<Election | null>(null);
  const [tallyDialogOpen, setTallyDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isLoadingElections, setIsLoadingElections] = useState(false);

  useEffect(() => {
    if (walletState.address && vaultVote.owner) {
      const isOwner = vaultVote.owner.toLowerCase() === walletState.address.toLowerCase();
      updateOwnerStatus(isOwner);
    } else {
      updateOwnerStatus(false);
    }
  }, [walletState.address, vaultVote.owner]);

  useEffect(() => {
    if (vaultVote.isContractReady && walletState.isOwner) {
      loadElections();
    }
  }, [vaultVote.isContractReady, walletState.isOwner]);

  async function loadElections() {
    if (!vaultVote.isContractReady) return;
    
    setIsLoadingElections(true);
    try {
      const fetchedElections = await vaultVote.getAllElections();
      console.log('📊 Loaded elections:', fetchedElections);
      setElections(fetchedElections);
    } catch (error) {
      console.error("Failed to load elections:", error);
      toast({
        title: "Load Failed",
        description: "Could not fetch elections from contract",
        variant: "destructive",
      });
    } finally {
      setIsLoadingElections(false);
    }
  }

  async function handleOpenElection(id: number) {
    if (!vaultVote.isContractReady) return;

    setIsPending(true);
    try {
      await vaultVote.openElection(id);
      
      toast({
        title: "Election Opened",
        description: "Voters can now cast their encrypted votes",
      });

      await loadElections();
    } catch (error: any) {
      toast({
        title: "Failed to Open",
        description: error?.message || "Could not open election",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  }

  async function handleCloseElection(id: number) {
    if (!vaultVote.isContractReady) return;

    setIsPending(true);
    try {
      await vaultVote.closeElection(id);
      
      toast({
        title: "Election Closed",
        description: "No more votes can be cast. Ready for decryption.",
      });

      await loadElections();
    } catch (error: any) {
      toast({
        title: "Failed to Close",
        description: error?.message || "Could not close election",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  }

  async function handleRevealTally() {
    if (!selectedElection || !vaultVote.isContractReady) return;
    
    setIsPending(true);
    let successCount = 0;
    let skippedCount = 0;
    
    try {
      // Reveal all choices sequentially, skip already-revealed ones
      for (let i = 0; i < selectedElection.choices; i++) {
        try {
          await vaultVote.requestChoiceReveal(selectedElection.id, i, (clearValue: number) => {
            toast({
              title: `Choice ${i + 1} Decrypted`,
              description: `Decrypted value: ${clearValue} votes`,
            });
          });
          successCount++;
        } catch (error: any) {
          // If choice is already revealed, skip it and continue
          if (error?.message?.includes("already revealed")) {
            console.log(`Choice ${i} already revealed, skipping...`);
            skippedCount++;
            continue;
          }
          // For other errors, re-throw
          throw error;
        }
      }
      
      toast({
        title: "Tally Revealed",
        description: `${successCount} choice(s) revealed${skippedCount > 0 ? `, ${skippedCount} already revealed` : ''}`,
      });

      // Reload elections to get fresh data with results
      await loadElections();
      
      // Fetch fresh election data for the dialog
      const freshElection = await vaultVote.getElection(selectedElection.id);
      if (freshElection) {
        setSelectedElection(freshElection);
      }
    } catch (error: any) {
      toast({
        title: "Reveal Failed",
        description: error?.message || "Could not reveal tally. Make sure you are the owner and the election is closed.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  }

  function openTallyDialog(election: Election) {
    setSelectedElection(election);
    setTallyDialogOpen(true);
  }

  function openDetailsDialog(election: Election) {
    setSelectedElection(election);
    setDetailsDialogOpen(true);
  }

  async function handleDeleteElection(election: Election) {
    if (election.state !== ElectionState.Created) {
      toast({
        title: "Cannot Delete",
        description: "Only elections in 'Created' state can be deleted",
        variant: "destructive",
      });
      return;
    }
    
    // Confirmation
    const confirmed = window.confirm(
      `Are you sure you want to delete "${election.title}"? This cannot be undone.`
    );
    
    if (!confirmed) return;
    
    try {
      if (!window.ethereum) {
        throw new Error("No wallet found");
      }

      // Step 1: Request a nonce from the server
      const nonceResponse = await fetch(`/api/election-metadata/${election.id}/toggle-hidden/nonce`);
      if (!nonceResponse.ok) {
        throw new Error("Failed to get authentication nonce");
      }
      const { nonce } = await nonceResponse.json();

      // Step 2: Create message with nonce
      const message = `Toggle hidden for election ${election.id} with nonce ${nonce}`;
      
      // Step 3: Request signature from wallet
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, walletState.address],
      });

      // Step 4: Submit signed message with nonce (sets hidden=true permanently)
      const response = await fetch(`/api/election-metadata/${election.id}/toggle-hidden`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature, nonce }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to delete election");
      }

      toast({
        title: "Election Deleted",
        description: "The election has been permanently deleted",
      });

      await loadElections();
    } catch (error: any) {
      toast({
        title: "Delete Failed",
        description: error?.message || "Could not delete election",
        variant: "destructive",
      });
    }
  }

  async function handleToggleHidden(election: Election) {
    try {
      if (!window.ethereum) {
        throw new Error("No wallet found");
      }

      // Step 1: Request a nonce from the server
      const nonceResponse = await fetch(`/api/election-metadata/${election.id}/toggle-hidden/nonce`);
      if (!nonceResponse.ok) {
        throw new Error("Failed to get authentication nonce");
      }
      const { nonce } = await nonceResponse.json();

      // Step 2: Create message with nonce
      const message = `Toggle hidden for election ${election.id} with nonce ${nonce}`;
      
      // Step 3: Request signature from wallet
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, walletState.address],
      });

      // Step 4: Submit signed message with nonce
      const response = await fetch(`/api/election-metadata/${election.id}/toggle-hidden`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature, nonce }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update election visibility");
      }

      const result = await response.json();
      const newHiddenState = result.hidden;

      toast({
        title: newHiddenState ? "Election Hidden" : "Election Visible",
        description: newHiddenState 
          ? "This election is now hidden from voters on Explore page" 
          : "This election is now visible to voters on Explore page",
      });

      await loadElections();
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error?.message || "Could not update election visibility",
        variant: "destructive",
      });
    }
  }

  if (!walletState.isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <EmptyState
          icon={AlertCircle}
          title="Wallet Not Connected"
          description="Please connect your wallet to manage elections"
          action={
            <Button onClick={() => connectWallet()} data-testid="button-connect-wallet">
              Connect Wallet
            </Button>
          }
          data-testid="empty-state-not-connected"
        />
      </div>
    );
  }

  if (!walletState.isOwner) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">My Elections</h1>
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
              You are not the contract owner. Only the owner can create and manage elections.
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
            <h1 className="text-2xl font-bold" data-testid="heading-my-elections">My Elections</h1>
            <p className="text-sm text-muted-foreground">Manage your created elections</p>
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <Link href="/create">
            <Button data-testid="button-create-new">
              Create New Election
            </Button>
          </Link>
        </div>

        {/* Elections Grid */}
        {isLoadingElections ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-64" data-testid={`skeleton-${i}`} />
            ))}
          </div>
        ) : elections.length === 0 ? (
          <EmptyState
            icon={Shield}
            title="No Elections Created"
            description="You haven't created any elections yet. Create your first one to get started!"
            action={
              <Link href="/create">
                <Button data-testid="button-create-first">
                  Create First Election
                </Button>
              </Link>
            }
            data-testid="empty-state-no-elections"
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {elections.map(election => {
              console.log('🎯 Election Card Data:', {
                id: election.id,
                title: election.title,
                state: election.state,
                isOwner: true,
                isContractReady: vaultVote.isContractReady
              });
              return (
                <ElectionCard
                  key={election.id}
                  election={election}
                  isOwner={true}
                  isContractReady={vaultVote.isContractReady}
                  onOpen={() => handleOpenElection(election.id)}
                  onClose={() => handleCloseElection(election.id)}
                  onViewResults={() => openTallyDialog(election)}
                  onClick={() => openDetailsDialog(election)}
                  onDelete={() => handleDeleteElection(election)}
                  onToggleHidden={() => handleToggleHidden(election)}
                  data-testid={`card-election-${election.id}`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Reveal Tally Dialog */}
      {selectedElection && (
        <TallyDialog
          open={tallyDialogOpen}
          onOpenChange={setTallyDialogOpen}
          election={selectedElection}
          onReveal={handleRevealTally}
          isOwner={walletState.isOwner}
          isPending={isPending}
          userAddress={walletState.address}
          getUserVote={vaultVote.getUserVote}
        />
      )}

      {/* Election Details Dialog */}
      {selectedElection && (
        <ElectionDetailsDialog
          open={detailsDialogOpen}
          onOpenChange={setDetailsDialogOpen}
          election={selectedElection}
          isOwner={true}
          isContractReady={vaultVote.isContractReady}
          userVotedChoice={walletState.address ? vaultVote.getUserVote(selectedElection.id, walletState.address) : null}
          onOpen={() => handleOpenElection(selectedElection.id)}
          onClose={() => handleCloseElection(selectedElection.id)}
          onViewResults={() => openTallyDialog(selectedElection)}
        />
      )}
    </div>
  );
}
