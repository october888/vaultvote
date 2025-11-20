import { useState, useEffect } from "react";
import { useWeb3 } from "@/hooks/useWeb3";
import { useVaultVote } from "@/hooks/useVaultVote";
import { WalletConnect } from "@/components/WalletConnect";
import { ElectionCard } from "@/components/ElectionCard";
import { CastVoteDialog } from "@/components/CastVoteDialog";
import { TallyDialog } from "@/components/TallyDialog";
import { ElectionDetailsDialog } from "@/components/ElectionDetailsDialog";
import { EmptyState } from "@/components/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ElectionState, type Election } from "@shared/schema";
import { Vote, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Explore() {
  const { walletState, connectWallet, disconnect, provider, signer, truncateAddress, updateOwnerStatus, switchNetwork } = useWeb3();
  const vaultVote = useVaultVote(provider, signer);
  const { toast } = useToast();
  
  const [elections, setElections] = useState<Election[]>([]);
  const [selectedElection, setSelectedElection] = useState<Election | null>(null);
  const [voteDialogOpen, setVoteDialogOpen] = useState(false);
  const [tallyDialogOpen, setTallyDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isLoadingElections, setIsLoadingElections] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (walletState.address && vaultVote.owner) {
      const isOwner = vaultVote.owner.toLowerCase() === walletState.address.toLowerCase();
      updateOwnerStatus(isOwner);
    } else {
      updateOwnerStatus(false);
    }
  }, [walletState.address, vaultVote.owner]);

  useEffect(() => {
    if (vaultVote.isContractReady) {
      loadElections();
    }
  }, [vaultVote.isContractReady]);

  async function loadElections() {
    if (!vaultVote.isContractReady) return;
    
    setIsLoadingElections(true);
    try {
      const fetchedElections = await vaultVote.getAllElections();
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

  async function handleCastVote(choiceIndex: number) {
    if (!selectedElection || !vaultVote.isContractReady) return;
    
    setIsPending(true);
    try {
      await vaultVote.castVote(
        selectedElection.id,
        choiceIndex
      );
      
      toast({
        title: "Vote Cast",
        description: "Your encrypted vote has been submitted on-chain",
      });

      await loadElections();
      setVoteDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Vote Failed",
        description: error?.message || "Could not submit vote. You may have already voted.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
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
          await vaultVote.requestChoiceReveal(selectedElection.id, i, (clearValue) => {
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

  function openVoteDialog(election: Election) {
    if (!walletState.isConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to vote",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedElection(election);
    setVoteDialogOpen(true);
  }

  function openTallyDialog(election: Election) {
    setSelectedElection(election);
    setTallyDialogOpen(true);
  }

  function openDetailsDialog(election: Election) {
    setSelectedElection(election);
    setDetailsDialogOpen(true);
  }

  // Filter elections based on hidden state (non-owners can't see hidden elections)
  const visibleElections = walletState.isOwner 
    ? elections 
    : elections.filter(e => !e.hidden);

  const filteredElections = visibleElections.filter(e =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openElections = filteredElections.filter(e => e.state === ElectionState.Open);
  const closedElections = filteredElections.filter(e => e.state === ElectionState.Closed || e.state === ElectionState.Revealed);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" data-testid="heading-explore">Explore Elections</h1>
            <p className="text-sm text-muted-foreground">Browse and participate in open elections</p>
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
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search elections..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="open" className="space-y-6">
          <TabsList data-testid="tabs-filter">
            <TabsTrigger value="open" data-testid="tab-open">
              <Vote className="w-4 h-4 mr-2" />
              Open ({openElections.length})
            </TabsTrigger>
            <TabsTrigger value="closed" data-testid="tab-closed">
              Closed ({closedElections.length})
            </TabsTrigger>
            <TabsTrigger value="all" data-testid="tab-all">
              All ({filteredElections.length})
            </TabsTrigger>
          </TabsList>

          {/* Open Elections */}
          <TabsContent value="open" className="space-y-4">
            {isLoadingElections ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-64" data-testid={`skeleton-${i}`} />
                ))}
              </div>
            ) : openElections.length === 0 ? (
              <EmptyState
                icon={Vote}
                title="No Open Elections"
                description="There are currently no elections accepting votes. Check back later or create your own!"
                data-testid="empty-state-open"
              />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {openElections.map(election => (
                  <ElectionCard
                    key={election.id}
                    election={election}
                    isOwner={walletState.isOwner}
                    isContractReady={vaultVote.isContractReady}
                    userVotedChoice={walletState.address ? vaultVote.getUserVote(election.id, walletState.address) : null}
                    onOpen={() => handleOpenElection(election.id)}
                    onClose={() => handleCloseElection(election.id)}
                    onVote={() => openVoteDialog(election)}
                    onViewResults={() => openTallyDialog(election)}
                    onClick={() => openDetailsDialog(election)}
                    data-testid={`card-election-${election.id}`}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Closed Elections */}
          <TabsContent value="closed" className="space-y-4">
            {isLoadingElections ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-64" data-testid={`skeleton-closed-${i}`} />
                ))}
              </div>
            ) : closedElections.length === 0 ? (
              <EmptyState
                icon={Vote}
                title="No Closed Elections"
                description="No elections have been closed yet."
                data-testid="empty-state-closed"
              />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {closedElections.map(election => (
                  <ElectionCard
                    key={election.id}
                    election={election}
                    isOwner={walletState.isOwner}
                    isContractReady={vaultVote.isContractReady}
                    userVotedChoice={walletState.address ? vaultVote.getUserVote(election.id, walletState.address) : null}
                    onViewResults={() => openTallyDialog(election)}
                    onClick={() => openDetailsDialog(election)}
                    data-testid={`card-election-closed-${election.id}`}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* All Elections */}
          <TabsContent value="all" className="space-y-4">
            {isLoadingElections ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <Skeleton key={i} className="h-64" data-testid={`skeleton-all-${i}`} />
                ))}
              </div>
            ) : filteredElections.length === 0 ? (
              <EmptyState
                icon={Vote}
                title="No Elections Found"
                description={searchQuery ? "No elections match your search query." : "No elections have been created yet."}
                data-testid="empty-state-all"
              />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredElections.map(election => (
                  <ElectionCard
                    key={election.id}
                    election={election}
                    isOwner={walletState.isOwner}
                    isContractReady={vaultVote.isContractReady}
                    userVotedChoice={walletState.address ? vaultVote.getUserVote(election.id, walletState.address) : null}
                    onOpen={() => handleOpenElection(election.id)}
                    onClose={() => handleCloseElection(election.id)}
                    onVote={() => openVoteDialog(election)}
                    onViewResults={() => openTallyDialog(election)}
                    onClick={() => openDetailsDialog(election)}
                    data-testid={`card-election-all-${election.id}`}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Vote Dialog */}
      {selectedElection && (
        <CastVoteDialog
          open={voteDialogOpen}
          onOpenChange={setVoteDialogOpen}
          election={selectedElection}
          onSubmit={handleCastVote}
          isPending={isPending}
        />
      )}

      {/* Tally Dialog */}
      {selectedElection && (
        <TallyDialog
          open={tallyDialogOpen}
          onOpenChange={setTallyDialogOpen}
          election={selectedElection}
          onReveal={walletState.isOwner ? handleRevealTally : undefined}
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
          isOwner={walletState.isOwner}
          isContractReady={vaultVote.isContractReady}
          userVotedChoice={walletState.address ? vaultVote.getUserVote(selectedElection.id, walletState.address) : null}
          onOpen={() => handleOpenElection(selectedElection.id)}
          onClose={() => handleCloseElection(selectedElection.id)}
          onVote={() => openVoteDialog(selectedElection)}
          onViewResults={() => openTallyDialog(selectedElection)}
        />
      )}
    </div>
  );
}
