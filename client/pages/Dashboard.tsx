import { Header } from "@/components/Header";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { MapCard } from "@/components/dashboard/MapCard";
import { OptimizationPanel } from "@/components/dashboard/OptimizationPanel";
import { ZoneStatsCards } from "@/components/dashboard/ZoneStatsCards";
import { HistoryChart } from "@/components/dashboard/HistoryChart";
import { ZoneDetail } from "@/components/dashboard/ZoneDetail";
import { RiskAnalyticsPanel } from "@/components/dashboard/RiskAnalyticsPanel";
import { Skeleton } from "@/components/ui/skeleton";
import { ZoneStatusResponse } from "@shared/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LayoutDashboard, Activity, Settings, Bell } from "lucide-react";

// --- API Fetching Function ---
const fetchZoneStatus = async (): Promise<ZoneStatusResponse> => {
  const res = await fetch("/api/zonestatus");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export default function Dashboard() {
  // --- State for selected zone ---
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);

  const zoneStatusQuery = useQuery({
    queryKey: ["zoneStatus"],
    queryFn: fetchZoneStatus,
    refetchInterval: 5000, // Keep polling
  });

  const { data, isLoading, isError } = zoneStatusQuery;

  // --- Find the selected zone object ---
  const selectedZone =
    data?.zones.find((z) => z.id === selectedZoneId) ?? null;

  // --- Handle zone selection ---
  const handleZoneSelect = (zoneId: string) => {
    setSelectedZoneId(zoneId);
  };

  return (
    <div className="flex min-h-screen w-full bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
      </div>

      {/* Sidebar (Visual Only for now) */}
      <aside className="hidden lg:flex w-20 flex-col items-center py-8 gap-8 border-r border-white/10 bg-white/5 backdrop-blur-md z-20">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
          <LayoutDashboard className="text-white w-6 h-6" />
        </div>
        <nav className="flex flex-col gap-6 w-full items-center">
          <button className="p-3 rounded-xl bg-white/10 text-primary transition-all hover:bg-white/20">
            <Activity className="w-6 h-6" />
          </button>
          <button className="p-3 rounded-xl text-muted-foreground hover:text-primary hover:bg-white/10 transition-all">
            <Bell className="w-6 h-6" />
          </button>
          <button className="p-3 rounded-xl text-muted-foreground hover:text-primary hover:bg-white/10 transition-all">
            <Settings className="w-6 h-6" />
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-4 lg:p-8 h-screen overflow-hidden flex flex-col relative z-10">
        <Header />

        <div className="flex-1 mt-6 overflow-hidden">
          {isError && (
            <div className="flex h-full items-center justify-center">
              <div className="glass-panel p-8 rounded-2xl text-center space-y-4 border-destructive/20">
                <h2 className="text-2xl font-bold text-destructive">Connection Error</h2>
                <p className="text-muted-foreground">Failed to fetch real-time data.</p>
              </div>
            </div>
          )}

          {!isError && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
              {/* Left Column: Stats & List */}
              <div className="lg:col-span-3 flex flex-col gap-6 h-full overflow-hidden">
                <div className="glass-panel rounded-2xl p-1 flex-1 overflow-hidden flex flex-col">
                  {isLoading ? (
                    <Skeleton className="h-full w-full rounded-xl" />
                  ) : (
                    <ZoneStatsCards
                      zones={data.zones}
                      onZoneSelect={handleZoneSelect}
                      selectedZoneId={selectedZoneId}
                    />
                  )}
                </div>
              </div>

              {/* Middle Column: Map & Analytics */}
              <div className="lg:col-span-6 flex flex-col gap-6 h-full overflow-y-auto pr-2 pb-20 scrollbar-hide">
                <div className="glass-panel rounded-2xl p-1 min-h-[400px]">
                  {isLoading ? (
                    <Skeleton className="h-full w-full rounded-xl" />
                  ) : (
                    <MapCard
                      zones={data.zones}
                      onZoneSelect={handleZoneSelect}
                      selectedZoneId={selectedZoneId}
                    />
                  )}
                </div>

                <RiskAnalyticsPanel />

                {selectedZone ? (
                  <div className="space-y-6 animate-fade-in">
                    <ZoneDetail zone={selectedZone} />
                    <HistoryChart selectedZone={selectedZone} />
                  </div>
                ) : (
                  <div className="glass-panel rounded-2xl p-8 text-center text-muted-foreground border-dashed">
                    Select a zone to view detailed analytics
                  </div>
                )}
              </div>

              {/* Right Column: Alerts & Control */}
              <div className="lg:col-span-3 flex flex-col gap-6 h-full overflow-y-auto pb-20 scrollbar-hide">
                {isLoading ? (
                  <Skeleton className="h-[300px] w-full rounded-2xl" />
                ) : (
                  <AlertsPanel alerts={data.alerts} />
                )}
                <OptimizationPanel />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}