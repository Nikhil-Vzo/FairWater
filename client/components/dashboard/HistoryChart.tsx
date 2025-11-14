import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
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
  const chartData = data?.map((item) => ({
    ...item,
    // Format timestamp to a readable time
    time: new Date(item.created_at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  }));

  const chartConfig = {
    pressure: {
      label: "Pressure (bar)",
      color: "#3b82f6", // blue
    },
    flow: {
      label: "Flow (L/min)",
      color: "#10b981", // green
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Zone History</CardTitle>
        <CardDescription>
          {selectedZone
            ? `Historical Pressure & Flow for ${selectedZone.name}`
            : "Select a zone from the map or list to see its history."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          {/* Loading Skeleton */}
          {isLoading && <Skeleton className="h-full w-full" />}

          {/* Error Message */}
          {isError && !isLoading && (
            <div className="flex h-full w-full items-center justify-center text-destructive">
              Error loading chart data.
            </div>
          )}

          {/* Empty State */}
          {!selectedZone && !isLoading && (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              No zone selected.
            </div>
          )}

          {/* Chart */}
          {selectedZone && !isLoading && !isError && chartData && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" fontSize={12} tickLine={false} />

                {/* Left Y-Axis (Pressure) */}
                <YAxis
                  yAxisId="left"
                  dataKey="pressure"
                  stroke={chartConfig.pressure.color}
                  fontSize={12}
                  tickLine={false}
                  domain={["dataMin - 0.5", "dataMax + 0.5"]}
                />

                {/* Right Y-Axis (Flow) */}
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  dataKey="flow"
                  stroke={chartConfig.flow.color}
                  fontSize={12}
                  tickLine={false}
                  domain={["dataMin - 50", "dataMax + 50"]}
                />

                <Tooltip
                  content={
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          labelFormatter={(label) => `Time: ${label}`}
                        />
                      }
                    />
                  }
                />
                <Legend />

                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="pressure"
                  stroke={chartConfig.pressure.color}
                  strokeWidth={2}
                  dot={false}
                  name="Pressure (bar)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="flow"
                  stroke={chartConfig.flow.color}
                  strokeWidth={2}
                  dot={false}
                  name="Flow (L/min)"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}