import { Header } from "@/components/Header";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { MapCard } from "@/components/dashboard/MapCard";
import { OptimizationPanel } from "@/components/dashboard/OptimizationPanel";
import { ZoneStatsCards } from "@/components/dashboard/ZoneStatsCards";
import { HistoryChart } from "@/components/dashboard/HistoryChart";
import { Skeleton } from "@/components/ui/skeleton";
import { Zone, ZoneStatusResponse } from "@shared/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header />
      <main className="flex-1 p-4 pt-20 sm:p-6 sm:pt-20">
        {/* Error State */}
        {isError && (
          <div className="flex h-[80vh] items-center justify-center rounded-lg border border-destructive/50 bg-destructive/10 p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-destructive">
                Connection Error
              </h2>
              <p className="text-destructive/80">
                Failed to fetch real-time data from the server.
              </p>
            </div>
          </div>
        )}

        {/* KEY CHANGE:
          The grid layout is now *unconditional*.
          We use the `isLoading` flag to show Skeletons *inside* the grid cells,
          which preserves the layout and prevents resizing bugs.
        */}
        {!isError && (
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
            {/* Left Column */}
            <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
              {/* Map Card: Show Skeleton or Map */}
              {isLoading ? (
                <Skeleton className="h-[600px] w-full" />
              ) : (
                <MapCard
                  zones={data.zones}
                  onZoneSelect={handleZoneSelect}
                  selectedZoneId={selectedZoneId}
                />
              )}

              {/* Zone Stats: Show Skeleton or Stats */}
              {isLoading ? (
                <Skeleton className="h-[250px] w-full" />
              ) : (
                <ZoneStatsCards
                  zones={data.zones}
                  onZoneSelect={handleZoneSelect}
                  selectedZoneId={selectedZoneId}
                />
              )}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4 md:gap-6">
              {/* HistoryChart already handles its own internal loading/empty state 
                based on `selectedZone`, so we can render it directly.
              */}
              <HistoryChart selectedZone={selectedZone} />

              {/* Alerts Panel: Show Skeleton or Alerts */}
              {isLoading ? (
                <Skeleton className="h-[200px] w-full" />
              ) : (
                <AlertsPanel alerts={data.alerts} />
              )}

              {/* Optimization Panel is not data-dependent, so it can render directly */}
              <OptimizationPanel />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// The old DashboardSkeleton component is no longer needed
// as the skeletons are now handled inline.