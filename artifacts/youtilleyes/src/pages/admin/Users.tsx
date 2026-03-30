import { useGetUsers, getGetUsersQueryKey } from "@workspace/api-client-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Users as UsersIcon, Mail, Phone, Calendar, Pencil, Trash2, ShieldOff, ShieldCheck, Building2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

const API_BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") + "/api";

async function adminFetch(path: string, method: string, body?: object) {
  const token = localStorage.getItem("youtilleyes_token");
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
}

type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string | null;
  bio: string | null;
  skills: string | null;
  isActive: boolean;
  createdAt: string;
};

function EditUserDialog({
  user,
  open,
  onOpenChange,
  onSaved,
}: {
  user: AdminUser | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    bio: user?.bio ?? "",
    skills: user?.skills ?? "",
    role: user?.role ?? "USER",
    password: "",
  });
  const [saving, setSaving] = useState(false);

  if (!user) return null;

  const handleChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminFetch(`/users/${user.id}`, "PATCH", {
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        bio: form.bio || undefined,
        skills: form.skills || undefined,
        role: form.role,
        ...(form.password.trim() ? { password: form.password.trim() } : {}),
      });
      toast({ title: "Profile updated", description: `${form.name}'s details saved.` });
      onSaved();
      onOpenChange(false);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update {user.name}'s details. Leave password blank to keep unchanged.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold mb-1 block">Full Name</Label>
              <Input value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs font-semibold mb-1 block">Email</Label>
              <Input type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold mb-1 block">Phone</Label>
              <Input value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="+91..." />
            </div>
            <div>
              <Label className="text-xs font-semibold mb-1 block">Role</Label>
              <Select value={form.role} onValueChange={(v) => handleChange("role", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">USER</SelectItem>
                  <SelectItem value="CLIENT">CLIENT</SelectItem>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-xs font-semibold mb-1 block">Skills / Expertise</Label>
            <Input value={form.skills} onChange={(e) => handleChange("skills", e.target.value)} placeholder="e.g. React, Node.js, Design" />
          </div>
          <div>
            <Label className="text-xs font-semibold mb-1 block">Bio</Label>
            <Input value={form.bio} onChange={(e) => handleChange("bio", e.target.value)} placeholder="Short bio..." />
          </div>
          <div>
            <Label className="text-xs font-semibold mb-1 block">New Password (optional)</Label>
            <Input type="password" value={form.password} onChange={(e) => handleChange("password", e.target.value)} placeholder="Min 6 characters" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DeleteConfirmDialog({
  user,
  open,
  onOpenChange,
  onDeleted,
}: {
  user: AdminUser | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onDeleted: () => void;
}) {
  const [deleting, setDeleting] = useState(false);
  if (!user) return null;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await adminFetch(`/users/${user.id}`, "DELETE");
      toast({ title: "User deleted", description: `${user.name}'s account has been removed.` });
      onDeleted();
      onOpenChange(false);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-red-600">Delete Profile</DialogTitle>
          <DialogDescription>
            Are you sure you want to permanently delete <strong>{user.name}</strong>'s account? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
            {deleting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Delete Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function UserTable({ users, onEdit, onDelete, onToggleBlock, refreshing }: {
  users: AdminUser[];
  onEdit: (u: AdminUser) => void;
  onDelete: (u: AdminUser) => void;
  onToggleBlock: (u: AdminUser) => void;
  refreshing: number | null;
}) {
  const getRoleBadgeColor = (role: string) => {
    if (role === "ADMIN") return "bg-purple-100 text-purple-800 border-purple-200";
    if (role === "CLIENT") return "bg-blue-100 text-blue-800 border-blue-200";
    return "bg-emerald-100 text-emerald-800 border-emerald-200";
  };

  if (!users.length) {
    return (
      <div className="py-16 text-center text-slate-500">
        <UsersIcon className="h-10 w-10 mx-auto mb-3 opacity-20" />
        No accounts found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
          <tr>
            <th className="px-5 py-4 font-medium">User</th>
            <th className="px-5 py-4 font-medium">Role</th>
            <th className="px-5 py-4 font-medium">Contact</th>
            <th className="px-5 py-4 font-medium">Joined</th>
            <th className="px-5 py-4 font-medium text-center">Status</th>
            <th className="px-5 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {users.map((user) => (
            <tr key={user.id} className={`hover:bg-slate-50/60 transition-colors ${!user.isActive ? "opacity-60" : ""}`}>
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-white ${user.role === "CLIENT" ? "bg-blue-500" : "bg-emerald-500"}`}>
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
              <td className="px-5 py-4">
                <Badge variant="outline" className={`${getRoleBadgeColor(user.role)} font-semibold`}>
                  {user.role}
                </Badge>
              </td>
              <td className="px-5 py-4 text-slate-600">
                {user.phone ? (
                  <div className="flex items-center gap-1.5 text-xs">
                    <Phone className="h-3.5 w-3.5" /> {user.phone}
                  </div>
                ) : (
                  <span className="text-slate-400 italic text-xs">No phone</span>
                )}
              </td>
              <td className="px-5 py-4 text-slate-600">
                <div className="flex items-center gap-1.5 text-xs">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(user.createdAt).toLocaleDateString("en-IN")}
                </div>
              </td>
              <td className="px-5 py-4 text-center">
                {user.isActive ? (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Active</Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Blocked</Badge>
                )}
              </td>
              <td className="px-5 py-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50" title="Edit" onClick={() => onEdit(user)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${user.isActive ? "text-amber-600 hover:bg-amber-50" : "text-emerald-600 hover:bg-emerald-50"}`}
                    title={user.isActive ? "Block" : "Unblock"}
                    onClick={() => onToggleBlock(user)}
                    disabled={refreshing === user.id}
                  >
                    {refreshing === user.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : user.isActive ? (
                      <ShieldOff className="h-3.5 w-3.5" />
                    ) : (
                      <ShieldCheck className="h-3.5 w-3.5" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50" title="Delete" onClick={() => onDelete(user)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editUser, setEditUser] = useState<AdminUser | null>(null);
  const [deleteUser, setDeleteUser] = useState<AdminUser | null>(null);
  const [blockingId, setBlockingId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useGetUsers(
    {},
    { query: { queryKey: getGetUsersQueryKey() } }
  );

  const refresh = () => queryClient.invalidateQueries({ queryKey: getGetUsersQueryKey() });

  const handleToggleBlock = async (user: AdminUser) => {
    setBlockingId(user.id);
    try {
      await adminFetch(`/users/${user.id}/block`, "PATCH");
      toast({
        title: user.isActive ? "User blocked" : "User unblocked",
        description: `${user.name} has been ${user.isActive ? "blocked" : "unblocked"}.`,
      });
      refresh();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setBlockingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const filter = (u: AdminUser) =>
    !searchTerm ||
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.phone || "").includes(searchTerm);

  const freelancers = (users || []).filter((u) => u.role === "USER" && filter(u as AdminUser)) as AdminUser[];
  const clients = (users || []).filter((u) => u.role === "CLIENT" && filter(u as AdminUser)) as AdminUser[];
  const admins = (users || []).filter((u) => u.role === "ADMIN" && filter(u as AdminUser)) as AdminUser[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage all registered users — edit profiles, block/unblock accounts, or delete them.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email or phone..."
          className="pl-10 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users" className="gap-2">
            <UsersIcon className="h-4 w-4" />
            Freelancers ({freelancers.length})
          </TabsTrigger>
          <TabsTrigger value="clients" className="gap-2">
            <Building2 className="h-4 w-4" />
            Clients ({clients.length})
          </TabsTrigger>
          <TabsTrigger value="admins" className="gap-2">
            Admins ({admins.length})
          </TabsTrigger>
        </TabsList>

        {/* Freelancers */}
        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader className="bg-emerald-50 border-b pb-4">
              <CardTitle className="text-base font-medium flex items-center gap-2 text-emerald-800">
                <UsersIcon className="h-5 w-5" /> Freelancer Accounts ({freelancers.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <UserTable
                users={freelancers}
                onEdit={setEditUser}
                onDelete={setDeleteUser}
                onToggleBlock={handleToggleBlock}
                refreshing={blockingId}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clients */}
        <TabsContent value="clients" className="mt-4">
          <Card>
            <CardHeader className="bg-blue-50 border-b pb-4">
              <CardTitle className="text-base font-medium flex items-center gap-2 text-blue-800">
                <Building2 className="h-5 w-5" /> Client Accounts ({clients.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <UserTable
                users={clients}
                onEdit={setEditUser}
                onDelete={setDeleteUser}
                onToggleBlock={handleToggleBlock}
                refreshing={blockingId}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admins */}
        <TabsContent value="admins" className="mt-4">
          <Card>
            <CardHeader className="bg-purple-50 border-b pb-4">
              <CardTitle className="text-base font-medium flex items-center gap-2 text-purple-800">
                Admin Accounts ({admins.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <UserTable
                users={admins}
                onEdit={setEditUser}
                onDelete={setDeleteUser}
                onToggleBlock={handleToggleBlock}
                refreshing={blockingId}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <EditUserDialog
        user={editUser}
        open={!!editUser}
        onOpenChange={(o) => !o && setEditUser(null)}
        onSaved={refresh}
      />
      <DeleteConfirmDialog
        user={deleteUser}
        open={!!deleteUser}
        onOpenChange={(o) => !o && setDeleteUser(null)}
        onDeleted={refresh}
      />
    </div>
  );
}
