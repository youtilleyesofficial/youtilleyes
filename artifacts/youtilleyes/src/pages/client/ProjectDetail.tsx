import { useParams, Link } from "wouter";
import { 
  useGetProjectById, 
  useGetBidsByProject, 
  useGetSubmissionsByProject,
  getGetProjectByIdQueryKey,
  useUpdateProject,
  ProjectStatus
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Loader2, ArrowLeft, Calendar, DollarSign, Briefcase, FileText, Download } from "lucide-react";

export default function ClientProjectDetail() {
  const { id } = useParams();
  const projectId = parseInt(id || "0", 10);
  const queryClient = useQueryClient();

  const { data: project, isLoading: projLoading } = useGetProjectById(projectId, {
    query: { enabled: !!projectId, queryKey: getGetProjectByIdQueryKey(projectId) }
  });

  const { data: bids, isLoading: bidsLoading } = useGetBidsByProject(projectId, {
    query: { enabled: !!projectId && project?.status === 'Open' }
  });

  const { data: submissions, isLoading: subsLoading } = useGetSubmissionsByProject(projectId, {
    query: { enabled: !!projectId && ['Assigned', 'In-Progress', 'Submitted', 'Completed'].includes(project?.status || '') }
  });

  const updateMutation = useUpdateProject();

  const handleMarkCompleted = () => {
    if (confirm("Are you sure you want to mark this project as completed?")) {
      updateMutation.mutate(
        { id: projectId, data: { status: "Completed" as ProjectStatus } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetProjectByIdQueryKey(projectId) });
          }
        }
      );
    }
  };

  if (projLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/client/projects">
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
            <div className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> {project.budget ? `₹${Number(project.budget).toLocaleString("en-IN")}` : "Negotiable"}</div>
            <div className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Created {new Date(project.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
        {project.status !== "Completed" && project.status !== "Open" && (
          <Button onClick={handleMarkCompleted} disabled={updateMutation.isPending}>
            {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Mark Completed
          </Button>
        )}
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="bids" disabled={project.status !== 'Open'}>
            Bids {bids?.length ? `(${bids.length})` : ''}
          </TabsTrigger>
          <TabsTrigger value="submissions" disabled={project.status === 'Open'}>
            Submissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {project.description}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1">Status</div>
                    <StatusBadge status={project.status} />
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Deadline</div>
                    <div className="font-medium">{project.deadline ? new Date(project.deadline).toLocaleDateString() : "Not specified"}</div>
                  </div>
                  {project.assignedUser && (
                    <div>
                      <div className="text-muted-foreground mb-1">Assigned Worker</div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                          {project.assignedUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium">{project.assignedUser.name}</div>
                          <div className="text-xs text-muted-foreground">{project.assignedUser.email}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bids" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Bids Received</CardTitle>
              <CardDescription>
                Note: Admin is responsible for assigning projects to workers based on bids.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bidsLoading ? (
                <div className="py-8 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" /></div>
              ) : !bids?.length ? (
                <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg bg-slate-50">
                  <FileText className="h-8 w-8 mx-auto mb-3 opacity-20" />
                  No bids have been submitted yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {bids.map((bid) => (
                    <div key={bid.id} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold">
                            {bid.user?.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium">{bid.user?.name}</div>
                            <div className="text-xs text-muted-foreground">{new Date(bid.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-primary">₹{Number(bid.amount).toLocaleString("en-IN")}</div>
                          <StatusBadge status={bid.status} />
                        </div>
                      </div>
                      {bid.proposal && (
                        <div className="mt-3 text-sm text-slate-700 bg-white p-3 rounded border">
                          <span className="font-medium block mb-1">Proposal:</span>
                          {bid.proposal}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Deliverables</CardTitle>
            </CardHeader>
            <CardContent>
              {subsLoading ? (
                <div className="py-8 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" /></div>
              ) : !submissions?.length ? (
                <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg bg-slate-50">
                  <FileText className="h-8 w-8 mx-auto mb-3 opacity-20" />
                  No work has been submitted yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {submissions.map((sub) => (
                    <div key={sub.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            Submission <StatusBadge status={sub.status} />
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(sub.createdAt).toLocaleString()}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={sub.fileUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-2" /> Download
                          </a>
                        </Button>
                      </div>
                      
                      {sub.fileDescription && (
                        <div className="text-sm mb-3">
                          <span className="font-medium text-slate-700 block mb-1">Description:</span>
                          {sub.fileDescription}
                        </div>
                      )}
                      
                      {sub.adminNotes && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded text-sm text-blue-900">
                          <span className="font-semibold block mb-1">Admin Notes:</span>
                          {sub.adminNotes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}