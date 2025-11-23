import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Zone, ZoneHistoryResponse } from "@shared/api";
import { Skeleton } from "../ui/skeleton";

interface HistoryChartProps {
  selectedZone: Zone | null;
}

// --- API Fetching Function ---
const fetchZoneHistory = async (
  zoneId: string
): Promise<ZoneHistoryResponse> => {
  const res = await fetch(`/api/zonehistory?zoneId=${zoneId}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

// --- Chart Component ---
export function HistoryChart({ selectedZone }: HistoryChartProps) {
  const zoneId = selectedZone?.id ?? null;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["zoneHistory", zoneId],
    queryFn: () => fetchZoneHistory(zoneId!),
    enabled: !!zoneId, // Only run the query if a zone is selected
    refetchOnWindowFocus: false,
  });

  // Format data for the chart
  const chartData =
    data?.map((item) => ({
      ...item,
      // Format timestamp to a readable time
      time: new Date(item.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    })) ?? []; // Default to empty array

  return (
    <div className="glass-panel rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold tracking-tight">Historical Analytics</h3>
        <p className="text-sm text-muted-foreground">
          {selectedZone
            ? `Real - time pressure & flow data for ${selectedZone.name}`
            : "Select a zone to view history"}
        </p>
      </div>

      <div className="h-[300px] w-full">
        {isLoading ? (
          <Skeleton className="h-full w-full rounded-xl" />
        ) : isError ? (
          <div className="flex h-full w-full items-center justify-center text-destructive">
            Error loading chart data.
          </div>
        ) : !selectedZone ? (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground border-2 border-dashed border-white/10 rounded-xl">
            No zone selected
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPressure" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="time"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                yAxisId="left"
                dataKey="pressure"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                stroke="hsl(var(--primary))"
                domain={["dataMin - 0.5", "dataMax + 0.5"]}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                dataKey="flow"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                stroke="hsl(var(--accent))"
                domain={["dataMin - 50", "dataMax + 50"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="pressure"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorPressure)"
                name="Pressure (bar)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="flow"
                stroke="hsl(var(--accent))"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorFlow)"
                name="Flow (L/min)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}