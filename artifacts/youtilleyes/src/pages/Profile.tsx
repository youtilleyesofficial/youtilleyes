import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLogout, useGetUserDashboard, getGetUserDashboardQueryKey, useGetClientDashboard, getGetClientDashboardQueryKey } from "@workspace/api-client-react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Camera, CheckCircle2, Star, LogOut, Edit3, Save, X,
  Mail, Phone, Briefcase, Shield, User, Award, Clock,
  FileText, TrendingUp, ArrowLeft, Wallet, IndianRupee
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { getGetMeQueryKey } from "@workspace/api-client-react";

const getAvatarKey = (userId: number) => `youtilleyes_avatar_${userId}`;

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-4 w-4",
            star <= Math.floor(value) ? "fill-yellow-400 text-yellow-400" :
            star - 0.5 <= value ? "fill-yellow-200 text-yellow-400" :
            "text-gray-300"
          )}
        />
      ))}
      <span className="ml-1 text-sm font-semibold text-gray-700">{value.toFixed(1)}</span>
    </div>
  );
}

export default function ProfilePage() {
  const { user, logout: clearAuth } = useAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const logoutMutation = useLogout();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [verifyRequested, setVerifyRequested] = useState(false);

  const [avatar, setAvatar] = useState<string | null>(null);
  useEffect(() => {
    if (user?.id) setAvatar(localStorage.getItem(getAvatarKey(user.id)));
  }, [user?.id]);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    skills: user?.skills || "",
  });

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, phone: user.phone || "", bio: user.bio || "", skills: user.skills || "" });
    }
  }, [user]);

  const { data: userDash } = useGetUserDashboard({
    query: { enabled: user?.role === "USER", queryKey: getGetUserDashboardQueryKey() }
  });
  const { data: clientDash } = useGetClientDashboard({
    query: { enabled: user?.role === "CLIENT", queryKey: getGetClientDashboardQueryKey() }
  });

  const [walletBalance, setWalletBalance] = useState<string>("0");
  useEffect(() => {
    if (user?.role !== "USER") return;
    const token = localStorage.getItem("youtilleyes_token");
    fetch("/api/wallet", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.wallet) setWalletBalance(d.wallet.balance); })
      .catch(() => {});
  }, [user?.role]);

  const isVerified = !!(user?.phone);
  const rating = user?.role === "USER" ? 4.7 : user?.role === "CLIENT" ? 4.3 : 5.0;
  const memberSince = user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "N/A";

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setAvatar(base64);
      if (user?.id) localStorage.setItem(getAvatarKey(user.id), base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const token = localStorage.getItem("youtilleyes_token");
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: form.name, phone: form.phone, bio: form.bio, skills: form.skills }),
      });
      if (res.ok) {
        const updated = await res.json();
        queryClient.setQueryData(getGetMeQueryKey(), updated);
        setSaveSuccess(true);
        setEditing(false);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate(undefined, { onSuccess: () => { clearAuth(); setLocation("/"); } });
  };

  const statCards = user?.role === "USER"
    ? [
        { label: "Active Bids", value: userDash?.stats?.activeBids ?? 3, icon: FileText, color: "text-blue-600 bg-blue-50" },
        { label: "Assigned Projects", value: userDash?.stats?.assignedProjects ?? 2, icon: Briefcase, color: "text-purple-600 bg-purple-50" },
        { label: "Submissions", value: userDash?.stats?.totalSubmissions ?? 1, icon: TrendingUp, color: "text-green-600 bg-green-50" },
        { label: "Rating", value: null, icon: Star, color: "text-yellow-600 bg-yellow-50", rating: rating },
      ]
    : user?.role === "CLIENT"
    ? [
        { label: "Total Projects", value: clientDash?.stats?.totalProjects ?? 5, icon: Briefcase, color: "text-blue-600 bg-blue-50" },
        { label: "Open Projects", value: clientDash?.stats?.openProjects ?? 2, icon: TrendingUp, color: "text-orange-600 bg-orange-50" },
        { label: "Total Bids Received", value: clientDash?.stats?.totalBids ?? 8, icon: FileText, color: "text-purple-600 bg-purple-50" },
        { label: "Rating", value: null, icon: Star, color: "text-yellow-600 bg-yellow-50", rating: rating },
      ]
    : [
        { label: "Total Users", value: 15, icon: User, color: "text-blue-600 bg-blue-50" },
        { label: "Total Projects", value: 20, icon: Briefcase, color: "text-purple-600 bg-purple-50" },
        { label: "Pending Reviews", value: 4, icon: FileText, color: "text-orange-600 bg-orange-50" },
        { label: "Rating", value: null, icon: Star, color: "text-yellow-600 bg-yellow-50", rating: 5.0 },
      ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="max-w-4xl mx-auto px-4 pt-8 pb-20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 px-2"
                onClick={() => setLocation(
                  user?.role === "ADMIN" ? "/admin/dashboard"
                  : user?.role === "CLIENT" ? "/client/dashboard"
                  : "/user/dashboard"
                )}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 border border-white/30"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
          <div className="text-sm text-white/60 mb-4">My Profile</div>
        </div>
      </div>

      {/* Profile Card (overlapping hero) */}
      <div className="max-w-4xl mx-auto px-4 -mt-16 pb-24 md:pb-8">
        <Card className="shadow-xl border-0 overflow-hidden">
          {/* Avatar + name section */}
          <div className="p-6 pb-0">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className="h-24 w-24 md:h-28 md:w-28 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-primary cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {avatar ? (
                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center shadow-lg hover:bg-secondary/90 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </div>

              {/* Name & role */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900 truncate">{user.name}</h1>
                  {isVerified ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      <CheckCircle2 className="h-3 w-3" /> Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                      <Shield className="h-3 w-3" /> Unverified
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span className="inline-flex items-center gap-1">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-bold",
                      user.role === "ADMIN" ? "bg-red-100 text-red-700" :
                      user.role === "CLIENT" ? "bg-blue-100 text-blue-700" :
                      "bg-purple-100 text-purple-700"
                    )}>{user.role}</span>
                  </span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Member since {memberSince}</span>
                </div>
                <div className="mt-2">
                  <StarRating value={rating} />
                </div>
              </div>

              {/* Edit button - desktop */}
              <div className="hidden md:flex gap-2 ml-auto">
                {editing ? (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setEditing(false)}>
                      <X className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave} disabled={saving} className="bg-primary">
                      <Save className="h-4 w-4 mr-1" />
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
                    <Edit3 className="h-4 w-4 mr-1" /> Edit Profile
                  </Button>
                )}
              </div>
            </div>

            {/* Save success */}
            {saveSuccess && (
              <div className="mt-3 flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                <CheckCircle2 className="h-4 w-4" /> Profile updated successfully!
              </div>
            )}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-6">
            {statCards.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center mb-2", stat.color)}>
                  <stat.icon className="h-4 w-4" />
                </div>
                {stat.rating !== undefined ? (
                  <div className="flex items-center gap-0.5">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-lg">{stat.rating.toFixed(1)}</span>
                  </div>
                ) : (
                  <span className="font-bold text-2xl text-gray-900">{stat.value}</span>
                )}
                <span className="text-xs text-gray-500 mt-0.5 text-center">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Wallet card — USER only */}
          {user.role === "USER" && (
            <div className="px-6 pb-2">
              <Link href="/user/wallet">
                <div className="flex items-center justify-between bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl px-5 py-4 cursor-pointer hover:opacity-95 transition-opacity">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 rounded-full p-2"><Wallet className="h-5 w-5" /></div>
                    <div>
                      <div className="text-xs text-white/75 font-medium">Wallet Balance</div>
                      <div className="text-2xl font-bold flex items-center gap-0.5">
                        <IndianRupee className="h-5 w-5" />{Number(walletBalance).toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-white/80 font-medium">Withdraw →</div>
                </div>
              </Link>
            </div>
          )}

          {/* Edit button - mobile */}
          <div className="flex md:hidden gap-2 px-6 pb-4">
            {editing ? (
              <>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setEditing(false)}>
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
                <Button size="sm" className="flex-1 bg-primary" onClick={handleSave} disabled={saving}>
                  <Save className="h-4 w-4 mr-1" />
                  {saving ? "Saving..." : "Save"}
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" className="w-full" onClick={() => setEditing(true)}>
                <Edit3 className="h-4 w-4 mr-1" /> Edit Profile
              </Button>
            )}
          </div>

          <div className="border-t" />

          {/* Profile Details */}
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Personal Info</h3>

                {/* Name */}
                <div>
                  <label className="text-xs text-gray-500 flex items-center gap-1 mb-1"><User className="h-3 w-3" /> Full Name</label>
                  {editing ? (
                    <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  ) : (
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs text-gray-500 flex items-center gap-1 mb-1"><Mail className="h-3 w-3" /> Email Address</label>
                  <p className="text-sm font-medium text-gray-900">{user.email}</p>
                  <span className="text-[10px] text-gray-400">Cannot be changed</span>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs text-gray-500 flex items-center gap-1 mb-1"><Phone className="h-3 w-3" /> Phone Number</label>
                  {editing ? (
                    <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 98765 43210" />
                  ) : (
                    <p className="text-sm font-medium text-gray-900">{user.phone || <span className="text-gray-400">Not set</span>}</p>
                  )}
                </div>

                {/* Verification */}
                <div className="rounded-xl border p-4 bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                        <Shield className="h-4 w-4 text-primary" />
                        Identity Verification
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {isVerified ? "Your identity is verified. Trusted by clients!" : "Add phone number to get verified and unlock more opportunities."}
                      </p>
                    </div>
                    {isVerified ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                    ) : (
                      <button
                        onClick={() => { setVerifyRequested(true); setEditing(true); }}
                        className="text-xs text-primary font-semibold border border-primary rounded-lg px-2 py-1 hover:bg-primary/5"
                      >
                        {verifyRequested ? "Saving..." : "Verify"}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Professional Info</h3>

                {/* Bio */}
                <div>
                  <label className="text-xs text-gray-500 flex items-center gap-1 mb-1"><Award className="h-3 w-3" /> Bio / About</label>
                  {editing ? (
                    <Textarea
                      value={form.bio}
                      onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                      placeholder="Tell clients about yourself..."
                      rows={4}
                    />
                  ) : (
                    <p className="text-sm text-gray-700 leading-relaxed">{user.bio || <span className="text-gray-400">No bio yet</span>}</p>
                  )}
                </div>

                {/* Skills */}
                {user.role !== "CLIENT" && (
                  <div>
                    <label className="text-xs text-gray-500 flex items-center gap-1 mb-1"><Briefcase className="h-3 w-3" /> Skills</label>
                    {editing ? (
                      <Input
                        value={form.skills}
                        onChange={e => setForm(f => ({ ...f, skills: e.target.value }))}
                        placeholder="React, Node.js, Design..."
                      />
                    ) : (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {(user.skills || "").split(",").filter(Boolean).map((skill, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            {skill.trim()}
                          </span>
                        ))}
                        {!user.skills && <span className="text-gray-400 text-sm">No skills listed</span>}
                      </div>
                    )}
                  </div>
                )}

                {/* Account Info */}
                <div className="rounded-xl border p-4 bg-gray-50 space-y-2">
                  <p className="text-sm font-semibold text-gray-900">Account Details</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">User ID</span>
                    <span className="font-mono font-medium">#{user.id.toString().padStart(4, "0")}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Account Status</span>
                    <span className="text-green-600 font-semibold">Active</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Role</span>
                    <span className="font-semibold capitalize">{user.role}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Member Since</span>
                    <span className="font-medium">{memberSince}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Logout button */}
            <div className="mt-8 pt-6 border-t flex justify-center md:justify-end">
              <Button
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50 gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Sign Out of Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
