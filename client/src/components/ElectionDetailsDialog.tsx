import { Lock, Users, CheckCircle2, XCircle, Clock, Eye, Calendar, Vote, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ElectionState, type Election } from "@shared/schema";
import { CountdownTimer } from "@/components/CountdownTimer";

interface ElectionDetailsDialogProps {
  election: Election | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isOwner: boolean;
  isContractReady?: boolean;
  userVotedChoice?: number | null;
  onOpen?: () => void;
  onClose?: () => void;
  onVote?: () => void;
  onViewResults?: () => void;
}

const stateConfig = {
  [ElectionState.Created]: {
    label: "Created",
    variant: "secondary" as const,
    icon: Clock,
    description: "Waiting to open",
  },
  [ElectionState.Open]: {
    label: "Open",
    variant: "default" as const,
    icon: Users,
    description: "Voting in progress",
  },
  [ElectionState.Closed]: {
    label: "Closed",
    variant: "outline" as const,
    icon: XCircle,
    description: "Awaiting reveal",
  },
  [ElectionState.Revealed]: {
    label: "Revealed",
    variant: "secondary" as const,
    icon: Eye,
    description: "Results published",
  },
};

export function ElectionDetailsDialog({
  election,
  open,
  onOpenChange,
  isOwner,
  isContractReady = true,
  userVotedChoice,
  onOpen,
  onClose,
  onVote,
  onViewResults,
}: ElectionDetailsDialogProps) {
  if (!election) return null;

  const config = stateConfig[election.state];
  const StateIcon = config.icon;
  
  const startTime = election.votingStartTime ? new Date(election.votingStartTime) : null;
  const endTime = election.votingEndTime ? new Date(election.votingEndTime) : null;
  const currentTime = new Date();
  
  const isScheduled = startTime && currentTime < startTime;
  const isActive = election.state === ElectionState.Open && (!endTime || currentTime < endTime);
  const hasEnded = endTime && currentTime >= endTime;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-election-details">
        <DialogHeader>
          <div className="flex items-center justify-between gap-4">
            <DialogTitle className="text-2xl">{election.title}</DialogTitle>
            <Badge variant={config.variant} className="gap-1">
              <StateIcon className="h-3 w-3" />
              {config.label}
            </Badge>
          </div>
          <DialogDescription>
            {config.description} • {election.choices} choices
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Election Image */}
          {election.imageUrl && (
            <div className="w-full h-48 overflow-hidden rounded-lg border">
              <img
                src={election.imageUrl}
                alt={election.title}
                className="w-full h-full object-cover"
                data-testid="image-election-detail"
              />
            </div>
          )}

          {/* Description */}
          {election.description && (
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground">Description</h3>
              <p className="text-sm">{election.description}</p>
            </div>
          )}

          {/* Timing Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground">Schedule</h3>
            
            {/* Countdown Timer for active elections */}
            {isActive && election.votingEndTime && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CountdownTimer targetTime={election.votingEndTime} label="Voting closes in" />
              </div>
            )}
            
            {/* Scheduled election countdown */}
            {isScheduled && election.votingStartTime && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <CountdownTimer targetTime={election.votingStartTime} label="Voting starts in" />
              </div>
            )}

            <div className="space-y-3 text-sm">
              {election.votingStartTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Start:</span>
                  <span>{new Date(election.votingStartTime).toLocaleString()}</span>
                </div>
              )}
              {election.votingEndTime && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">End:</span>
                  <span>{new Date(election.votingEndTime).toLocaleString()}</span>
                </div>
              )}
              {election.resultRevealTime && (
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Results reveal:</span>
                  <span>{new Date(election.resultRevealTime).toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Voting period ended notice */}
            {hasEnded && election.state === ElectionState.Open && (
              <div className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-md">
                <XCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                  Voting period has ended. Awaiting owner to close election.
                </span>
              </div>
            )}
          </div>

          {/* Choices */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground">Voting Options</h3>
            <div className="space-y-2">
              {election.choiceLabels.map((label, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    userVotedChoice === index
                      ? 'bg-green-500/10 border-green-500/20'
                      : 'bg-card'
                  }`}
                  data-testid={`choice-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{label}</span>
                    {userVotedChoice === index && (
                      <Badge variant="outline" className="bg-green-500/10">
                        <Vote className="h-3 w-3 mr-1" />
                        Your Vote
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Encryption Badge */}
          <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
            <Lock className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              All votes are encrypted using Fully Homomorphic Encryption (FHE)
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap pt-4 border-t">
            {isOwner && election.state === ElectionState.Created && !isScheduled && (
              <Button
                onClick={() => {
                  onOpen?.();
                  onOpenChange(false);
                }}
                disabled={!isContractReady}
                data-testid="button-open-detail"
                className="gap-2"
              >
                <Users className="h-4 w-4" />
                Open Election
              </Button>
            )}

            {isOwner && election.state === ElectionState.Open && (
              <Button
                onClick={() => {
                  onClose?.();
                  onOpenChange(false);
                }}
                variant="destructive"
                disabled={!isContractReady}
                data-testid="button-close-detail"
                className="gap-2"
              >
                <XCircle className="h-4 w-4" />
                Close Election
                {hasEnded && " (Overdue)"}
              </Button>
            )}

            {!isOwner && election.state === ElectionState.Open && !hasEnded && !isScheduled && userVotedChoice === null && (
              <Button
                onClick={() => {
                  onVote?.();
                  onOpenChange(false);
                }}
                disabled={!isContractReady}
                data-testid="button-vote-detail"
                className="gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Cast Vote
              </Button>
            )}

            {(election.state === ElectionState.Closed || election.state === ElectionState.Revealed) && (
              <Button
                onClick={() => {
                  onViewResults?.();
                  onOpenChange(false);
                }}
                variant="outline"
                data-testid="button-view-results-detail"
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                View Results
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
