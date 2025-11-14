import { AlertCircle, MapPin, Wrench, BarChart } from "lucide-react";
import { Alert } from "@shared/api"; // Import our shared type

interface AlertsPanelProps {
  alerts: Alert[]; // Accept alerts as a prop
}

// Helper to map icon names from our API to real components
const ICONS: Record<Alert["icon"], React.ReactNode> = {
  AlertCircle: <AlertCircle className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />,
  Wrench: <AlertCircle className="w-5 h-5" />, // Using AlertCircle as Wrench is not in lucide-react by default, simplified
  BarChart: <AlertCircle className="w-5 h-5" />, // Using AlertCircle as BarChart is not in lucide-react by default, simplified
};

// --- We need to import the correct icons ---
// Let's correct the ICONS map to use the ones that are actually imported
const CORRECT_ICONS: Record<Alert["icon"], React.ReactNode> = {
  AlertCircle: <AlertCircle className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />, // Corrected: Wrench is available
  BarChart: <BarChart className="w-5 h-5" />, // Corrected: BarChart is available
};

export const AlertsPanel = ({ alerts }: AlertsPanelProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Active Alerts</h2>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <div className="p-4 space-y-3">
          {alerts.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No active alerts.
            </p>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.type === "warning"
                    ? "border-red-500 bg-red-50"
                    : "border-blue-500 bg-blue-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-full ${alert.badgeColor} flex-shrink-0`}
                  >
                    {CORRECT_ICONS[alert.icon] || (
                      <AlertCircle className="w-5 h-5" />
                    )}
                  </div>
                  <p className="text-sm text-gray-700 font-medium flex-1">
                    {alert.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};