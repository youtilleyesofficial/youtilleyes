import { useGetProjects, getGetProjectsQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Calendar, Briefcase, Send, Users } from "lucide-react";
import { useState } from "react";

export default function BrowseProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

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

  const categories = [...new Set(projects?.map(p => p.category).filter(Boolean))];

  const filteredProjects = projects?.filter(p => {
    const matchesSearch = !searchTerm ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Projects</h1>
          <p className="text-muted-foreground mt-1">
            {projects?.length ?? 0} open {projects?.length === 1 ? "project" : "projects"} available — find the right opportunity and apply now.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects by keywords..."
            className="pl-10 h-11 text-base bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {categories.length > 0 && (
          <select
            className="h-11 px-3 rounded-md border border-input bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-[160px]"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat!}>{cat}</option>
            ))}
          </select>
        )}
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
            <Card key={project.id} className="hover:border-primary/40 transition-all hover:shadow-md bg-white group">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2.5 flex-1 min-w-0">
                    {/* Title + category badge */}
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={`/user/projects/${project.id}`}>
                        <h3 className="font-bold text-lg leading-snug hover:text-primary transition-colors group-hover:text-primary">
                          {project.title}
                        </h3>
                      </Link>
                      {project.category && (
                        <Badge variant="secondary" className="text-xs shrink-0">{project.category}</Badge>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-0.5">
                      {project.budget && (
                        <div className="flex items-center gap-1 text-emerald-700 font-semibold text-sm">
                          ₹{Number(project.budget).toLocaleString("en-IN")} budget
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        <span><span className="font-semibold text-slate-700">{project.bidCount}</span> bids</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        Posted {new Date(project.createdAt).toLocaleDateString("en-IN")}
                      </div>
                      {project.deadline && (
                        <div className="flex items-center gap-1 text-amber-600 font-medium">
                          Due {new Date(project.deadline).toLocaleDateString("en-IN")}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Apply button */}
                  <div className="flex flex-row md:flex-col gap-2 shrink-0">
                    <Link href={`/user/projects/${project.id}#apply`} className="flex-1 md:flex-none">
                      <Button
                        className="w-full md:w-auto h-10 px-5 font-semibold bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
                        size="sm"
                      >
                        <Send className="h-4 w-4" />
                        Apply Now
                      </Button>
                    </Link>
                    <Link href={`/user/projects/${project.id}`} className="flex-1 md:flex-none">
                      <Button variant="outline" size="sm" className="w-full md:w-auto h-10 px-4 text-sm">
                        View Details
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
