import { Lock, Eye, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ElectionState, type Election } from "@shared/schema";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TallyDialogProps {
  election: Election | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReveal?: () => Promise<void>;
  isOwner: boolean;
  isPending: boolean;
  userAddress?: string | null;
  getUserVote?: (id: number, address: string) => number | null;
}

export function TallyDialog({
  election,
  open,
  onOpenChange,
  onReveal,
  isOwner,
  isPending,
  userAddress,
  getUserVote,
}: TallyDialogProps) {
  if (!election) return null;

  // Parse revealed results (per-choice)
  let results: number[] = [];
  if (election.revealedResults && election.revealedResults.length > 0) {
    try {
      results = election.revealedResults.map((r: string) => parseInt(r));
    } catch {
      results = [];
    }
  }

  const totalVotes = results.reduce((a, b) => a + b, 0);
  const isRevealed = election.state === ElectionState.Revealed && election.fullyRevealed;
  
  // Get user's vote if they voted
  const userVoteIndex = userAddress && getUserVote ? getUserVote(election.id, userAddress) : null;
  const userVoteLabel = 
    userVoteIndex !== null && 
    userVoteIndex >= 0 && 
    userVoteIndex < election.choiceLabels.length 
      ? election.choiceLabels[userVoteIndex] 
      : null;

  const handleReveal = async () => {
    if (onReveal) {
      await onReveal();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="text-2xl">{election.title}</DialogTitle>
            <Badge variant={isRevealed ? "default" : "outline"} className="gap-1">
              {isRevealed ? (
                <>
                  <Eye className="h-3 w-3" />
                  Revealed
                </>
              ) : (
                <>
                  <Lock className="h-3 w-3" />
                  Encrypted
                </>
              )}
            </Badge>
          </div>
          <DialogDescription>
            {isRevealed
              ? "Final results after decryption"
              : "Encrypted tally - results hidden until reveal"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {!isRevealed && (
            <>
              <Alert>
                <Lock className="h-4 w-4" />
                <AlertDescription>
                  The encrypted tallies contain all votes aggregated homomorphically per choice.
                  Only the decryption key holder can reveal the results.
                </AlertDescription>
              </Alert>

              <div>
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Encrypted Votes (Per Choice)
                </Label>
                <p className="text-xs text-muted-foreground">
                  Each choice has its own encrypted vote counter stored on-chain
                </p>
              </div>

              {isOwner && election.state === ElectionState.Closed && onReveal && (
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <Label className="text-base font-semibold">
                      Automatic Tally Reveal (FHEVM 0.9.1)
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">
                      Click below to automatically decrypt the tally using the Zama Relayer.
                      This will request decryption, receive the proof, and publish results on-chain.
                    </p>
                  </div>
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      The decryption will be performed using FHEVM's self-relaying pattern. 
                      Your wallet will sign two transactions: one to request the reveal and one to submit the decrypted result.
                    </AlertDescription>
                  </Alert>
                  <Button
                    onClick={handleReveal}
                    disabled={isPending}
                    data-testid="button-reveal-tally"
                    className="gap-2 w-full"
                  >
                    <Eye className="h-4 w-4" />
                    {isPending ? "Decrypting and Revealing..." : "Auto Reveal Tally"}
                  </Button>
                </div>
              )}
            </>
          )}

          {isRevealed && (
            <div className="space-y-6">
              {election.winner && (
                <Alert className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-2 border-amber-300 dark:border-amber-600 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">🏆</div>
                    <div>
                      <div className="font-semibold text-lg">Winner</div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
                        {election.winner}
                      </div>
                    </div>
                  </div>
                </Alert>
              )}

              {userVoteLabel && (
                <Alert className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-2 border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="font-semibold">Your Vote</div>
                      <div className="text-lg font-bold text-blue-700 dark:text-blue-300" data-testid="text-user-vote">
                        {userVoteLabel}
                      </div>
                    </div>
                  </div>
                </Alert>
              )}

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Total Votes</span>
                </div>
                <span className="text-2xl font-bold text-primary">{totalVotes}</span>
              </div>

              <div className="space-y-5">
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Vote Distribution</div>
                {results.map((votes, index) => {
                  const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
                  const choiceLabel = election.choiceLabels[index] || `Choice ${index + 1}`;
                  const isWinner = election.winner === choiceLabel;
                  
                  return (
                    <div 
                      key={index} 
                      className={`space-y-3 p-4 rounded-lg border-2 transition-all ${
                        isWinner 
                          ? 'bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-amber-300 dark:border-amber-600 shadow-md' 
                          : 'bg-muted/30 border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold text-lg ${isWinner ? 'text-amber-700 dark:text-amber-400' : ''}`}>
                            {choiceLabel}
                          </span>
                          {isWinner && <span className="text-2xl animate-bounce">🏆</span>}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{votes}</div>
                          <div className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</div>
                        </div>
                      </div>
                      <Progress value={percentage} data-testid={`progress-choice-${index}`} className="h-3" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="button-close-tally"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
