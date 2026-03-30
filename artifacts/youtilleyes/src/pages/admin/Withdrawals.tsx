import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, IndianRupee, CheckCircle2, XCircle, Clock, Wallet, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";

interface WithdrawalRequest {
  id: number; amount: string; status: string; adminNote: string | null;
  bankName: string | null; accountNumber: string | null; ifscCode: string | null;
  accountHolder: string | null; upiId: string | null;
  createdAt: string; updatedAt: string;
  userId: number; userName: string; userEmail: string;
}

interface WalletSummary {
  userId: number; userName: string; userEmail: string;
  balance: string; totalEarned: string; updatedAt: string;
}

function StatusBadge({ status }: { status: string }) {
  const cls = status === "approved" ? "bg-emerald-100 text-emerald-700 border-emerald-200"
    : status === "rejected" ? "bg-red-100 text-red-700 border-red-200"
    : "bg-amber-100 text-amber-700 border-amber-200";
  return <Badge variant="outline" className={cn("capitalize", cls)}>{status}</Badge>;
}

export default function AdminWithdrawals() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
  const [wallets, setWallets] = useState<WalletSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"requests" | "wallets">("requests");
  const [actionId, setActionId] = useState<number | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [processing, setProcessing] = useState(false);
  const [creditDialog, setCreditDialog] = useState(false);
  const [creditUserId, setCreditUserId] = useState("");
  const [creditAmount, setCreditAmount] = useState("");

  const token = localStorage.getItem("youtilleyes_token");

  const fetchData = async () => {
    try {
      const [reqRes, walRes] = await Promise.all([
        fetch("/api/wallet/admin/withdrawals", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/wallet/admin/all", { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      if (reqRes.ok) setRequests(await reqRes.json());
      if (walRes.ok) setWallets(await walRes.json());
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleAction = async () => {
    if (!actionId || !actionType) return;
    setProcessing(true);
    try {
      const res = await fetch(`/api/wallet/admin/withdrawals/${actionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: actionType === "approve" ? "approved" : "rejected", adminNote }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      toast({ title: `Request ${actionType === "approve" ? "approved" : "rejected"} successfully` });
      setActionId(null); setActionType(null); setAdminNote("");
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setProcessing(false);
  };

  const handleCredit = async () => {
    if (!creditUserId || !creditAmount) return;
    setProcessing(true);
    try {
      const res = await fetch("/api/wallet/admin/credit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId: parseInt(creditUserId), amount: creditAmount }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      toast({ title: "Wallet credited successfully!" });
      setCreditDialog(false); setCreditUserId(""); setCreditAmount("");
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setProcessing(false);
  };

  if (loading) return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const pending = requests.filter(r => r.status === "pending");
  const processed = requests.filter(r => r.status !== "pending");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Wallet Management</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage withdrawal requests and user wallet balances.</p>
        </div>
        <Button onClick={() => setCreditDialog(true)} className="gap-2 shrink-0">
          <Plus className="h-4 w-4" /> Credit Wallet
        </Button>
      </div>

      <div className="flex gap-2 border-b pb-0">
        {(["requests", "wallets"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={cn("px-4 py-2 text-sm font-medium border-b-2 transition-colors",
              tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            )}>
            {t === "requests" ? `Withdrawal Requests (${pending.length} pending)` : "User Wallets"}
          </button>
        ))}
      </div>

      {tab === "requests" && (
        <div className="space-y-4">
          {pending.length === 0 && processed.length === 0 && (
            <Card><CardContent className="py-12 text-center text-muted-foreground text-sm">No withdrawal requests yet.</CardContent></Card>
          )}
          {pending.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" /> Pending Requests
              </h3>
              <div className="space-y-3">
                {pending.map(r => (
                  <Card key={r.id} className="border-amber-200">
                    <CardContent className="pt-4 pb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-lg">₹{Number(r.amount).toLocaleString("en-IN")}</span>
                            <StatusBadge status={r.status} />
                          </div>
                          <div className="text-sm font-medium text-slate-700 mt-1">{r.userName}</div>
                          <div className="text-xs text-muted-foreground">{r.userEmail}</div>
                          <div className="text-xs text-slate-600 mt-1">
                            {r.upiId ? `UPI: ${r.upiId}` : `Bank: ${r.accountHolder} · ${r.bankName} · ${r.accountNumber} · IFSC: ${r.ifscCode}`}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">{new Date(r.createdAt).toLocaleString("en-IN")}</div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 gap-1.5"
                            onClick={() => { setActionId(r.id); setActionType("approve"); }}>
                            <CheckCircle2 className="h-4 w-4" /> Approve
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 gap-1.5"
                            onClick={() => { setActionId(r.id); setActionType("reject"); }}>
                            <XCircle className="h-4 w-4" /> Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {processed.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm text-slate-500 mb-3">Past Requests</h3>
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left">User</th>
                          <th className="px-4 py-3 text-left">Amount</th>
                          <th className="px-4 py-3 text-left">Method</th>
                          <th className="px-4 py-3 text-left">Status</th>
                          <th className="px-4 py-3 text-left">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {processed.map(r => (
                          <tr key={r.id} className="border-b last:border-0 hover:bg-slate-50/50">
                            <td className="px-4 py-3">
                              <div className="font-medium">{r.userName}</div>
                              <div className="text-xs text-muted-foreground">{r.userEmail}</div>
                            </td>
                            <td className="px-4 py-3 font-semibold">₹{Number(r.amount).toLocaleString("en-IN")}</td>
                            <td className="px-4 py-3 text-slate-600 text-xs">{r.upiId ? `UPI: ${r.upiId}` : `Bank: ${r.bankName}`}</td>
                            <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                            <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(r.updatedAt).toLocaleDateString("en-IN")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {tab === "wallets" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Wallet className="h-4 w-4" /> User Wallet Balances</CardTitle>
            <CardDescription className="text-xs">All registered users and their current wallet balances.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left">User</th>
                    <th className="px-4 py-3 text-right">Balance</th>
                    <th className="px-4 py-3 text-right">Total Earned</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {wallets.length === 0 && (
                    <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No wallet data yet.</td></tr>
                  )}
                  {wallets.map(w => (
                    <tr key={w.userId} className="border-b last:border-0 hover:bg-slate-50/50">
                      <td className="px-4 py-3">
                        <div className="font-medium">{w.userName}</div>
                        <div className="text-xs text-muted-foreground">{w.userEmail}</div>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-primary">₹{Number(w.balance).toLocaleString("en-IN")}</td>
                      <td className="px-4 py-3 text-right text-emerald-700 font-medium">₹{Number(w.totalEarned).toLocaleString("en-IN")}</td>
                      <td className="px-4 py-3 text-right">
                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1"
                          onClick={() => { setCreditUserId(w.userId.toString()); setCreditDialog(true); }}>
                          <Plus className="h-3 w-3" /> Credit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={!!actionId} onOpenChange={() => { setActionId(null); setActionType(null); setAdminNote(""); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{actionType === "approve" ? "Approve" : "Reject"} Withdrawal Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-sm text-muted-foreground">
              {actionType === "approve" ? "Mark this withdrawal as paid. This cannot be undone." : "Reject and refund the amount to user's wallet."}
            </p>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Note to user (optional)</label>
              <Input placeholder={actionType === "approve" ? "e.g. Paid via NEFT" : "e.g. Invalid account details"} value={adminNote} onChange={e => setAdminNote(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setActionId(null); setActionType(null); setAdminNote(""); }}>Cancel</Button>
            <Button onClick={handleAction} disabled={processing}
              className={actionType === "approve" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"}>
              {processing && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {actionType === "approve" ? "Confirm Approval" : "Confirm Rejection"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={creditDialog} onOpenChange={() => { setCreditDialog(false); setCreditUserId(""); setCreditAmount(""); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Credit User Wallet</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">User ID</label>
              <Input type="number" placeholder="Enter user ID" value={creditUserId} onChange={e => setCreditUserId(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">Amount (₹)</label>
              <Input type="number" min="1" placeholder="e.g. 5000" value={creditAmount} onChange={e => setCreditAmount(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setCreditDialog(false); setCreditUserId(""); setCreditAmount(""); }}>Cancel</Button>
            <Button onClick={handleCredit} disabled={processing} className="bg-emerald-600 hover:bg-emerald-700">
              {processing && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Credit Wallet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
