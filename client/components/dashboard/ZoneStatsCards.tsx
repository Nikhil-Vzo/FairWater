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
      <ScrollArea className="max-h-[460px] pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
          {zones.map((zone) => (
            <div
              key={zone.id}
              onClick={() => onZoneSelect(zone.id)}
              className={cn(
                "group relative flex items-center gap-3.5 rounded-xl border p-3.5 transition-all duration-200 cursor-pointer",
                selectedZoneId === zone.id
                  ? "bg-blue-50/80 border-blue-400 shadow-xs"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
              )}
            >
              {/* Active Indicator Bar */}
              {selectedZoneId === zone.id && (
                <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-blue-600" />
              )}

              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white font-bold text-xs shadow-2xs"
                style={{ backgroundColor: zone.color }}
              >
                <BarChart className="h-5 w-5" />
              </div>

              <div className="grid flex-1 min-w-0">
                <div className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                  {zone.name}
                </div>
                <div className="text-[11px] text-slate-500 font-medium truncate">
                  {zone.area}
                </div>
              </div>

              <div className="text-right space-y-0.5 shrink-0">
                <div className="flex items-center justify-end gap-1 text-xs font-bold text-slate-900">
                  <Gauge className="h-3 w-3 text-cyan-600" />
                  {zone.pressure.toFixed(1)} bar
                </div>
                <div className="flex items-center justify-end gap-1 text-[11px] font-semibold text-slate-500">
                  <Droplet className="h-3 w-3 text-blue-500" />
                  {zone.flow} L/min
                </div>
              </div>

              <ArrowRight className={cn(
                "w-3.5 h-3.5 text-slate-400 transition-all shrink-0 hidden sm:block",
                selectedZoneId === zone.id ? "text-blue-600 translate-x-0" : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
              )} />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
