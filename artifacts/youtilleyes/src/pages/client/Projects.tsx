import { useGetClientProjects, getGetClientProjectsQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search, Plus, Calendar, DollarSign, Briefcase } from "lucide-react";
import { useState } from "react";

export default function ClientProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: projects, isLoading } = useGetClientProjects({
    query: {
      queryKey: getGetClientProjectsQueryKey()
    }
  });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const filteredProjects = projects?.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
          <p className="text-muted-foreground mt-1">Manage all your posted projects and track their progress.</p>
        </div>
        <Link href="/client/projects/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Post Project
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="Assigned">Assigned</SelectItem>
            <SelectItem value="In-Progress">In Progress</SelectItem>
            <SelectItem value="Submitted">Submitted</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {!filteredProjects?.length ? (
          <Card className="flex flex-col items-center justify-center py-12 text-center bg-slate-50 border-dashed">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
            <h3 className="text-lg font-medium">No projects found</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              {projects?.length === 0 ? "You haven't posted any projects yet." : "No projects match your current filters."}
            </p>
            {projects?.length === 0 && (
              <Link href="/client/projects/new">
                <Button>Create Your First Project</Button>
              </Link>
            )}
          </Card>
        ) : (
          filteredProjects.map((project) => (
            <Card key={project.id} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <Link href={`/client/projects/${project.id}`}>
                        <h3 className="font-semibold text-lg hover:text-primary transition-colors">{project.title}</h3>
                      </Link>
                      <StatusBadge status={project.status} />
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-2">
                      <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                        <Briefcase className="h-3.5 w-3.5" />
                        {project.category || "Uncategorized"}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3.5 w-3.5" />
                        {project.budget ? `₹${Number(project.budget).toLocaleString("en-IN")}` : "Negotiable"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        Created {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                      {project.deadline && (
                        <div className="flex items-center gap-1 text-amber-600">
                          <Calendar className="h-3.5 w-3.5" />
                          Due {new Date(project.deadline).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end gap-3 min-w-[120px]">
                    <div className="text-center md:text-right">
                      <div className="text-2xl font-bold">{project.bidCount}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Bids</div>
                    </div>
                    <Link href={`/client/projects/${project.id}`}>
                      <Button variant="outline" size="sm" className="w-full">Manage</Button>
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