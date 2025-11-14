import { Header } from "@/components/Header";
import { MapCard } from "@/components/dashboard/MapCard";
import { ZoneStatsCards } from "@/components/dashboard/ZoneStatsCards";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { OptimizationPanel } from "@/components/dashboard/OptimizationPanel";

export default function Dashboard() {
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
                <MapCard />
              </div>

              {/* Zone Stats Cards */}
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-3">
                  Zone Statistics
                </h2>
                <ZoneStatsCards />
              </div>
            </div>

            {/* Right Column - Alerts + Optimization */}
            <div className="lg:col-span-1 space-y-6">
              {/* Alerts Panel */}
              <AlertsPanel />

              {/* Optimization Panel */}
              <OptimizationPanel />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
