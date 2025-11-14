import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Zone } from "@shared/api";
import { BarChart, Droplet, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

interface ZoneStatsCardsProps {
  zones: Zone[];
  onZoneSelect: (zoneId: string) => void;
  selectedZoneId: string | null;
}

export function ZoneStatsCards({
  zones,
  onZoneSelect,
  selectedZoneId,
}: ZoneStatsCardsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Zone Status</CardTitle>
        <CardDescription>Live metrics from all 10 zones</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 pr-4">
          <div className="grid grid-cols-1 gap-4">
            {zones.map((zone) => (
              <div
                key={zone.id}
                // --- Add click handler and conditional styling ---
                onClick={() => onZoneSelect(zone.id)}
                className={cn(
                  "flex items-center gap-4 rounded-lg border p-3.5 transition-all hover:bg-accent",
                  selectedZoneId === zone.id
                    ? "border-primary bg-accent"
                    : "border-transparent",
                  "cursor-pointer" // Make it look clickable
                )}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: zone.color }}
                >
                  <BarChart className="h-5 w-5" />
                </div>
                <div className="grid flex-1 gap-1">
                  <div className="font-semibold">{zone.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {zone.area}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-sm font-semibold">
                    <Gauge className="h-3.5 w-3.5" />
                    {zone.pressure.toFixed(1)} bar
                  </div>
                  <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                    <Droplet className="h-3 w-3" />
                    {zone.flow} L/min
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}