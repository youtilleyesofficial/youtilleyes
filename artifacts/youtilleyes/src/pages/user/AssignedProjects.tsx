import { useGetUserAssignedProjects, getGetUserAssignedProjectsQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Loader2, Briefcase, Calendar, UploadCloud } from "lucide-react";

export default function AssignedProjects() {
  const { data: projects, isLoading } = useGetUserAssignedProjects({
    query: { queryKey: getGetUserAssignedProjectsQueryKey() }
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
        <h1 className="text-3xl font-bold tracking-tight">Assigned Projects</h1>
        <p className="text-muted-foreground mt-1">Projects you have won and need to deliver.</p>
      </div>

      <div className="grid gap-4">
        {!projects?.length ? (
          <Card className="flex flex-col items-center justify-center py-16 text-center bg-slate-50 border-dashed">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
            <h3 className="text-lg font-medium">No assigned projects</h3>
            <p className="text-sm text-muted-foreground mt-1">
              When a client accepts your bid, the project will appear here.
            </p>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <Link href={`/user/projects/${project.id}`}>
                        <h3 className="text-xl font-bold hover:text-primary transition-colors">{project.title}</h3>
                      </Link>
                      <StatusBadge status={project.status} />
                    </div>
                    <div className="text-sm text-slate-600 line-clamp-2">{project.description}</div>
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 pt-2">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">Client:</span> {project.client?.name || "Unknown"}
                      </div>
                      {project.deadline && (
                        <div className="flex items-center gap-1 text-amber-600">
                          <Calendar className="h-3.5 w-3.5" />
                          Due: {new Date(project.deadline).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 min-w-[140px]">
                    {project.status === "Assigned" || project.status === "In-Progress" ? (
                      <Link href={`/user/submit/${project.id}`}>
                        <Button className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                          <UploadCloud className="h-4 w-4" />
                          Submit Work
                        </Button>
                      </Link>
                    ) : (
                      <Link href={`/user/projects/${project.id}`}>
                        <Button variant="outline" className="w-full">View Details</Button>
                      </Link>
                    )}
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