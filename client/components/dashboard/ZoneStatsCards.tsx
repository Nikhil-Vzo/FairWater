import { Droplets } from "lucide-react";
import { Zone } from "@shared/api"; // Import our shared type

interface ZoneStatsCardsProps {
  zones: Zone[]; // Accept zones as a prop
}

export const ZoneStatsCards = ({ zones }: ZoneStatsCardsProps) => {
  return (
    <div className="h-80 overflow-y-auto">
      <div className="space-y-2 pr-2">
        {zones.map((stat) => {
          // Determine status based on pressure
          let statusBg = "bg-green-500";
          let statusColor = "bg-green-100 text-green-800";
          if (stat.pressure < 1.8) {
            statusBg = "bg-red-500";
            statusColor = "bg-red-100 text-red-800";
          } else if (stat.pressure < 2.4) {
            statusBg = "bg-orange-500";
            statusColor = "bg-orange-100 text-orange-800";
          } else if (stat.pressure < 2.8) {
            statusBg = "bg-yellow-400";
            statusColor = "bg-yellow-100 text-yellow-800";
          }

          return (
            <div
              key={stat.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                  style={{ backgroundColor: stat.color }}
                >
                  {stat.zone}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">
                    {stat.area}
                  </p>
                  <div className="flex gap-4 text-xs text-gray-600 mt-0.5">
                    <span>
                      P:{" "}
                      <span className="font-medium text-gray-900">
                        {stat.pressure}
                      </span>
                    </span>
                    <span>
                      F:{" "}
                      <span className="font-medium text-gray-900">
                        {stat.flow}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0`}
                style={{ backgroundColor: stat.color }}
              >
                <Droplets className="w-4 h-4 text-white" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};