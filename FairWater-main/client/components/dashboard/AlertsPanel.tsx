import { AlertCircle, MapPin } from "lucide-react";

interface Alert {
  id: string;
  message: string;
  type: "warning" | "info";
  icon: React.ReactNode;
  badge: string;
  badgeColor: string;
}

const ALERTS: Alert[] = [
  {
    id: "1",
    message: "Low pressure detected in Zone 3",
    type: "warning",
    icon: <AlertCircle className="w-5 h-5" />,
    badge: "⚠️",
    badgeColor: "bg-red-100 text-red-800",
  },
  {
    id: "2",
    message: "Citizen report: Water shortage in Zone 2",
    type: "info",
    icon: <MapPin className="w-5 h-5" />,
    badge: "📍",
    badgeColor: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "3",
    message: "Pump maintenance due in Zone 1",
    type: "info",
    icon: <AlertCircle className="w-5 h-5" />,
    badge: "🔧",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "4",
    message: "High demand period approaching in Zone 3",
    type: "warning",
    icon: <AlertCircle className="w-5 h-5" />,
    badge: "📊",
    badgeColor: "bg-orange-100 text-orange-800",
  },
];

export const AlertsPanel = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Active Alerts</h2>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <div className="p-4 space-y-3">
          {ALERTS.map((alert) => (
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
                  {alert.icon}
                </div>
                <p className="text-sm text-gray-700 font-medium flex-1">
                  {alert.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
