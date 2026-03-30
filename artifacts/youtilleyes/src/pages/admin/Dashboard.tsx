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
    <div className="space-y-6 w-full min-w-0 overflow-x-hidden">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Platform Overview</h1>
        <p className="text-muted-foreground mt-1 text-sm">Global statistics and recent activity across YouTillEyes.</p>
      </div>

      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-1 px-3 pt-3">
            <CardTitle className="text-xs font-medium text-slate-600 leading-tight">Total Users</CardTitle>
            <Users className="h-3.5 w-3.5 text-primary shrink-0" />
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <div className="text-2xl font-bold text-slate-900">{dashboard.totalUsers}</div>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
              <span className="font-medium text-slate-700">{dashboard.totalClients}</span> Clients · <span className="font-medium text-slate-700">{dashboard.totalWorkers}</span> Talent
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-1 px-3 pt-3">
            <CardTitle className="text-xs font-medium text-slate-600 leading-tight">Total Projects</CardTitle>
            <Briefcase className="h-3.5 w-3.5 text-blue-500 shrink-0" />
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <div className="text-2xl font-bold text-slate-900">{dashboard.totalProjects}</div>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
              <span className="font-medium text-emerald-600">{dashboard.openProjects} Open</span> · <span className="font-medium text-slate-700">{dashboard.completedProjects} Done</span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-1 px-3 pt-3">
            <CardTitle className="text-xs font-medium text-slate-600 leading-tight">Active Bids</CardTitle>
            <FileText className="h-3.5 w-3.5 text-amber-500 shrink-0" />
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <div className="text-2xl font-bold text-slate-900">{dashboard.totalBids}</div>
            <p className="text-[10px] text-muted-foreground mt-0.5">All open projects</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-purple-200 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-1 px-3 pt-3">
            <CardTitle className="text-xs font-medium text-purple-700 leading-tight">Pending Reviews</CardTitle>
            <CheckCircle2 className="h-3.5 w-3.5 text-purple-600 shrink-0" />
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <div className="text-2xl font-bold text-purple-700">{dashboard.pendingSubmissions}</div>
            <p className="text-[10px] text-purple-600/80 mt-0.5 leading-tight">Need admin review</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 min-w-0 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Projects by Category</CardTitle>
            <CardDescription className="text-xs">Distribution of active and completed projects</CardDescription>
          </CardHeader>
          <CardContent className="h-[220px] md:h-[300px] p-2 md:p-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: 12 }}
                />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="flex flex-col min-w-0 overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Activity Feed</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardDescription className="text-xs">Latest platform events</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto max-h-[300px]">
            <div className="space-y-3">
              {activity?.map((item) => (
                <div key={item.id} className="flex gap-2 text-sm">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-slate-800 text-xs leading-snug break-words">
                      <span className="font-semibold">{item.userName}</span> {item.message}
                      {item.projectTitle && <span className="font-medium italic text-slate-700"> "{item.projectTitle}"</span>}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</p>
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