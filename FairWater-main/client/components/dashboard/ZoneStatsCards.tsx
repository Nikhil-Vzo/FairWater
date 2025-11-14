import { Droplets } from "lucide-react";

interface ZoneStat {
  id: string;
  zone: string;
  area: string;
  pressure: number;
  flow: number;
  color: string;
}

const ZONE_STATS: ZoneStat[] = [
  {
    id: "z1",
    zone: "Z1",
    area: "Civil Lines / Telibandha",
    pressure: 3.2,
    flow: 850,
    color: "#22c55e",
  },
  {
    id: "z2",
    zone: "Z2",
    area: "Pandri / Shankar Nagar",
    pressure: 2.8,
    flow: 720,
    color: "#eab308",
  },
  {
    id: "z3",
    zone: "Z3",
    area: "Mowa / Tatibandh (Tail-End)",
    pressure: 1.5,
    flow: 420,
    color: "#ef4444",
  },
  {
    id: "z4",
    zone: "Z4",
    area: "Gondra / Devendra Nagar",
    pressure: 3.0,
    flow: 800,
    color: "#06b6d4",
  },
  {
    id: "z5",
    zone: "Z5",
    area: "Ramnagar / Kupri Road",
    pressure: 2.6,
    flow: 680,
    color: "#8b5cf6",
  },
  {
    id: "z6",
    zone: "Z6",
    area: "Jai Stambh Chowk",
    pressure: 3.1,
    flow: 820,
    color: "#ec4899",
  },
  {
    id: "z7",
    zone: "Z7",
    area: "Lisner / Tekari",
    pressure: 2.4,
    flow: 620,
    color: "#f59e0b",
  },
  {
    id: "z8",
    zone: "Z8",
    area: "Kota / Khond Road",
    pressure: 1.8,
    flow: 480,
    color: "#10b981",
  },
  {
    id: "z9",
    zone: "Z9",
    area: "Risali / Durga Tekdi",
    pressure: 2.2,
    flow: 580,
    color: "#6366f1",
  },
  {
    id: "z10",
    zone: "Z10",
    area: "New Raipur / IT Park",
    pressure: 2.0,
    flow: 520,
    color: "#f87171",
  },
];

export const ZoneStatsCards = () => {
  return (
    <div className="h-80 overflow-y-auto">
      <div className="space-y-2 pr-2">
        {ZONE_STATS.map((stat) => {
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
