import { useState, useEffect } from "react";
import { Vote, Shield, Lock, AlertCircle, Sparkles, Zap, CheckCircle } from "lucide-react";
import { useWeb3 } from "@/hooks/useWeb3";
import { useVaultVote } from "@/hooks/useVaultVote";
import { WalletConnect } from "@/components/WalletConnect";
import { CreateElectionForm } from "@/components/CreateElectionForm";
import { ElectionCard } from "@/components/ElectionCard";
import { CastVoteDialog } from "@/components/CastVoteDialog";
import { TallyDialog } from "@/components/TallyDialog";
import { EmptyState } from "@/components/EmptyState";
import { Logo, IconBadge } from "@/components/Logo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ElectionState, type Election, type CreateElectionInput } from "@shared/schema";

export default function Home() {
  const { walletState, connectWallet, disconnect, updateOwnerStatus, truncateAddress, switchNetwork, provider, signer } = useWeb3();
  const vaultVote = useVaultVote(provider, signer);
  const { toast } = useToast();
  
  const [elections, setElections] = useState<Election[]>([]);
  const [selectedElection, setSelectedElection] = useState<Election | null>(null);
  const [voteDialogOpen, setVoteDialogOpen] = useState(false);
  const [tallyDialogOpen, setTallyDialogOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isLoadingElections, setIsLoadingElections] = useState(false);

  // Fetch elections when contract is ready (works without wallet connection)
  useEffect(() => {
    if (vaultVote.isContractReady) {
      loadElections();
    }
  }, [vaultVote.isContractReady]);

  // Check if connected wallet is owner
  useEffect(() => {
    if (walletState.address && vaultVote.owner) {
      const isOwner = vaultVote.owner.toLowerCase() === walletState.address.toLowerCase();
      updateOwnerStatus(isOwner);
    } else {
      updateOwnerStatus(false);
    }
  }, [walletState.address, vaultVote.owner]);

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

  async function handleConnect() {
    try {
      await connectWallet();
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to your Web3 wallet",
      });
    } catch (error: any) {
      console.error("Connection error:", error);
      toast({
        title: "Connection Failed",
        description: error?.message || "Please install MetaMask or another Web3 wallet",
        variant: "destructive",
      });
    }
  }

  async function handleCreateElection(data: CreateElectionInput) {
    if (!vaultVote.isContractReady) {
      toast({
        title: "Contract Not Ready",
        description: "Please ensure contract is deployed and connected",
        variant: "destructive",
      });
      return;
    }

    setIsPending(true);
    try {
      await vaultVote.createElection(data);
      
      toast({
        title: "Election Created",
        description: `"${data.title}" has been created with ${data.choiceLabels.length} choices`,
      });

      // Reload elections
      await loadElections();
    } catch (error: any) {
      console.error("Create election error:", error);
      toast({
        title: "Creation Failed",
        description: error?.message || "Failed to create election. Please try again.",
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

  async function handleRevealTally() {
    if (!selectedElection || !vaultVote.isContractReady) return;
    
    setIsPending(true);
    let successCount = 0;
    let skippedCount = 0;
    
    try {
      // Reveal all choices sequentially, skip already-revealed ones
      for (let i = 0; i < selectedElection.choiceLabels.length; i++) {
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

  function openVoteDialog(election: Election) {
    if (!vaultVote.isContractReady) {
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

  async function handleDeleteElection(election: Election) {
    if (!walletState.isOwner) {
      toast({
        title: "Not Authorized",
        description: "Only the election owner can delete elections",
        variant: "destructive",
      });
      return;
    }

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
    if (!walletState.isOwner) {
      toast({
        title: "Not Authorized",
        description: "Only the election owner can hide/unhide elections",
        variant: "destructive",
      });
      return;
    }
    
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
          ? "This election is now hidden from voters" 
          : "This election is now visible to voters",
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

  // Filter elections based on hidden state
  const visibleElections = walletState.isOwner 
    ? elections 
    : elections.filter(e => !e.hidden);

  const openElections = visibleElections.filter(e => e.state === ElectionState.Open);
  const closedElections = visibleElections.filter(e => 
    e.state === ElectionState.Closed || e.state === ElectionState.Revealed
  );
  const pendingElections = visibleElections.filter(e => e.state === ElectionState.Created);

  // Show contract connection notice if contract not deployed/configured
  const showContractNotice = !vaultVote.isContractReady;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-yellow-200/50 dark:border-yellow-500/20 bg-gradient-to-r from-background via-yellow-50/30 to-background dark:from-background dark:via-yellow-950/20 dark:to-background backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Logo size="md" showText={true} />
          <WalletConnect
            walletState={walletState}
            onConnect={handleConnect}
            onDisconnect={disconnect}
            truncateAddress={truncateAddress}
            onSwitchNetwork={switchNetwork}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {!walletState.isConnected ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-8 py-16">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                  <div className="relative shine-effect pulse-glow rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 p-12 shadow-2xl">
                    <Lock className="h-20 w-20 text-white" strokeWidth={2} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 dark:from-yellow-400 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
                  End-to-End Encrypted Voting
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Create and participate in fully private on-chain elections using{" "}
                  <span className="font-semibold text-yellow-600 dark:text-yellow-400">Fully Homomorphic Encryption</span>.
                  Your vote stays encrypted from submission to counting.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <IconBadge 
                  icon={<Lock className="h-3 w-3 text-white" />} 
                  label="Encrypted Votes" 
                  color="yellow"
                />
                <IconBadge 
                  icon={<Shield className="h-3 w-3 text-white" />} 
                  label="Blockchain Secured" 
                  color="green"
                />
                <IconBadge 
                  icon={<Zap className="h-3 w-3 text-white" />} 
                  label="Instant Results" 
                  color="purple"
                />
                <IconBadge 
                  icon={<CheckCircle className="h-3 w-3 text-white" />} 
                  label="Verifiable" 
                  color="blue"
                />
              </div>
              
              <Alert className="text-left gradient-card border-yellow-200 dark:border-yellow-500/30 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <AlertTitle className="text-lg font-semibold mb-3">How It Works</AlertTitle>
                    <AlertDescription>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-start gap-2">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-700 dark:text-yellow-400 font-bold text-xs">1</div>
                          <span>Votes are encrypted locally using FHE before submission</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-700 dark:text-yellow-400 font-bold text-xs">2</div>
                          <span>Smart contract aggregates votes homomorphically on-chain</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-700 dark:text-yellow-400 font-bold text-xs">3</div>
                          <span>Results remain encrypted until the election closes</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-700 dark:text-yellow-400 font-bold text-xs">4</div>
                          <span>Only the admin can decrypt and reveal final tallies</span>
                        </div>
                      </div>
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {showContractNotice && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Contract Not Deployed</AlertTitle>
                <AlertDescription>
                  No contract address configured. Deploy the VaultVote contract to a network and set VITE_CONTRACT_ADDRESS
                  in your environment variables to enable full functionality. See README for deployment instructions.
                </AlertDescription>
              </Alert>
            )}

            {/* Admin Panel - only shown if wallet is connected AND user is owner */}
            {walletState.isConnected && walletState.isOwner && (
              <section>
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2">Admin Panel</h2>
                  <p className="text-muted-foreground">
                    Create and manage elections. All votes are encrypted end-to-end.
                  </p>
                </div>
                <div className="max-w-2xl">
                  <CreateElectionForm 
                    onSubmit={handleCreateElection} 
                    isPending={isPending || !vaultVote.isContractReady} 
                  />
                </div>
              </section>
            )}

            {walletState.isConnected && walletState.isOwner && <Separator />}

            {/* Elections Grid */}
            <section>
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">
                  {walletState.isConnected && walletState.isOwner ? "All Elections" : "Active Elections"}
                </h2>
                <p className="text-muted-foreground">
                  {walletState.isConnected 
                    ? "Browse and participate in encrypted elections" 
                    : "Connect your wallet to participate in encrypted elections"}
                </p>
              </div>

              {isLoadingElections ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-64 rounded-lg" />
                  ))}
                </div>
              ) : elections.length === 0 ? (
                <EmptyState
                  title="No Elections Yet"
                  description={
                    walletState.isConnected && walletState.isOwner
                      ? "Create your first encrypted election using the form above"
                      : "There are no active elections at the moment. Check back later."
                  }
                />
              ) : (
                <Tabs defaultValue="open" className="space-y-6">
                  <TabsList>
                    <TabsTrigger value="open" data-testid="tab-open">
                      Open ({openElections.length})
                    </TabsTrigger>
                    <TabsTrigger value="closed" data-testid="tab-closed">
                      Closed ({closedElections.length})
                    </TabsTrigger>
                    {walletState.isConnected && walletState.isOwner && (
                      <TabsTrigger value="pending" data-testid="tab-pending">
                        Pending ({pendingElections.length})
                      </TabsTrigger>
                    )}
                  </TabsList>

                  <TabsContent value="open" className="space-y-4">
                    {openElections.length === 0 ? (
                      <EmptyState
                        title="No Open Elections"
                        description="There are no open elections right now"
                      />
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {openElections.map((election) => (
                          <ElectionCard
                            key={election.id}
                            election={election}
                            isOwner={walletState.isOwner}
                            isContractReady={vaultVote.isContractReady}
                            userVotedChoice={walletState.address ? vaultVote.getUserVote(election.id, walletState.address) : null}
                            onClose={() => handleCloseElection(election.id)}
                            onVote={() => openVoteDialog(election)}
                            onViewResults={() => openTallyDialog(election)}
                            onToggleHidden={() => handleToggleHidden(election)}
                          />
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="closed" className="space-y-4">
                    {closedElections.length === 0 ? (
                      <EmptyState
                        title="No Closed Elections"
                        description="Closed election results will appear here"
                      />
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {closedElections.map((election) => (
                          <ElectionCard
                            key={election.id}
                            election={election}
                            isOwner={walletState.isOwner}
                            isContractReady={vaultVote.isContractReady}
                            userVotedChoice={walletState.address ? vaultVote.getUserVote(election.id, walletState.address) : null}
                            onViewResults={() => openTallyDialog(election)}
                            onToggleHidden={() => handleToggleHidden(election)}
                          />
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  {walletState.isConnected && walletState.isOwner && (
                    <TabsContent value="pending" className="space-y-4">
                      {pendingElections.length === 0 ? (
                        <EmptyState
                          title="No Pending Elections"
                          description="Elections waiting to be opened will appear here"
                        />
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {pendingElections.map((election) => (
                            <ElectionCard
                              key={election.id}
                              election={election}
                              isOwner={walletState.isOwner}
                              isContractReady={vaultVote.isContractReady}
                              userVotedChoice={walletState.address ? vaultVote.getUserVote(election.id, walletState.address) : null}
                              onOpen={() => handleOpenElection(election.id)}
                              onDelete={() => handleDeleteElection(election)}
                            />
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  )}
                </Tabs>
              )}
            </section>
          </div>
        )}
      </main>

      {/* Dialogs */}
      <CastVoteDialog
        election={selectedElection}
        open={voteDialogOpen}
        onOpenChange={setVoteDialogOpen}
        onSubmit={handleCastVote}
        isPending={isPending}
      />

      <TallyDialog
        election={selectedElection}
        open={tallyDialogOpen}
        onOpenChange={setTallyDialogOpen}
        onReveal={walletState.isOwner ? handleRevealTally : undefined}
        isOwner={walletState.isOwner}
        isPending={isPending}
      />

      {/* Footer */}
      <footer className="border-t border-yellow-200/50 dark:border-yellow-500/20 bg-gradient-to-r from-background via-yellow-50/20 to-background dark:from-background dark:via-yellow-950/10 dark:to-background mt-16 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-6">
            <Logo size="sm" showText={true} />
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <span>Powered by FHE</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <span>Built for Zama Dev Program</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Secure, Private, and Transparent Voting on the Blockchain
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
