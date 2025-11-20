import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Lock, X, Calendar, Eye, Clock, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createElectionSchema, type CreateElectionInput } from "@shared/schema";

interface CreateElectionFormProps {
  onSubmit: (data: CreateElectionInput) => Promise<void>;
  isPending: boolean;
}

export function CreateElectionForm({ onSubmit, isPending }: CreateElectionFormProps) {
  const [choiceInputs, setChoiceInputs] = useState(["", ""]);
  
  const form = useForm<CreateElectionInput>({
    resolver: zodResolver(createElectionSchema),
    defaultValues: {
      title: "",
      description: "",
      choiceLabels: ["", ""],
      votingStartTime: "",
      votingEndTime: "",
      resultRevealTime: "",
      imageUrl: "",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Create Election
        </CardTitle>
        <CardDescription>
          Create a new encrypted election. All votes will be homomorphically aggregated on-chain.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Election Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Community Governance Vote"
                      data-testid="input-election-title"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A clear, descriptive title for this election
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide additional context about this election..."
                      data-testid="input-election-description"
                      className="resize-none h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Add optional details about what this election is for
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Choice Options</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newChoices = [...choiceInputs, ""];
                    setChoiceInputs(newChoices);
                    form.setValue("choiceLabels", newChoices);
                  }}
                  data-testid="button-add-choice"
                  disabled={choiceInputs.length >= 10}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Choice
                </Button>
              </div>
              
              {choiceInputs.map((_, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`choiceLabels.${index}` as any}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2">
                        <FormControl className="flex-1">
                          <Input
                            placeholder={`Choice ${index + 1} (e.g., "Option A")`}
                            data-testid={`input-choice-${index}`}
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              const newChoices = [...choiceInputs];
                              newChoices[index] = e.target.value;
                              setChoiceInputs(newChoices);
                            }}
                          />
                        </FormControl>
                        {choiceInputs.length > 2 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const newChoices = choiceInputs.filter((_, i) => i !== index);
                              setChoiceInputs(newChoices);
                              form.setValue("choiceLabels", newChoices);
                            }}
                            data-testid={`button-remove-choice-${index}`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              
              <FormDescription>
                Add 2-10 choices for voters to pick from. Each choice needs a unique label.
              </FormDescription>
            </div>

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    Election Image URL (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.png"
                      data-testid="input-image-url"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Add a visual banner for this election
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="votingStartTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Voting Start Time (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        data-testid="input-voting-start-time"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      When voting should begin
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="votingEndTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Voting End Time (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        data-testid="input-voting-end-time"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      When voting should close
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="resultRevealTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Result Reveal Time (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      data-testid="input-result-reveal-time"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    When results should be revealed
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                A zero-vector will be encrypted client-side using FHE to initialize the tally.
                This ensures votes remain private throughout the election.
              </AlertDescription>
            </Alert>

            <Button
              type="submit"
              size="lg"
              disabled={isPending}
              data-testid="button-create-election"
              className="w-full gap-2"
            >
              {isPending ? (
                <>Encrypting & Processing... (This may take 1-2 minutes)</>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Create Election
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
