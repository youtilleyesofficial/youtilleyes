import { useGetUserBids, getGetUserBidsQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Loader2, FileText, Calendar, ArrowRight } from "lucide-react";

export default function MyBids() {
  const { data: bids, isLoading } = useGetUserBids(undefined, {
    query: { queryKey: getGetUserBidsQueryKey() }
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
        <h1 className="text-3xl font-bold tracking-tight">My Bids</h1>
        <p className="text-muted-foreground mt-1">Track the status of all your submitted proposals.</p>
      </div>

      <div className="grid gap-4">
        {!bids?.length ? (
          <Card className="flex flex-col items-center justify-center py-16 text-center bg-slate-50 border-dashed">
            <FileText className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
            <h3 className="text-lg font-medium">No bids yet</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-6">
              You haven't submitted proposals for any projects.
            </p>
            <Link href="/user/projects" className="text-primary font-medium hover:underline flex items-center gap-1">
              Browse Open Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        ) : (
          bids.map((bid) => (
            <Card key={bid.id} className="overflow-hidden">
              <div className="bg-slate-50 px-6 py-3 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Submitted on {new Date(bid.createdAt).toLocaleDateString()}
                </div>
                <StatusBadge status={bid.status} />
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1 space-y-3">
                    <Link href={`/user/projects/${bid.projectId}`}>
                      <h3 className="text-xl font-bold hover:text-primary transition-colors">
                        {bid.project?.title || `Project #${bid.projectId}`}
                      </h3>
                    </Link>
                    {bid.proposal && (
                      <p className="text-sm text-slate-600 line-clamp-2">
                        <span className="font-medium text-slate-800">Proposal: </span>
                        {bid.proposal}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm font-medium text-slate-700 bg-slate-50 w-fit px-3 py-1.5 rounded border border-slate-100">
                      <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                        ₹{Number(bid.amount).toLocaleString("en-IN")}
                      </div>
                      <div className="w-px h-4 bg-slate-300"></div>
                      <div className="text-slate-600">
                        Est. {bid.timeline || "Not specified"}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end min-w-[120px]">
                    <Link href={`/user/projects/${bid.projectId}`} className="w-full">
                      <div className="w-full text-center px-4 py-2 border rounded-md text-sm font-medium hover:bg-slate-50 transition-colors">
                        View Project
                      </div>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}