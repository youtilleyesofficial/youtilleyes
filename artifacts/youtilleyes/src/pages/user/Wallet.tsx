import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Wallet, ArrowDownToLine, Clock, CheckCircle2, XCircle, IndianRupee, Building2, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface WalletData {
  wallet: { balance: string; totalEarned: string; updatedAt: string };
  requests: Array<{
    id: number; amount: string; status: string; adminNote: string | null;
    bankName: string | null; accountHolder: string | null; upiId: string | null;
    createdAt: string;
  }>;
}

function StatusIcon({ status }: { status: string }) {
  if (status === "approved") return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
  if (status === "rejected") return <XCircle className="h-4 w-4 text-red-500" />;
  return <Clock className="h-4 w-4 text-amber-500" />;
}

function StatusBadge({ status }: { status: string }) {
  const cls = status === "approved" ? "bg-emerald-100 text-emerald-700 border-emerald-200"
    : status === "rejected" ? "bg-red-100 text-red-700 border-red-200"
    : "bg-amber-100 text-amber-700 border-amber-200";
  return <Badge variant="outline" className={cn("capitalize", cls)}>{status}</Badge>;
}

export default function WalletPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [data, setData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [method, setMethod] = useState<"upi" | "bank">("upi");
  const [form, setForm] = useState({
    amount: "", upiId: "", bankName: "", accountNumber: "", ifscCode: "", accountHolder: ""
  });

  const token = localStorage.getItem("youtilleyes_token");

  const fetchWallet = async () => {
    try {
      const res = await fetch("/api/wallet", { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setData(await res.json());
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchWallet(); }, []);

  const handleWithdraw = async () => {
    const amt = parseFloat(form.amount);
    if (!amt || amt <= 0) return toast({ title: "Invalid amount", variant: "destructive" });
    const balance = parseFloat(data?.wallet.balance || "0");
    if (amt > balance) return toast({ title: "Insufficient balance", variant: "destructive" });
    if (method === "upi" && !form.upiId) return toast({ title: "Enter UPI ID", variant: "destructive" });
    if (method === "bank" && (!form.bankName || !form.accountNumber || !form.ifscCode || !form.accountHolder)) {
      return toast({ title: "Fill all bank details", variant: "destructive" });
    }

    setSubmitting(true);
    try {
      const body: any = { amount: form.amount };
      if (method === "upi") body.upiId = form.upiId;
      else { body.bankName = form.bankName; body.accountNumber = form.accountNumber; body.ifscCode = form.ifscCode; body.accountHolder = form.accountHolder; }

      const res = await fetch("/api/wallet/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      toast({ title: "Withdrawal request submitted!", description: "Admin will process it shortly." });
      setForm({ amount: "", upiId: "", bankName: "", accountNumber: "", ifscCode: "", accountHolder: "" });
      fetchWallet();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setSubmitting(false);
  };

  if (loading) return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const balance = parseFloat(data?.wallet.balance || "0");
  const totalEarned = parseFloat(data?.wallet.totalEarned || "0");
  const hasPending = data?.requests.some(r => r.status === "pending");

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Wallet</h1>
        <p className="text-muted-foreground mt-1 text-sm">Manage your earnings and withdrawal requests.</p>
      </div>

      <div className="grid gap-4 grid-cols-2">
        <Card className="bg-primary text-white border-0">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-white/80">Available Balance</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="flex items-center gap-1">
              <IndianRupee className="h-5 w-5" />
              <span className="text-3xl font-bold">{balance.toLocaleString("en-IN")}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-emerald-600 text-white border-0">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-white/80">Total Earned</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="flex items-center gap-1">
              <IndianRupee className="h-5 w-5" />
              <span className="text-3xl font-bold">{totalEarned.toLocaleString("en-IN")}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowDownToLine className="h-5 w-5 text-primary" />
            Request Withdrawal
          </CardTitle>
          <CardDescription>Minimum ₹100. One request at a time allowed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {hasPending ? (
            <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <Clock className="h-5 w-5 text-amber-600 shrink-0" />
              <p className="text-sm text-amber-800 font-medium">You have a pending withdrawal request. Wait for admin to process it.</p>
            </div>
          ) : balance < 100 ? (
            <div className="flex items-center gap-3 p-4 bg-slate-50 border rounded-lg">
              <Wallet className="h-5 w-5 text-slate-400 shrink-0" />
              <p className="text-sm text-slate-600">Minimum balance of ₹100 required to withdraw.</p>
            </div>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Amount (₹)</label>
                <Input type="number" min="100" max={balance} placeholder="Enter amount" value={form.amount}
                  onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} className="max-w-xs" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Payment Method</label>
                <div className="flex gap-2">
                  <Button type="button" size="sm" variant={method === "upi" ? "default" : "outline"}
                    onClick={() => setMethod("upi")} className="gap-1.5">
                    <Smartphone className="h-4 w-4" /> UPI
                  </Button>
                  <Button type="button" size="sm" variant={method === "bank" ? "default" : "outline"}
                    onClick={() => setMethod("bank")} className="gap-1.5">
                    <Building2 className="h-4 w-4" /> Bank Transfer
                  </Button>
                </div>
              </div>
              {method === "upi" ? (
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">UPI ID</label>
                  <Input placeholder="yourname@upi" value={form.upiId}
                    onChange={e => setForm(f => ({ ...f, upiId: e.target.value }))} className="max-w-xs" />
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Account Holder</label>
                    <Input placeholder="Full name" value={form.accountHolder}
                      onChange={e => setForm(f => ({ ...f, accountHolder: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Bank Name</label>
                    <Input placeholder="e.g. SBI, HDFC" value={form.bankName}
                      onChange={e => setForm(f => ({ ...f, bankName: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Account Number</label>
                    <Input placeholder="Account number" value={form.accountNumber}
                      onChange={e => setForm(f => ({ ...f, accountNumber: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">IFSC Code</label>
                    <Input placeholder="e.g. SBIN0001234" value={form.ifscCode}
                      onChange={e => setForm(f => ({ ...f, ifscCode: e.target.value }))} />
                  </div>
                </div>
              )}
              <Button onClick={handleWithdraw} disabled={submitting} className="gap-2">
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Submit Withdrawal Request
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Withdrawal History</CardTitle>
        </CardHeader>
        <CardContent>
          {!data?.requests.length ? (
            <p className="text-sm text-muted-foreground text-center py-6">No withdrawal requests yet.</p>
          ) : (
            <div className="space-y-3">
              {data.requests.map(r => (
                <div key={r.id} className="flex items-start justify-between border-b last:border-0 pb-3 last:pb-0">
                  <div className="flex items-start gap-3">
                    <StatusIcon status={r.status} />
                    <div>
                      <div className="font-semibold text-sm">₹{Number(r.amount).toLocaleString("en-IN")}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {r.upiId ? `UPI: ${r.upiId}` : r.accountHolder ? `Bank: ${r.accountHolder}` : ""}
                      </div>
                      {r.adminNote && <div className="text-xs text-slate-600 mt-1 italic">Note: {r.adminNote}</div>}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StatusBadge status={r.status} />
                    <span className="text-[10px] text-muted-foreground">{new Date(r.createdAt).toLocaleDateString("en-IN")}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
