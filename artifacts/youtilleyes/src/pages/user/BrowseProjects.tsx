import { useGetProjects, getGetProjectsQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Calendar, DollarSign, Briefcase } from "lucide-react";
import { useState } from "react";

export default function BrowseProjects() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: projects, isLoading } = useGetProjects(
    { status: "Open" },
    { query: { queryKey: getGetProjectsQueryKey({ status: "Open" }) } }
  );

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const filteredProjects = projects?.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Browse Open Projects</h1>
          <p className="text-muted-foreground mt-1">Find the right opportunity and submit your bid.</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects by keywords..."
          className="pl-10 h-11 text-base bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {!filteredProjects?.length ? (
          <Card className="flex flex-col items-center justify-center py-16 text-center bg-slate-50 border-dashed">
            <Search className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
            <h3 className="text-lg font-medium">No open projects found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Check back later or adjust your search filters.
            </p>
          </Card>
        ) : (
          filteredProjects.map((project) => (
            <Card key={project.id} className="hover:border-primary/50 transition-all hover:shadow-md bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <Link href={`/user/projects/${project.id}`}>
                      <h3 className="font-bold text-xl hover:text-primary transition-colors">{project.title}</h3>
                    </Link>
                    
                    <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-700">
                      <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md text-slate-800">
                        <Briefcase className="h-4 w-4 text-slate-500" />
                        {project.category || "Uncategorized"}
                      </div>
                      <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-100">
                        <DollarSign className="h-4 w-4" />
                        {project.budget ? `$${project.budget} Est. Budget` : "Negotiable Budget"}
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mt-2">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-slate-700">{project.bidCount}</span> bids so far
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Posted {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                      {project.deadline && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1 text-amber-600 font-medium">
                            Due {new Date(project.deadline).toLocaleDateString()}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center min-w-[140px]">
                    <Link href={`/user/projects/${project.id}`}>
                      <Button className="w-full h-11 font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90">View & Bid</Button>
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