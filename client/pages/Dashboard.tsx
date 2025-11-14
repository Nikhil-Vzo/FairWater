import { Header } from "@/components/Header";
import { MapCard } from "@/components/dashboard/MapCard";
import { ZoneStatsCards } from "@/components/dashboard/ZoneStatsCards";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { OptimizationPanel } from "@/components/dashboard/OptimizationPanel";
import { useQuery } from "@tanstack/react-query";
import { ZoneStatusResponse } from "@shared/api";
import { Skeleton } from "@/components/ui/skeleton";

// Function to fetch data from our new endpoint
const fetchZoneStatus = async (): Promise<ZoneStatusResponse> => {
  const res = await fetch("/api/zonestatus");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export default function Dashboard() {
  // Use react-query to fetch data and refetch every 5 seconds
  const { data, isLoading, error } = useQuery<ZoneStatusResponse, Error>({
    queryKey: ["zoneStatus"],
    queryFn: fetchZoneStatus,
    refetchInterval: 5000, // This makes it "real-time"
  });

  return (
    <div className="min-h-screen bg-blue-50">
      <Header />

      {/* Main content with top padding to account for fixed header */}
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Raipur Map + Zone Stats */}
            <div className="lg:col-span-2 space-y-6">
              {/* Raipur Map Section */}
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-3">
                  Raipur Water Distribution Map
                </h2>
                {isLoading ? (
                  <Skeleton className="w-full aspect-square rounded-2xl" />
                ) : error ? (
                  <div className="w-full aspect-square rounded-2xl bg-white flex items-center justify-center">
                    Error loading map data: {error.message}
                  </div>
                ) : (
                  <MapCard zones={data?.zones || []} />
                )}
              </div>

              {/* Zone Stats Cards */}
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-3">
                  Zone Statistics
                </h2>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-20 w-full rounded-lg" />
                    <Skeleton className="h-20 w-full rounded-lg" />
                    <Skeleton className="h-20 w-full rounded-lg" />
                  </div>
                ) : error ? (
                  <div className="h-80 rounded-lg bg-white flex items-center justify-center">
                    Error loading zone data: {error.message}
                  </div>
                ) : (
                  <ZoneStatsCards zones={data?.zones || []} />
                )}
              </div>
            </div>

            {/* Right Column - Alerts + Optimization */}
            <div className="lg:col-span-1 space-y-6">
              {/* Alerts Panel */}
              {isLoading ? (
                <Skeleton className="h-96 w-full rounded-lg" />
              ) : error ? (
                <div className="h-96 rounded-lg bg-white flex items-center justify-center">
                  Error loading alerts: {error.message}
                </div>
              ) : (
                <AlertsPanel alerts={data?.alerts || []} />
              )}

              {/* Optimization Panel */}
              <OptimizationPanel />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}