import { AlertCircle, MapPin, Wrench, BarChart, Droplet, CheckCircle2 } from "lucide-react";
import { Alert } from "@shared/api";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AlertsPanelProps {
  alerts: Alert[];
}

const ICONS: Record<string, React.ReactNode> = {
  AlertCircle: <AlertCircle className="w-4 h-4 text-rose-600" />,
  MapPin: <MapPin className="w-4 h-4 text-amber-600" />,
  Wrench: <Wrench className="w-4 h-4 text-blue-600" />,
  BarChart: <BarChart className="w-4 h-4 text-cyan-600" />,
  Droplet: <Droplet className="w-4 h-4 text-teal-600" />,
};

export const AlertsPanel = ({ alerts }: AlertsPanelProps) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs flex flex-col h-full">
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
          </div>
          <h3 className="font-bold text-sm text-slate-900 tracking-tight">Active Telemetry Alerts</h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold font-mono">
          {alerts.length} ACTIVE
        </span>
      </div>

      <ScrollArea className="flex-1 p-4 max-h-[380px]">
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500 text-xs font-semibold space-y-2">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              <p>All 8 municipal zones reporting normal pressure & flow.</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-xl border p-3.5 transition-all flex items-start gap-3 ${
                  alert.type === "warning"
                    ? "bg-rose-50/50 border-rose-200 hover:border-rose-300"
                    : "bg-blue-50/50 border-blue-200 hover:border-blue-300"
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    alert.type === "warning"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {ICONS[alert.icon] || <AlertCircle className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {alert.message}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Automated Event • {alert.type === "warning" ? "High Priority" : "Informational"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
