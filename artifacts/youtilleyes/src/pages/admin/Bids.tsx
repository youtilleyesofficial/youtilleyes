import { useGetBids, getGetBidsQueryKey, BidStatus, useDeleteBid } from "@workspace/api-client-react";
import { useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Loader2, Search, FileText, Calendar, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminBids() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const queryClient = useQueryClient();

  const { data: bids, isLoading } = useGetBids(
    {},
    { query: { queryKey: getGetBidsQueryKey() } }
  );

  const deleteMutation = useDeleteBid();

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this bid?")) {
      deleteMutation.mutate(
        { id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getGetBidsQueryKey() });
            toast.success("Bid deleted successfully");
          }
        }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const filteredBids = bids?.filter(b => {
    const searchString = searchTerm.toLowerCase();
    const matchesSearch = 
      b.project?.title.toLowerCase().includes(searchString) || 
      b.user?.name.toLowerCase().includes(searchString) ||
      b.proposal?.toLowerCase().includes(searchString);
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Global Bids</h1>
          <p className="text-muted-foreground mt-1">Review all bids placed on the platform.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by project, freelancer, or proposal..."
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
            <SelectItem value={BidStatus.Pending}>Pending</SelectItem>
            <SelectItem value={BidStatus.Accepted}>Accepted</SelectItem>
            <SelectItem value={BidStatus.Rejected}>Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="bg-white">
        <CardHeader className="bg-slate-50 border-b pb-4">
          <CardTitle className="text-lg font-medium flex items-center gap-2 text-slate-700">
            <FileText className="h-5 w-5" /> 
            All Bids ({filteredBids?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b">
                <tr>
                  <th className="px-6 py-4 font-medium">Project</th>
                  <th className="px-6 py-4 font-medium">Freelancer</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Timeline</th>
                  <th className="px-6 py-4 font-medium text-right">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredBids?.map((bid) => (
                  <tr key={bid.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/projects/${bid.projectId}`} className="font-semibold text-slate-900 hover:text-primary">
                        {bid.project?.title || `Project #${bid.projectId}`}
                      </Link>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {new Date(bid.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{bid.user?.name}</div>
                      <div className="text-xs text-slate-500">{bid.user?.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 flex items-center">
                        ₹{Number(bid.amount).toLocaleString("en-IN")}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {bid.timeline || "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <StatusBadge status={bid.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(bid.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {!filteredBids?.length && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      <FileText className="h-8 w-8 mx-auto mb-3 opacity-20" />
                      No bids found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}