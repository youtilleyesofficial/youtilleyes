import { useGetAdminDashboard, getGetAdminDashboardQueryKey, useGetRecentActivity, getGetRecentActivityQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Users, Building, Briefcase, FileText, CheckCircle2, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const { data: dashboard, isLoading: dashLoading } = useGetAdminDashboard({
    query: { queryKey: getGetAdminDashboardQueryKey() }
  });

  const { data: activity, isLoading: actLoading } = useGetRecentActivity({
    query: { queryKey: getGetRecentActivityQueryKey() }
  });

  if (dashLoading || actLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!dashboard) return null;

  const chartData = dashboard.projectsByCategory.map(c => ({
    name: c.category || 'Uncategorized',
    total: c.count
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Platform Overview</h1>
        <p className="text-muted-foreground mt-1">Global statistics and recent activity across YouTillEyes.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{dashboard.totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="font-medium text-slate-700">{dashboard.totalClients}</span> Clients · <span className="font-medium text-slate-700">{dashboard.totalWorkers}</span> Talent
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{dashboard.totalProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="font-medium text-emerald-600">{dashboard.openProjects} Open</span> · <span className="font-medium text-slate-700">{dashboard.completedProjects} Completed</span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Active Bids</CardTitle>
            <FileText className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{dashboard.totalBids}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all open projects</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Pending Reviews</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700">{dashboard.pendingSubmissions}</div>
            <p className="text-xs text-purple-600/80 mt-1">Submissions require admin review</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Projects by Category</CardTitle>
            <CardDescription>Distribution of active and completed projects</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Activity Feed</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardDescription>Latest platform events</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-4 pr-2">
              {activity?.map((item) => (
                <div key={item.id} className="flex gap-3 text-sm">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                  <div className="space-y-1">
                    <p className="text-slate-800">
                      <span className="font-semibold">{item.userName}</span> {item.message}
                      {item.projectTitle && <span className="font-medium italic text-slate-700"> "{item.projectTitle}"</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              ))}
              {!activity?.length && <p className="text-sm text-muted-foreground text-center py-4">No recent activity.</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Latest projects created on the platform</CardDescription>
          </div>
          <Link href="/admin/projects">
            <Button variant="outline" size="sm">View All Projects</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                <tr>
                  <th className="px-4 py-3 font-medium">Project</th>
                  <th className="px-4 py-3 font-medium">Client</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Budget</th>
                  <th className="px-4 py-3 font-medium text-right">Bids</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.recentProjects.map((project) => (
                  <tr key={project.id} className="border-b last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/admin/projects/${project.id}`} className="font-medium text-slate-900 hover:text-primary">
                        {project.title}
                      </Link>
                      <div className="text-xs text-muted-foreground mt-0.5">{project.category || 'Uncategorized'}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{project.client?.name || `ID: ${project.clientId}`}</td>
                    <td className="px-4 py-3"><StatusBadge status={project.status} /></td>
                    <td className="px-4 py-3 font-medium text-slate-700">{project.budget ? `₹${Number(project.budget).toLocaleString("en-IN")}` : '-'}</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-700">{project.bidCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}