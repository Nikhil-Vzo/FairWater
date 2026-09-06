import { useState } from "react";
import { Search, CheckCircle2, Clock, UserCheck, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TicketStatus {
  ticketId: string;
  issueType: string;
  zoneId: string;
  status: string;
  progress: number;
  estimatedResolution: string;
  assignedEngineer: string;
  lastUpdated: string;
  verificationBadge: string;
}

export function ReportTracker() {
  const [ticketId, setTicketId] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<TicketStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketId.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/report/status/${encodeURIComponent(ticketId.trim())}`);
      if (!res.ok) throw new Error("Failed to fetch ticket status");
      const data = await res.json();
      setStatus(data);
    } catch (err: any) {
      setError(err.message || "Failed to find ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-panel border-white/10 shadow-xl overflow-hidden">
      <CardHeader className="bg-white/5 pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
          <Search className="w-5 h-5 text-accent" />
          Track Complaint Status
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <form onSubmit={handleTrack} className="flex gap-2">
          <Input
            placeholder="Enter Ticket ID (e.g., FW-1001)"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus:ring-accent"
          />
          <Button type="submit" variant="gradient" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Track"}
          </Button>
        </form>

        <div className="flex gap-2 text-xs text-muted-foreground">
          <span>Try sample tickets:</span>
          <button
            type="button"
            onClick={() => setTicketId("FW-1001")}
            className="text-accent underline hover:text-accent/80"
          >
            FW-1001
          </button>
          <span>or</span>
          <button
            type="button"
            onClick={() => setTicketId("FW-1002")}
            className="text-accent underline hover:text-accent/80"
          >
            FW-1002
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {status && (
          <div className="space-y-4 pt-2 border-t border-white/10 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  Ticket #{status.ticketId}
                </span>
                <h4 className="text-lg font-bold text-foreground">{status.issueType}</h4>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-accent border border-accent/30">
                {status.status}
              </span>
            </div>

            {/* Verification Badge */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{status.verificationBadge}</span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Resolution Progress</span>
                <span className="font-semibold text-foreground">{status.progress}%</span>
              </div>
              <Progress value={status.progress} className="h-2 bg-white/10" />
            </div>

            {/* Meta details */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-lg bg-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  <span>Est. Resolution</span>
                </div>
                <p className="font-semibold text-foreground">{status.estimatedResolution}</p>
              </div>

              <div className="p-3 rounded-lg bg-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <UserCheck className="w-3.5 h-3.5 text-accent" />
                  <span>Assigned Field Lead</span>
                </div>
                <p className="font-semibold text-foreground truncate">{status.assignedEngineer}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
