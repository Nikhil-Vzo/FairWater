import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, Droplet, Activity, AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";

interface RiskAnalyticsItem {
  zoneId: string;
  zoneName: string;
  leakProbability: number;
  waterQualityIndex: number;
  purityStatus: "Optimal" | "Moderate Contamination Risk" | "Critical Impurity";
  predictedFailureDays: number;
  anomaliesDetected: string[];
  recommendedAction: string;
}

export function RiskAnalyticsPanel() {
  const { data, isLoading } = useQuery<{ analytics: RiskAnalyticsItem[] }>({
    queryKey: ["riskAnalytics"],
    queryFn: async () => {
      const res = await fetch("/api/risk-analytics");
      if (!res.ok) throw new Error("Failed to fetch risk analytics");
      return res.json();
    },
    refetchInterval: 10000,
  });

  if (isLoading) {
    return (
      <Card className="glass-panel border-white/10 p-6">
        <p className="text-muted-foreground text-sm">Loading AI Risk Heatmap & Quality Analytics...</p>
      </Card>
    );
  }

  return (
    <Card className="glass-panel border-white/10 shadow-xl overflow-hidden">
      <CardHeader className="bg-white/5 pb-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            AI Water Quality & Leak Risk Heatmap
          </CardTitle>
          <span className="px-2.5 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold animate-pulse">
            Live AI Inference
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.analytics.map((item) => {
            const isHighRisk = item.leakProbability > 60 || item.purityStatus !== "Optimal";
            return (
              <div
                key={item.zoneId}
                className={`p-4 rounded-xl border transition-all ${
                  isHighRisk
                    ? "bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50"
                    : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-foreground text-base">{item.zoneName}</h4>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      item.purityStatus === "Optimal"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : item.purityStatus === "Moderate Contamination Risk"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-rose-500/20 text-rose-400"
                    }`}
                  >
                    WQI: {item.waterQualityIndex}/100
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="p-2 rounded bg-black/20">
                    <span className="text-muted-foreground block">Leak Probability</span>
                    <span className={`font-bold text-sm ${item.leakProbability > 50 ? "text-rose-400" : "text-emerald-400"}`}>
                      {item.leakProbability}%
                    </span>
                  </div>
                  <div className="p-2 rounded bg-black/20">
                    <span className="text-muted-foreground block">Predicted Issue Window</span>
                    <span className="font-bold text-sm text-foreground">
                      ~{item.predictedFailureDays} Days
                    </span>
                  </div>
                </div>

                {item.anomaliesDetected.length > 0 && (
                  <div className="mb-3 space-y-1">
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Anomalies Detected
                    </span>
                    {item.anomaliesDetected.map((anomaly, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-amber-300">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{anomaly}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2 border-t border-white/10 flex items-start gap-1.5 text-xs text-muted-foreground">
                  <ChevronRight className="w-4 h-4 shrink-0 text-accent mt-0.5" />
                  <p className="text-foreground/90 font-medium">{item.recommendedAction}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
