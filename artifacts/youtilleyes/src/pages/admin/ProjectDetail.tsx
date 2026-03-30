import { useParams, Link } from "wouter";
import { 
  useGetProjectById, 
  useGetBidsByProject, 
  useGetSubmissionsByProject,
  useAssignProject,
  useDeleteProject,
  getGetProjectByIdQueryKey,
  getGetProjectsQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Loader2, ArrowLeft, Calendar, Briefcase, FileText, UserPlus, CheckCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

export default function AdminProjectDetail() {
  const { id } = useParams();
  const projectId = parseInt(id || "0", 10);
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const { data: project, isLoading: projLoading } = useGetProjectById(projectId, {
    query: { enabled: !!projectId, queryKey: getGetProjectByIdQueryKey(projectId) }
  });

  const { data: bids, isLoading: bidsLoading } = useGetBidsByProject(projectId, {
    query: { enabled: !!projectId }
  });

  const { data: submissions, isLoading: subsLoading } = useGetSubmissionsByProject(projectId, {
    query: { enabled: !!projectId }
  });

  const assignMutation = useAssignProject();
  const deleteMutation = useDeleteProject();

  const handleAssignWorker = (userId: number, userName: string) => {
    if (confirm(`Assign this project to ${userName}? This will change the project status to Assigned and reject other bids.`)) {
      assignMutation.mutate(
        { id: projectId, data: { userId } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetProjectByIdQueryKey(projectId) });
            toast.success(`Project assigned to ${userName}`);
          },
          onError: (error) => {
            toast.error(error.error?.message || "Failed to assign project");
          }
        }
      );
    }
  };

  const handleDeleteProject = () => {
    if (confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      deleteMutation.mutate(
        { id: projectId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetProjectsQueryKey() });
            toast.success("Project deleted");
            setLocation("/admin/projects");
          },
          onError: (error) => {
            toast.error(error.error?.message || "Failed to delete project");
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

  if (!project) return <div>Project not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects">
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
            <div className="flex items-center gap-1">{project.budget ? `₹${Number(project.budget).toLocaleString("en-IN")}` : "Negotiable"}</div>
            <div className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Posted {new Date(project.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
        <Button variant="destructive" onClick={handleDeleteProject} disabled={deleteMutation.isPending}>
          {deleteMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
          Delete
        </Button>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md bg-white border border-slate-200">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="bids">
            Bids {bids?.length ? `(${bids.length})` : ''}
          </TabsTrigger>
          <TabsTrigger value="submissions">
            Submissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                    {project.description}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">Project Metadata</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1 text-xs font-semibold uppercase tracking-wider">Client</div>
                    <div className="font-medium text-slate-900">{project.client?.name || `ID: ${project.clientId}`}</div>
                    <div className="text-xs text-slate-500">{project.client?.email}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1 text-xs font-semibold uppercase tracking-wider">Deadline</div>
                    <div className="font-medium">{project.deadline ? new Date(project.deadline).toLocaleDateString() : "Not specified"}</div>
                  </div>
                  {project.assignedUser ? (
                    <div className="pt-4 border-t border-slate-100">
                      <div className="text-emerald-700 mb-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle className="h-3.5 w-3.5" /> Assigned Talent
                      </div>
                      <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                          {project.assignedUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{project.assignedUser.name}</div>
                          <div className="text-xs text-slate-600">{project.assignedUser.email}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-slate-100">
                      <div className="text-amber-600 text-xs font-bold uppercase tracking-wider">Not Assigned</div>
                      <p className="text-xs text-slate-500 mt-1">Review bids to assign a freelancer to this project.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bids" className="mt-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Bids Received</CardTitle>
              <CardDescription>
                Review bids and assign the project to the most suitable freelancer.
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
                    <div key={bid.id} className={`p-5 border rounded-lg transition-colors ${bid.status === 'Accepted' ? 'bg-emerald-50 border-emerald-200' : 'hover:bg-slate-50'}`}>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                            {bid.user?.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 text-lg">{bid.user?.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2">
                              {bid.user?.email} 
                              <span>•</span>
                              {new Date(bid.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1 w-full md:w-auto justify-between md:justify-end">
                          <div className="font-bold text-2xl text-slate-800">${bid.amount}</div>
                          <StatusBadge status={bid.status} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-3 space-y-3">
                          {bid.timeline && (
                            <div className="text-sm">
                              <span className="font-semibold text-slate-700 mr-2">Estimated Timeline:</span>
                              <span className="text-slate-600">{bid.timeline}</span>
                            </div>
                          )}
                          {bid.proposal && (
                            <div className="text-sm">
                              <span className="font-semibold text-slate-700 block mb-1">Proposal:</span>
                              <p className="text-slate-600 bg-white p-3 rounded border border-slate-100 whitespace-pre-wrap">{bid.proposal}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col justify-end lg:items-end border-t lg:border-t-0 pt-4 lg:pt-0">
                          {project.status === "Open" && bid.status === "Pending" && (
                            <Button 
                              onClick={() => handleAssignWorker(bid.userId, bid.user?.name || "Freelancer")}
                              disabled={assignMutation.isPending}
                              className="w-full lg:w-auto"
                            >
                              <UserPlus className="h-4 w-4 mr-2" /> Assign Project
                            </Button>
                          )}
                          {bid.status === "Accepted" && (
                            <div className="flex items-center gap-2 text-emerald-600 font-semibold bg-emerald-100 px-4 py-2 rounded-md w-full justify-center">
                              <CheckCircle className="h-5 w-5" /> Assigned
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions" className="mt-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Project Submissions</CardTitle>
              <CardDescription>All work delivered by the assigned freelancer.</CardDescription>
            </CardHeader>
            <CardContent>
              {subsLoading ? (
                <div className="py-8 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" /></div>
              ) : !submissions?.length ? (
                <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg bg-slate-50">
                  <FileText className="h-8 w-8 mx-auto mb-3 opacity-20" />
                  No deliverables submitted yet.
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
                            View File
                          </a>
                        </Button>
                      </div>
                      
                      <div className="text-sm">
                        <span className="font-medium text-slate-700 block mb-1">Description:</span>
                        <div className="bg-slate-50 p-3 rounded">{sub.fileDescription}</div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-100 text-sm text-center text-slate-500">
                        To manage this submission, go to the Global Submissions tab.
                      </div>
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