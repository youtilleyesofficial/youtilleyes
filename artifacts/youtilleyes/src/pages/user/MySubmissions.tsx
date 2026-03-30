import { useGetUserSubmissions, getGetUserSubmissionsQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Loader2, FileText, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MySubmissions() {
  const { data: submissions, isLoading } = useGetUserSubmissions(undefined, {
    query: { queryKey: getGetUserSubmissionsQueryKey() }
  });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Submissions</h1>
        <p className="text-muted-foreground mt-1">Review the work you've submitted and track approval status.</p>
      </div>

      <div className="grid gap-4">
        {!submissions?.length ? (
          <Card className="flex flex-col items-center justify-center py-16 text-center bg-slate-50 border-dashed">
            <FileText className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
            <h3 className="text-lg font-medium">No submissions</h3>
            <p className="text-sm text-muted-foreground mt-1">
              You haven't submitted any work deliverables yet.
            </p>
          </Card>
        ) : (
          submissions.map((sub) => (
            <Card key={sub.id} className="overflow-hidden">
              <div className="bg-slate-50 px-6 py-3 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <span>For Project:</span>
                  <Link href={`/user/projects/${sub.projectId}`} className="text-primary hover:underline">
                    {sub.project?.title || `Project #${sub.projectId}`}
                  </Link>
                </div>
                <StatusBadge status={sub.status} />
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-800 mb-1">Description</div>
                      <p className="text-sm text-slate-600">{sub.fileDescription}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <div className="text-sm font-semibold text-slate-800 mb-1">Submitted On</div>
                      <div className="text-sm text-slate-600 flex items-center md:justify-end gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(sub.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button variant="outline" size="sm" asChild className="gap-2 text-slate-600">
                      <a href={sub.fileUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" /> View Submitted File
                      </a>
                    </Button>
                  </div>

                  {sub.adminNotes && (
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-900">
                      <span className="font-bold flex items-center gap-2 mb-1">Feedback / Notes:</span>
                      {sub.adminNotes}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}