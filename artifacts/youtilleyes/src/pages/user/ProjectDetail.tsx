import { useParams, Link, useLocation } from "wouter";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  useGetProjectById, 
  useCreateBid,
  useGetUserBids,
  getGetProjectByIdQueryKey,
  getGetUserBidsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Loader2, ArrowLeft, Calendar, DollarSign, Briefcase, CheckCircle2 } from "lucide-react";

const bidSchema = z.object({
  amount: z.coerce.number().min(1, "Bid amount must be greater than 0"),
  proposal: z.string().min(20, "Please write a proposal of at least 20 characters"),
  timeline: z.string().min(2, "Please specify an estimated timeline"),
});

type BidFormValues = z.infer<typeof bidSchema>;

export default function UserProjectDetail() {
  const { id } = useParams();
  const projectId = parseInt(id || "0", 10);
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const { data: project, isLoading: projLoading } = useGetProjectById(projectId, {
    query: { enabled: !!projectId, queryKey: getGetProjectByIdQueryKey(projectId) }
  });

  const { data: myBids, isLoading: bidsLoading } = useGetUserBids(undefined, {
    query: { enabled: !!user?.id, queryKey: getGetUserBidsQueryKey() }
  });

  const createBidMutation = useCreateBid();

  const form = useForm<BidFormValues>({
    resolver: zodResolver(bidSchema),
    defaultValues: {
      amount: project?.budget || 0,
      proposal: "",
      timeline: "",
    },
  });

  if (projLoading || bidsLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) return <div>Project not found</div>;

  const existingBid = myBids?.find(b => b.projectId === projectId);
  const isAssignedToMe = project.assignedUserId === user?.id;

  const onSubmit = (data: BidFormValues) => {
    createBidMutation.mutate(
      { 
        data: {
          projectId,
          amount: data.amount,
          proposal: data.proposal,
          timeline: data.timeline
        } 
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetProjectByIdQueryKey(projectId) });
          queryClient.invalidateQueries({ queryKey: getGetUserBidsQueryKey() });
          setLocation("/user/bids");
        }
      }
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/user/projects">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
            <StatusBadge status={project.status} />
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {project.category || "Uncategorized"}</div>
            <div className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> {project.budget ? `₹${Number(project.budget).toLocaleString("en-IN")} Budget` : "Negotiable Budget"}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                {project.description}
              </div>
            </CardContent>
          </Card>

          {project.status === "Open" && !existingBid && (
            <Card className="border-secondary/50 shadow-sm">
              <CardHeader className="bg-secondary/5 border-b border-secondary/10 pb-4">
                <CardTitle className="text-xl text-secondary-foreground">Submit Your Bid</CardTitle>
                <CardDescription>Stand out by providing a clear proposal and realistic timeline.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-slate-700">Bid Amount (₹ INR)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                <Input type="number" className="pl-10 text-lg font-medium" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="timeline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-slate-700">Estimated Timeline</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 2 weeks, 5 days" className="text-lg font-medium" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="proposal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-slate-700">Cover Letter / Proposal</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Why are you the best fit for this project? What is your approach?" 
                              className="min-h-[160px] text-base"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg h-12"
                      disabled={createBidMutation.isPending}
                    >
                      {createBidMutation.isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                      Submit Bid
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {existingBid && (
            <Card className="border-emerald-200 bg-emerald-50/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="h-5 w-5" /> You have placed a bid
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Bid Amount</div>
                    <div className="text-xl font-bold text-slate-800">₹{Number(existingBid.amount).toLocaleString("en-IN")}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Status</div>
                    <StatusBadge status={existingBid.status} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Timeline</div>
                    <div className="font-medium text-slate-800">{existingBid.timeline}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Submitted On</div>
                    <div className="font-medium text-slate-800">{new Date(existingBid.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
                {existingBid.proposal && (
                  <div className="pt-4 border-t border-emerald-100">
                    <div className="text-sm text-slate-500 mb-2">Your Proposal</div>
                    <div className="text-sm text-slate-700 bg-white p-4 rounded border border-emerald-100 whitespace-pre-wrap">
                      {existingBid.proposal}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {isAssignedToMe && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-primary">Project Action</CardTitle>
                <CardDescription>You are assigned to this project.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/user/submit/${project.id}`}>
                  <Button size="lg" className="w-full">Submit Work Deliverables</Button>
                </Link>
              </CardContent>
            </Card>
          )}

        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <div className="text-muted-foreground mb-1">Posted By</div>
                <div className="font-medium">{project.client?.name || "Client"}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Date Posted</div>
                <div className="font-medium">{new Date(project.createdAt).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Deadline</div>
                <div className="font-medium text-amber-700">{project.deadline ? new Date(project.deadline).toLocaleDateString() : "Not specified"}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Total Bids</div>
                <div className="font-medium">{project.bidCount} bids submitted</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}