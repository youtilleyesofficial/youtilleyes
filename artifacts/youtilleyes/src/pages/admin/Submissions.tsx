import { useGetSubmissions, getGetSubmissionsQueryKey, useUpdateSubmission, SubmissionStatus } from "@workspace/api-client-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Loader2, FileText, Check, X, Send, ExternalLink, Calendar } from "lucide-react";
import { toast } from "sonner";

export default function AdminSubmissions() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [reviewDialog, setReviewDialog] = useState<{ isOpen: boolean; subId: number | null; action: 'Approved' | 'Forwarded' | 'Rejected' | null; notes: string }>({
    isOpen: false,
    subId: null,
    action: null,
    notes: ""
  });

  const queryClient = useQueryClient();

  const { data: submissions, isLoading } = useGetSubmissions(
    {},
    { query: { queryKey: getGetSubmissionsQueryKey() } }
  );

  const updateMutation = useUpdateSubmission();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const filteredSubmissions = submissions?.filter(s => {
    return statusFilter === "all" || s.status === statusFilter;
  });

  const openReviewDialog = (subId: number, action: 'Approved' | 'Forwarded' | 'Rejected') => {
    setReviewDialog({ isOpen: true, subId, action, notes: "" });
  };

  const handleReviewSubmit = () => {
    if (!reviewDialog.subId || !reviewDialog.action) return;

    updateMutation.mutate(
      { 
        id: reviewDialog.subId, 
        data: { 
          status: reviewDialog.action as SubmissionStatus, 
          adminNotes: reviewDialog.notes 
        } 
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetSubmissionsQueryKey() });
          toast.success(`Submission ${reviewDialog.action.toLowerCase()} successfully`);
          setReviewDialog({ isOpen: false, subId: null, action: null, notes: "" });
        },
        onError: (err) => {
          toast.error(err.error?.message || "Failed to update submission");
        }
      }
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Submission Review</h1>
          <p className="text-muted-foreground mt-1">Review work, approve, reject, or forward to clients.</p>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Submissions</SelectItem>
            <SelectItem value={SubmissionStatus.Pending}>Pending Review</SelectItem>
            <SelectItem value={SubmissionStatus.Approved}>Approved</SelectItem>
            <SelectItem value={SubmissionStatus.Forwarded}>Forwarded</SelectItem>
            <SelectItem value={SubmissionStatus.Rejected}>Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {!filteredSubmissions?.length ? (
          <Card className="flex flex-col items-center justify-center py-16 text-center bg-slate-50 border-dashed">
            <FileText className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
            <h3 className="text-lg font-medium">No submissions</h3>
            <p className="text-sm text-muted-foreground mt-1">
              No submissions match your current filters.
            </p>
          </Card>
        ) : (
          filteredSubmissions.map((sub) => (
            <Card key={sub.id} className="overflow-hidden bg-white hover:shadow-md transition-shadow">
              <div className="bg-slate-50 px-6 py-3 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium text-slate-800">
                    Project: <Link href={`/admin/projects/${sub.projectId}`} className="text-primary hover:underline">{sub.project?.title || `#${sub.projectId}`}</Link>
                  </div>
                </div>
                <StatusBadge status={sub.status} />
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Freelancer</span>
                        <div className="font-medium text-slate-900">{sub.user?.name}</div>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Submitted On</span>
                        <div className="flex items-center gap-1.5 text-sm text-slate-700">
                          <Calendar className="h-4 w-4" /> {new Date(sub.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Deliverable Link & Description</span>
                      <p className="text-sm text-slate-700 mb-2">{sub.fileDescription}</p>
                      <Button variant="outline" size="sm" asChild className="text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">
                        <a href={sub.fileUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" /> Open Deliverable Link
                        </a>
                      </Button>
                    </div>

                    {(sub.notes || sub.adminNotes) && (
                      <div className="space-y-3 pt-3 border-t">
                        {sub.notes && (
                          <div className="bg-slate-50 p-3 rounded border text-sm">
                            <span className="font-semibold block mb-1 text-slate-700">Freelancer Notes:</span>
                            <span className="text-slate-600">{sub.notes}</span>
                          </div>
                        )}
                        {sub.adminNotes && (
                          <div className="bg-purple-50 p-3 rounded border border-purple-100 text-sm">
                            <span className="font-semibold block mb-1 text-purple-800">Admin Notes:</span>
                            <span className="text-purple-700">{sub.adminNotes}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {sub.status === "Pending" && (
                    <div className="flex flex-col gap-3 min-w-[200px] border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6">
                      <h4 className="text-sm font-semibold mb-2 text-slate-800">Review Actions</h4>
                      <Button 
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white justify-start"
                        onClick={() => openReviewDialog(sub.id, "Approved")}
                      >
                        <Check className="h-4 w-4 mr-2" /> Approve
                      </Button>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start"
                        onClick={() => openReviewDialog(sub.id, "Forwarded")}
                      >
                        <Send className="h-4 w-4 mr-2" /> Forward to Client
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="w-full justify-start"
                        onClick={() => openReviewDialog(sub.id, "Rejected")}
                      >
                        <X className="h-4 w-4 mr-2" /> Reject
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={reviewDialog.isOpen} onOpenChange={(open) => !open && setReviewDialog(prev => ({...prev, isOpen: false}))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {reviewDialog.action === 'Approved' && "Approve Submission"}
              {reviewDialog.action === 'Forwarded' && "Forward Submission to Client"}
              {reviewDialog.action === 'Rejected' && "Reject Submission"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Add notes (optional for approval, required for rejection)</label>
              <Textarea 
                placeholder="Explain the reasoning or provide feedback..."
                value={reviewDialog.notes}
                onChange={(e) => setReviewDialog(prev => ({...prev, notes: e.target.value}))}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialog(prev => ({...prev, isOpen: false}))}>Cancel</Button>
            <Button 
              onClick={handleReviewSubmit} 
              disabled={updateMutation.isPending || (reviewDialog.action === 'Rejected' && !reviewDialog.notes.trim())}
              className={
                reviewDialog.action === 'Approved' ? 'bg-emerald-600 hover:bg-emerald-700' :
                reviewDialog.action === 'Forwarded' ? 'bg-blue-600 hover:bg-blue-700' :
                'bg-red-600 hover:bg-red-700'
              }
            >
              {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm {reviewDialog.action}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}