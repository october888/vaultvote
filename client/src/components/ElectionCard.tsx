import { useState, useEffect } from "react";
import { Lock, Users, CheckCircle2, XCircle, Clock, Eye, Sparkles, Calendar, Vote, EyeOff, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ElectionState, type Election } from "@shared/schema";
import { CountdownTimer } from "@/components/CountdownTimer";

interface ElectionCardProps {
  election: Election;
  isOwner: boolean;
  isContractReady?: boolean;
  userVotedChoice?: number | null;
  onOpen?: () => void;
  onClose?: () => void;
  onVote?: () => void;
  onViewResults?: () => void;
  onClick?: () => void;
  onDelete?: () => void;
  onToggleHidden?: () => void;
}

const stateConfig = {
  [ElectionState.Created]: {
    label: "Created",
    variant: "secondary" as const,
    icon: Clock,
    description: "Waiting to open",
    gradient: "from-amber-500/10 to-orange-500/10",
    borderColor: "border-amber-200 dark:border-amber-800",
  },
  [ElectionState.Open]: {
    label: "Open",
    variant: "default" as const,
    icon: Users,
    description: "Voting in progress",
    gradient: "from-green-500/10 to-emerald-500/10",
    borderColor: "border-green-200 dark:border-green-800",
  },
  [ElectionState.Closed]: {
    label: "Closed",
    variant: "outline" as const,
    icon: XCircle,
    description: "Awaiting reveal",
    gradient: "from-blue-500/10 to-indigo-500/10",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  [ElectionState.Revealed]: {
    label: "Revealed",
    variant: "secondary" as const,
    icon: Eye,
    description: "Results published",
    gradient: "from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-200 dark:border-purple-800",
  },
};

export function ElectionCard({
  election,
  isOwner,
  isContractReady = true,
  userVotedChoice,
  onOpen,
  onClose,
  onVote,
  onViewResults,
  onClick,
  onDelete,
  onToggleHidden,
}: ElectionCardProps) {
  const config = stateConfig[election.state];
  const StateIcon = config.icon;
  
  // Force periodic updates to recompute time-based states
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    // Update every second if there are time-based restrictions
    if (election.votingStartTime || election.votingEndTime) {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [election.votingStartTime, election.votingEndTime]);
  
  // Determine election status based on time (now reactive to currentTime)
  const startTime = election.votingStartTime ? new Date(election.votingStartTime) : null;
  const endTime = election.votingEndTime ? new Date(election.votingEndTime) : null;
  
  const isScheduled = startTime && currentTime < startTime;
  const isActive = election.state === ElectionState.Open && (!endTime || currentTime < endTime);
  const hasEnded = endTime && currentTime >= endTime;

  console.log('🔍 ElectionCard render:', {
    id: election.id,
    title: election.title,
    state: election.state,
    stateType: typeof election.state,
    ElectionStateCreated: ElectionState.Created,
    stateLabel: config.label,
    isOwner,
    isContractReady,
    hasOnOpen: !!onOpen,
    stateEqualsCreated: election.state === ElectionState.Created,
    shouldShowOpenButton: isOwner && election.state === ElectionState.Created,
    imageUrl: election.imageUrl,
    votingStartTime: election.votingStartTime,
    votingEndTime: election.votingEndTime
  });

  return (
    <Card 
      data-testid={`card-election-${election.id}`} 
      className={`hover-elevate transition-all duration-300 border-2 ${config.borderColor} relative overflow-hidden group ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-300 ${election.imageUrl ? 'top-32' : ''}`} />
      
      {/* Sparkle effect for open elections */}
      {isActive && (
        <div className={`absolute ${election.imageUrl ? 'top-36' : 'top-4'} right-4 animate-pulse z-10`}>
          <Sparkles className="h-5 w-5 text-green-500" />
        </div>
      )}
      
      {/* Election Image - positioned at the very top */}
      {election.imageUrl && (
        <div className="relative w-full h-32 overflow-hidden z-10 bg-muted">
          <img
            src={election.imageUrl}
            alt={election.title}
            className="w-full h-full object-cover"
            data-testid={`image-election-${election.id}`}
            onError={(e) => {
              console.error('❌ Image failed to load:', election.imageUrl, e);
              e.currentTarget.style.display = 'none';
            }}
            onLoad={() => {
              console.log('✅ Image loaded successfully:', election.imageUrl);
            }}
          />
        </div>
      )}
      
      <div className="relative">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg line-clamp-2 font-bold">{election.title}</CardTitle>
            <div className="flex flex-col gap-1 shrink-0">
              <Badge variant={config.variant} data-testid={`badge-state-${election.id}`} className="gap-1 shadow-sm">
                <StateIcon className="h-3 w-3" />
                {config.label}
              </Badge>
              {isScheduled && (
                <Badge variant="outline" className="gap-1 text-xs">
                  <Clock className="h-3 w-3" />
                  Scheduled
                </Badge>
              )}
            </div>
          </div>
          {election.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{election.description}</p>
          )}
          <CardDescription className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1">
              <StateIcon className="h-3 w-3" />
              {config.description}
            </span>
            <span className="text-xs">•</span>
            <span className="font-semibold text-foreground/80">{election.choices} choices</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 rounded-md">
              <Lock className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium text-primary">FHE Encrypted</span>
            </div>
            
            {userVotedChoice !== null && userVotedChoice !== undefined && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 rounded-md">
                <Vote className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                <span className="font-medium text-green-600 dark:text-green-400 text-xs">
                  You voted: {election.choiceLabels[userVotedChoice]}
                </span>
              </div>
            )}
          </div>
          
          {/* Countdown Timer for active elections */}
          {isActive && election.votingEndTime && (
            <CountdownTimer targetTime={election.votingEndTime} label="Closes in" />
          )}
          
          {/* Scheduled election countdown */}
          {isScheduled && election.votingStartTime && (
            <CountdownTimer targetTime={election.votingStartTime} label="Starts in" />
          )}
          
          {(election.votingStartTime || election.votingEndTime || election.resultRevealTime) && (
            <div className="space-y-2 text-xs text-muted-foreground">
              {election.votingStartTime && !isScheduled && (
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  <span>Started: {new Date(election.votingStartTime).toLocaleString()}</span>
                </div>
              )}
              {election.votingEndTime && !isActive && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" />
                  <span>Ended: {new Date(election.votingEndTime).toLocaleString()}</span>
                </div>
              )}
              {election.resultRevealTime && (
                <div className="flex items-center gap-1.5">
                  <Eye className="h-3 w-3" />
                  <span>Results reveal: {new Date(election.resultRevealTime).toLocaleString()}</span>
                </div>
              )}
            </div>
          )}
          
          {/* Voting period ended notice */}
          {hasEnded && election.state === ElectionState.Open && (
            <div className="flex items-center gap-1.5 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-md">
              <XCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                Voting period has ended. Awaiting owner to close election.
              </span>
            </div>
          )}
        </CardContent>
      </div>

      <CardFooter className="flex gap-2 flex-wrap">
        {isOwner && election.state === ElectionState.Created && !isScheduled && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onOpen?.();
            }}
            size="sm"
            disabled={!isContractReady}
            data-testid={`button-open-${election.id}`}
            className="gap-2"
          >
            <Users className="h-4 w-4" />
            Open Election
          </Button>
        )}

        {isOwner && election.state === ElectionState.Open && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onClose?.();
            }}
            size="sm"
            variant="destructive"
            disabled={!isContractReady}
            data-testid={`button-close-${election.id}`}
            className="gap-2"
          >
            <XCircle className="h-4 w-4" />
            Close Election
            {hasEnded && " (Overdue)"}
          </Button>
        )}

        {!isOwner && election.state === ElectionState.Open && !hasEnded && !isScheduled && userVotedChoice === null && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onVote?.();
            }}
            size="sm"
            disabled={!isContractReady}
            data-testid={`button-vote-${election.id}`}
            className="gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Cast Vote
          </Button>
        )}

        {(election.state === ElectionState.Closed || election.state === ElectionState.Revealed) && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onViewResults?.();
            }}
            size="sm"
            variant="outline"
            data-testid={`button-view-results-${election.id}`}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            View Results
          </Button>
        )}
        
        {isOwner && election.state === ElectionState.Created && onDelete && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            size="sm"
            variant="destructive"
            data-testid={`button-delete-${election.id}`}
            className="gap-2 ml-auto"
            title="Delete this poll (cannot be undone)"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        )}
        
        {isOwner && election.state !== ElectionState.Created && onToggleHidden && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onToggleHidden();
            }}
            size="sm"
            variant="ghost"
            data-testid={`button-toggle-hidden-${election.id}`}
            className="gap-2 ml-auto"
            title={election.hidden ? "Show this poll to voters" : "Hide this poll from voters"}
          >
            {election.hidden ? (
              <>
                <Eye className="h-4 w-4" />
                Unhide
              </>
            ) : (
              <>
                <EyeOff className="h-4 w-4" />
                Hide
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
