import { useGetUserDashboard, getGetUserDashboardQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FileText, Loader2, ArrowRight, Activity, CheckCircle, Briefcase } from "lucide-react";

export default function UserDashboard() {
  const { data: dashboard, isLoading } = useGetUserDashboard({
    query: {
      queryKey: getGetUserDashboardQueryKey()
    }
  });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!dashboard) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Freelancer Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your bids, assigned projects, and submissions.</p>
        </div>
        <Link href="/user/projects">
          <Button>Find New Projects</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard.activeProjects}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Bids</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard.pendingBids}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved Submissions</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard.approvedSubmissions}</div>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-primary">Available Opportunities</CardTitle>
            <Briefcase className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{dashboard.availableProjects}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Assigned Projects</CardTitle>
            <Link href="/user/assigned">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {dashboard.assignedProjects.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No active assigned projects.</p>
            ) : (
              <div className="space-y-4">
                {dashboard.assignedProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                    <div>
                      <Link href={`/user/projects/${project.id}`} className="font-medium hover:underline">
                        {project.title}
                      </Link>
                      <div className="text-xs text-muted-foreground mt-1">
                        Due: {project.deadline ? new Date(project.deadline).toLocaleDateString() : "No deadline"}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <StatusBadge status={project.status} />
                      {project.status === "Assigned" && (
                        <Link href={`/user/submit/${project.id}`}>
                          <Button size="sm" variant="outline" className="h-7 text-xs">Submit Work</Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Bids</CardTitle>
            <Link href="/user/bids">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {dashboard.recentBids.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No recent bids placed.</p>
            ) : (
              <div className="space-y-4">
                {dashboard.recentBids.map((bid) => (
                  <div key={bid.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                    <div>
                      <Link href={`/user/projects/${bid.projectId}`} className="font-medium hover:underline block truncate max-w-[200px] sm:max-w-[250px]">
                        {bid.project?.title || `Project #${bid.projectId}`}
                      </Link>
                      <div className="font-semibold text-primary mt-1">₹{Number(bid.amount).toLocaleString("en-IN")}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <StatusBadge status={bid.status} />
                      <span className="text-xs text-muted-foreground">{new Date(bid.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}