import { Header } from "@/components/Header";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { MapCard } from "@/components/dashboard/MapCard";
import { OptimizationPanel } from "@/components/dashboard/OptimizationPanel";
import { ZoneStatsCards } from "@/components/dashboard/ZoneStatsCards";
import { HistoryChart } from "@/components/dashboard/HistoryChart";
import { ZoneDetail } from "@/components/dashboard/ZoneDetail";
import { RiskAnalyticsPanel } from "@/components/dashboard/RiskAnalyticsPanel";
import { TankerDispatchPanel } from "@/components/dashboard/TankerDispatchPanel";
import { DemandForecastPanel } from "@/components/dashboard/DemandForecastPanel";
import { IotTelemetryPanel } from "@/components/dashboard/IotTelemetryPanel";
import { Skeleton } from "@/components/ui/skeleton";
import { ZoneStatusResponse } from "@shared/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LayoutDashboard, Activity, Settings, Bell } from "lucide-react";

const fetchZoneStatus = async (): Promise<ZoneStatusResponse> => {
  const res = await fetch("/api/zonestatus");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export default function Dashboard() {
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);

  const zoneStatusQuery = useQuery({
    queryKey: ["zoneStatus"],
    queryFn: fetchZoneStatus,
    refetchInterval: 5000,
  });

  const { data, isLoading, isError } = zoneStatusQuery;

  const selectedZone =
    data?.zones.find((z) => z.id === selectedZoneId) ?? null;

  const handleZoneSelect = (zoneId: string) => {
    setSelectedZoneId(zoneId);
  };

  return (
    <div className="flex min-h-screen w-full bg-white text-slate-900">
      {/* Mini Sidebar */}
      <aside className="hidden lg:flex w-16 flex-col items-center py-6 gap-6 border-r border-slate-200 bg-slate-50">
        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
          <LayoutDashboard className="w-5 h-5" />
        </div>
        <nav className="flex flex-col gap-4 w-full items-center">
          <button className="p-2.5 rounded-xl bg-blue-50 text-blue-600 font-semibold border border-blue-200">
            <Activity className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-all">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-all">
            <Settings className="w-5 h-5" />
          </button>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen">
        <Header />

        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {isError && (
            <div className="flex items-center justify-center p-12">
              <div className="bg-red-50 border border-red-200 p-8 rounded-2xl text-center space-y-3 max-w-md">
                <h2 className="text-xl font-bold text-red-700">Connection Error</h2>
                <p className="text-xs text-red-600">Failed to fetch real-time zone telemetry data.</p>
              </div>
            </div>
          )}

          {!isError && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Zone Metrics */}
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <h2 className="text-sm font-bold text-slate-900 mb-3 px-1">Distribution Zones</h2>
                  {isLoading ? (
                    <Skeleton className="h-64 w-full rounded-xl" />
                  ) : (
                    <ZoneStatsCards
                      zones={data.zones}
                      onZoneSelect={handleZoneSelect}
                      selectedZoneId={selectedZoneId}
                    />
                  )}
                </div>
              </div>

              {/* Middle Column: Map & AI Forecasts */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm min-h-[380px]">
                  {isLoading ? (
                    <Skeleton className="h-[380px] w-full rounded-xl" />
                  ) : (
                    <MapCard
                      zones={data.zones}
                      onZoneSelect={handleZoneSelect}
                      selectedZoneId={selectedZoneId}
                    />
                  )}
                </div>

                <RiskAnalyticsPanel />
                <DemandForecastPanel />
                <IotTelemetryPanel />
                <TankerDispatchPanel />

                {selectedZone ? (
                  <div className="space-y-6">
                    <ZoneDetail zone={selectedZone} />
                    <HistoryChart selectedZone={selectedZone} />
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-6 text-center text-xs font-semibold text-slate-500">
                    Click any zone on the map or panel above to view detailed pressure/flow history
                  </div>
                )}
              </div>

              {/* Right Column: Live Alerts & Optimization */}
              <div className="lg:col-span-3 space-y-6">
                {isLoading ? (
                  <Skeleton className="h-[250px] w-full rounded-2xl" />
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
