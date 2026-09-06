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
import {
  Activity,
  BarChart3,
  Radio,
  AlertTriangle,
  MapPin,
  TrendingUp,
  Truck,
  Layers,
  Sparkles,
} from "lucide-react";

const fetchZoneStatus = async (): Promise<ZoneStatusResponse> => {
  const res = await fetch("/api/zonestatus");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export default function Dashboard() {
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "ai" | "iot" | "alerts">("overview");

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
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans flex flex-col">
      <Header />

      {/* Main Admin Content Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* Dashboard Top Navigation Tabs & Status Bar */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">

          {/* Segmented Control Tabs for Admin Panel */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200/80 w-full md:w-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "overview"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Overview & Live Map</span>
            </button>

            <button
              onClick={() => setActiveTab("ai")}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "ai"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <TrendingUp className="w-4 h-4 text-cyan-600" />
              <span>AI Risk & Demand</span>
            </button>

            <button
              onClick={() => setActiveTab("iot")}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "iot"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <Radio className="w-4 h-4 text-teal-600" />
              <span>IoT & Tanker Dispatch</span>
            </button>

            <button
              onClick={() => setActiveTab("alerts")}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "alerts"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Alerts & Pumps ({data?.alerts?.length || 0})</span>
            </button>
          </div>

          {/* Quick System Badge */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Optimization Active</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
              8 Municipal Zones
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {isError && (
          <div className="bg-rose-50 border border-rose-200 p-8 rounded-2xl text-center space-y-2">
            <h2 className="text-lg font-bold text-rose-800">Telemetry Connection Offline</h2>
            <p className="text-xs text-rose-600">Failed to connect to municipal telemetry socket server.</p>
          </div>
        )}

        {/* TAB 1: OVERVIEW & LIVE MAP */}
        {!isError && activeTab === "overview" && (
          <div className="space-y-6">
            {/* Responsive Grid: Zones on Left/Top, Map in Middle, Alerts on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

              {/* Left Column: Distribution Zones */}
              <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    Municipal Supply Zones
                  </h2>
                  <span className="text-[11px] font-semibold text-slate-500">Live Grid Status</span>
                </div>

                {isLoading ? (
                  <Skeleton className="h-72 w-full rounded-xl" />
                ) : (
                  <ZoneStatsCards
                    zones={data.zones}
                    onZoneSelect={handleZoneSelect}
                    selectedZoneId={selectedZoneId}
                  />
                )}
              </div>

              {/* Center Column: Live Map Card */}
              <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    Interactive Pipeline & Pressure Map
                  </h2>
                  <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Streaming Telemetry
                  </span>
                </div>

                <div className="min-h-[420px] rounded-xl overflow-hidden border border-slate-200">
                  {isLoading ? (
                    <Skeleton className="h-[420px] w-full" />
                  ) : (
                    <MapCard
                      zones={data.zones}
                      onZoneSelect={handleZoneSelect}
                      selectedZoneId={selectedZoneId}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Zone Detail Modal/Section if selected */}
            {selectedZone ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-6">
                  <ZoneDetail zone={selectedZone} />
                </div>
                <div className="lg:col-span-6">
                  <HistoryChart selectedZone={selectedZone} />
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 border-dashed rounded-2xl p-6 text-center text-xs font-semibold text-slate-500">
                Click any zone card or map marker above to analyze historical pressure & flow metrics
              </div>
            )}
          </div>
        )}

        {/* TAB 2: AI RISK & DEMAND FORECAST */}
        {!isError && activeTab === "ai" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RiskAnalyticsPanel />
            <DemandForecastPanel />
          </div>
        )}

        {/* TAB 3: IOT & TANKER DISPATCH */}
        {!isError && activeTab === "iot" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IotTelemetryPanel />
            <TankerDispatchPanel />
          </div>
        )}

        {/* TAB 4: ALERTS & PUMPING SCHEDULE */}
        {!isError && activeTab === "alerts" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-6">
              {isLoading ? (
                <Skeleton className="h-80 w-full rounded-2xl" />
              ) : (
                <AlertsPanel alerts={data.alerts} />
              )}
            </div>
            <div className="lg:col-span-6 space-y-6">
              <OptimizationPanel />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
