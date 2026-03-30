import { useGetUsers, getGetUsersQueryKey, UserRole, useGetUserById } from "@workspace/api-client-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Users as UsersIcon, Mail, Phone, Calendar, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function UserDetailDialog({ userId, open, onOpenChange }: { userId: number | null, open: boolean, onOpenChange: (o: boolean) => void }) {
  const { data: user, isLoading } = useGetUserById(userId || 0, {
    query: { enabled: !!userId }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>Detailed information about the user.</DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="py-8 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : user ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-2xl">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-lg">{user.name}</h3>
                <div className="text-sm text-slate-500">{user.email}</div>
                <Badge variant="outline" className="mt-1">{user.role}</Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <span className="text-xs font-semibold text-slate-500 block mb-1">Phone</span>
                <div className="text-sm">{user.phone || "-"}</div>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 block mb-1">Status</span>
                <div className="text-sm">{user.isActive ? "Active" : "Inactive"}</div>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 block mb-1">Joined</span>
                <div className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</div>
              </div>
            </div>

            {(user.bio || user.skills) && (
              <div className="pt-4 border-t space-y-3">
                {user.bio && (
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block mb-1">Bio</span>
                    <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded">{user.bio}</p>
                  </div>
                )}
                {user.skills && (
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block mb-1">Skills</span>
                    <p className="text-sm text-slate-700">{user.skills}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 text-center text-slate-500">Failed to load user details.</div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const { data: users, isLoading } = useGetUsers(
    {},
    { query: { queryKey: getGetUsersQueryKey() } }
  );

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const filteredUsers = users?.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role: string) => {
    if (role === 'ADMIN') return "bg-purple-100 text-purple-800 border-purple-200";
    if (role === 'CLIENT') return "bg-blue-100 text-blue-800 border-blue-200";
    return "bg-emerald-100 text-emerald-800 border-emerald-200";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Users</h1>
          <p className="text-muted-foreground mt-1">Manage and view all registered users across the platform.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name or email..."
            className="pl-10 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-[180px] bg-white">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value={UserRole.ADMIN}>Admins</SelectItem>
            <SelectItem value={UserRole.CLIENT}>Clients</SelectItem>
            <SelectItem value={UserRole.USER}>Freelancers</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className="bg-slate-50 border-b pb-4">
          <CardTitle className="text-lg font-medium flex items-center gap-2 text-slate-700">
            <UsersIcon className="h-5 w-5" /> 
            User Directory ({filteredUsers?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-4 font-medium">User</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Joined</th>
                  <th className="px-6 py-4 font-medium text-right">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers?.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{user.name}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <Mail className="h-3 w-3" /> {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={`${getRoleBadgeColor(user.role)} font-semibold`}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {user.phone ? (
                        <div className="flex items-center gap-1.5 text-xs">
                          <Phone className="h-3.5 w-3.5" /> {user.phone}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">No phone</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar className="h-3.5 w-3.5" /> 
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {user.isActive ? (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Active</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-slate-100 text-slate-500 border-slate-200">Inactive</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" onClick={() => setSelectedUser(user.id)}>
                        <Info className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {!filteredUsers?.length && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      <UsersIcon className="h-8 w-8 mx-auto mb-3 opacity-20" />
                      No users found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <UserDetailDialog 
        userId={selectedUser} 
        open={!!selectedUser} 
        onOpenChange={(open) => !open && setSelectedUser(null)} 
      />
    </div>
  );
}