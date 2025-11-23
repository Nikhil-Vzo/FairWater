import { AlertCircle, MapPin, Wrench, BarChart, Droplet, CheckCircle2 } from "lucide-react";
import { Alert } from "@shared/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface AlertsPanelProps {
  alerts: Alert[];
}

const ICONS: Record<string, React.ReactNode> = {
  AlertCircle: <AlertCircle className="w-4 h-4" />,
  MapPin: <MapPin className="w-4 h-4" />,
  Wrench: <Wrench className="w-4 h-4" />,
  BarChart: <BarChart className="w-4 h-4" />,
  Droplet: <Droplet className="w-4 h-4" />,
};

export const AlertsPanel = ({ alerts }: AlertsPanelProps) => {
  return (
    <div className="glass-panel rounded-2xl flex flex-col h-full max-h-[400px]">
      <div className="p-5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" />
            <div className="relative w-2 h-2 bg-red-500 rounded-full" />
          </div>
          <h3 className="font-bold tracking-tight">Live Alerts</h3>
        </div>
        <Badge variant="outline" className="bg-white/5 border-white/10 text-xs font-mono">
          {alerts.length} ACTIVE
        </Badge>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm">
              <CheckCircle2 className="h-10 w-10 mb-3 text-green-500/50" />
              <p>All systems operational</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`relative overflow-hidden rounded-xl border p-4 transition-all hover:translate-x-1 ${alert.type === "warning"
                    ? "bg-red-500/10 border-red-500/20 hover:bg-red-500/15"
                    : "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/15"
                  }`}
              >
                <div className="flex gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border backdrop-blur-sm ${alert.type === "warning"
                        ? "bg-red-500/20 text-red-200 border-red-500/30"
                        : "bg-blue-500/20 text-blue-200 border-blue-500/30"
                      }`}
                  >
                    {ICONS[alert.icon] || <AlertCircle className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold leading-none text-foreground">
                      {alert.message}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">
                      Just now • {alert.type === "warning" ? "High Priority" : "Info"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};