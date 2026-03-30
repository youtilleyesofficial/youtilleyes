import { useGetProjects, getGetProjectsQueryKey, ProjectStatus } from "@workspace/api-client-react";
import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Loader2, Search, Briefcase, Calendar, DollarSign, ArrowRight } from "lucide-react";

export default function AdminProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: projects, isLoading } = useGetProjects(
    {},
    { query: { queryKey: getGetProjectsQueryKey() } }
  );

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
          <h1 className="text-3xl font-bold tracking-tight">Manage Projects</h1>
          <p className="text-muted-foreground mt-1">Oversight of all projects across the platform.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px] bg-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value={ProjectStatus.Open}>Open</SelectItem>
            <SelectItem value={ProjectStatus.Assigned}>Assigned</SelectItem>
            <SelectItem value={ProjectStatus["In-Progress"]}>In-Progress</SelectItem>
            <SelectItem value={ProjectStatus.Submitted}>Submitted</SelectItem>
            <SelectItem value={ProjectStatus.Completed}>Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {!filteredProjects?.length ? (
          <Card className="flex flex-col items-center justify-center py-16 text-center bg-slate-50 border-dashed">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
            <h3 className="text-lg font-medium">No projects found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Adjust your search or filter criteria.
            </p>
          </Card>
        ) : (
          filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-5 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <Link href={`/admin/projects/${project.id}`}>
                        <h3 className="font-bold text-lg hover:text-primary transition-colors text-slate-900">{project.title}</h3>
                      </Link>
                      <StatusBadge status={project.status} />
                    </div>
                    
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 pt-2">
                      <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md">
                        <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                        {project.category || "Uncategorized"}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="h-3.5 w-3.5 text-slate-400" />
                        {project.budget ? `$${project.budget}` : "Negotiable"}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        Posted {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400">Client:</span> {project.client?.name || `ID: ${project.clientId}`}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-between items-end min-w-[140px] gap-4 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
                    <div className="text-center w-full">
                      <div className="text-2xl font-bold text-slate-800">{project.bidCount}</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Bids Received</div>
                    </div>
                    <Link href={`/admin/projects/${project.id}`} className="w-full">
                      <Button variant="secondary" className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 shadow-none border border-slate-200">
                        Manage <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
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