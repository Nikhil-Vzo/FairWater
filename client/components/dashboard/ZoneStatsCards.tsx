import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Zone } from "@shared/api";
import { BarChart, Droplet, Gauge, ArrowRight } from "lucide-react";
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
    <div className="h-full flex flex-col bg-transparent">
      <div className="p-6 pb-2">
        <h3 className="text-xl font-bold tracking-tight">Zone Status</h3>
        <p className="text-sm text-muted-foreground">Live metrics from all zones</p>
      </div>
      <ScrollArea className="flex-1 px-4 pb-4">
        <div className="grid grid-cols-1 gap-3">
          {zones.map((zone) => (
            <div
              key={zone.id}
              onClick={() => onZoneSelect(zone.id)}
              className={cn(
                "group relative flex items-center gap-4 rounded-xl border p-4 transition-all duration-300 cursor-pointer overflow-hidden",
                selectedZoneId === zone.id
                  ? "bg-primary/10 border-primary/50 shadow-lg shadow-primary/10"
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:translate-x-1"
              )}
            >
              {/* Active Indicator */}
              {selectedZoneId === zone.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
              )}

              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg transition-transform group-hover:scale-110"
                style={{ backgroundColor: zone.color }}
              >
                <BarChart className="h-6 w-6" />
              </div>

              <div className="grid flex-1 gap-0.5">
                <div className="font-bold text-base group-hover:text-primary transition-colors">
                  {zone.name}
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                  {zone.area}
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="flex items-center justify-end gap-1.5 text-sm font-bold">
                  <Gauge className="h-3.5 w-3.5 text-accent" />
                  {zone.pressure.toFixed(1)} bar
                </div>
                <div className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                  <Droplet className="h-3 w-3 text-blue-400" />
                  {zone.flow} L/min
                </div>
              </div>

              <ArrowRight className={cn(
                "w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-300",
                "group-hover:opacity-100 group-hover:translate-x-0"
              )} />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}