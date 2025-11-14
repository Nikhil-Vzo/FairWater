import { Header } from "@/components/Header";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { MapCard } from "@/components/dashboard/MapCard";
import { OptimizationPanel } from "@/components/dashboard/OptimizationPanel";
import { ZoneStatsCards } from "@/components/dashboard/ZoneStatsCards";
import { HistoryChart } from "@/components/dashboard/HistoryChart"; // Import the new chart
import { Skeleton } from "@/components/ui/skeleton";
import { Zone, ZoneStatusResponse } from "@shared/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react"; // Import useState

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

  const isLoading = zoneStatusQuery.isLoading;
  const isError = zoneStatusQuery.isError;
  const data = zoneStatusQuery.data;

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
      {/* KEY CHANGE #1: 
        Added 'pt-20' to the main element to add padding below the fixed header.
      */}
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

        {/* Loading State */}
        {isLoading && <DashboardSkeleton />}

        {/* Loaded State */}
        {data && (
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
            {/* KEY CHANGE #2: 
              Made this column a flex container and moved ZoneStatsCards into it.
            */}
            <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
              <MapCard
                zones={data.zones}
                onZoneSelect={handleZoneSelect} // Pass handler
                selectedZoneId={selectedZoneId} // Pass selected ID
              />
              {/* ZoneStatsCards is now here, beneath the map */}
              <ZoneStatsCards
                zones={data.zones}
                onZoneSelect={handleZoneSelect} // Pass handler
                selectedZoneId={selectedZoneId} // Pass selected ID
              />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4 md:gap-6">
              {/* ZoneStatsCards was moved from here */}
              <HistoryChart selectedZone={selectedZone} />
              <AlertsPanel alerts={data.alerts} />
              <OptimizationPanel />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// --- Skeleton Component ---
const DashboardSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
    {/* KEY CHANGE #3: 
      Adjusted skeleton to match the new layout.
    */}
    <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
      <Skeleton className="h-[600px] w-full" />
      <Skeleton className="h-[250px] w-full" />
    </div>
    {/* Right Column */}
    <div className="flex flex-col gap-4 md:gap-6">
      <Skeleton className="h-[400px] w-full" />
      <Skeleton className="h-[200px] w-full" />
      <Skeleton className="h-[300px] w-full" />
    </div>
  </div>
);