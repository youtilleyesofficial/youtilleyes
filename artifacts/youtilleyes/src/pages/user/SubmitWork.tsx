import { useParams, Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  useGetProjectById, 
  useCreateSubmission,
  getGetProjectByIdQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Loader2, ArrowLeft, UploadCloud, Link as LinkIcon } from "lucide-react";

const submissionSchema = z.object({
  fileUrl: z.string().url("Must be a valid URL (Google Drive, GitHub, Dropbox, etc.)"),
  fileDescription: z.string().min(10, "Provide a short description of the deliverable"),
  notes: z.string().optional(),
});

type SubmissionFormValues = z.infer<typeof submissionSchema>;

export default function SubmitWork() {
  const { id } = useParams();
  const projectId = parseInt(id || "0", 10);
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const { data: project, isLoading: projLoading } = useGetProjectById(projectId, {
    query: { enabled: !!projectId, queryKey: getGetProjectByIdQueryKey(projectId) }
  });

  const submitMutation = useCreateSubmission();

  const form = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      fileUrl: "",
      fileDescription: "",
      notes: "",
    },
  });

  if (projLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) return <div>Project not found</div>;

  const onSubmit = (data: SubmissionFormValues) => {
    submitMutation.mutate(
      { 
        data: {
          projectId,
          ...data
        } 
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetProjectByIdQueryKey(projectId) });
          setLocation("/user/submissions");
        }
      }
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/user/assigned">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Submit Work</h1>
          <p className="text-muted-foreground mt-1">Deliver your completed work for "{project.title}"</p>
        </div>
      </div>

      <Card className="border-emerald-100 shadow-md">
        <CardHeader className="bg-emerald-50/50 border-b border-emerald-100">
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <UploadCloud className="h-5 w-5" /> Deliverables Upload
          </CardTitle>
          <CardDescription>
            Provide a link to your final files. Ensure the client has access permissions if using Drive/Dropbox.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <FormField
                control={form.control}
                name="fileUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-slate-700">File URL (Google Drive, Dropbox, etc.) <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="https://..." className="pl-9 bg-slate-50" {...field} />
                      </div>
                    </FormControl>
                    <FormDescription>Make sure link sharing is turned on.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fileDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-slate-700">What does this link contain? <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Final ZIP file with all React source code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-slate-700">Message to Client (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any additional instructions or notes about the delivery..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4 pt-4 border-t">
                <Link href="/user/assigned">
                  <Button variant="outline" type="button">Cancel</Button>
                </Link>
                <Button 
                  type="submit" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[150px]"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                  Submit Work
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}