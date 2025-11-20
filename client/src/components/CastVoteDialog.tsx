import { useState } from "react";
import { CheckCircle2, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Election } from "@shared/schema";

interface CastVoteDialogProps {
  election: Election | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (choiceIndex: number) => Promise<void>;
  isPending: boolean;
}

export function CastVoteDialog({
  election,
  open,
  onOpenChange,
  onSubmit,
  isPending,
}: CastVoteDialogProps) {
  const [selectedChoice, setSelectedChoice] = useState<string>("0");

  if (!election) return null;

  const handleSubmit = async () => {
    await onSubmit(parseInt(selectedChoice));
    setSelectedChoice("0");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">{election.title}</DialogTitle>
          <DialogDescription>
            Select your choice below. Your vote will be encrypted and submitted on-chain.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Alert>
            <Lock className="h-4 w-4" />
            <AlertTitle>End-to-End Encryption</AlertTitle>
            <AlertDescription>
              Your vote is encrypted locally using FHE before submission. The blockchain
              only sees ciphertext, ensuring complete privacy.
            </AlertDescription>
          </Alert>

          <div>
            <Label className="text-base font-semibold mb-4 block">
              Choose One Option
            </Label>
            <RadioGroup
              value={selectedChoice}
              onValueChange={setSelectedChoice}
              className="space-y-3"
            >
              {election.choiceLabels.map((label, i) => (
                <div key={i} className="flex items-center space-x-3 hover-elevate rounded-lg p-3 border">
                  <RadioGroupItem
                    value={String(i)}
                    id={`choice-${i}`}
                    data-testid={`radio-choice-${i}`}
                  />
                  <Label
                    htmlFor={`choice-${i}`}
                    className="flex-1 cursor-pointer font-medium"
                  >
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Alert variant="default">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Once submitted, your vote cannot be changed. You can only vote once per election.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            data-testid="button-cancel-vote"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            data-testid="button-submit-vote"
            className="gap-2"
          >
            {isPending ? (
              <>Processing...</>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Submit Encrypted Vote
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
