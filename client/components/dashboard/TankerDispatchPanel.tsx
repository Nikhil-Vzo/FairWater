import React, { useState } from "react";
import { Truck, Navigation, CheckCircle, Clock, MapPin, ShieldAlert } from "lucide-react";

interface TankerUnit {
  id: string;
  vehicleNo: string;
  driver: string;
  capacityLiters: number;
  currentZone: string;
  destination: string;
  status: "In Transit" | "Dispensing" | "Idle" | "Refilling";
  etaMinutes: number;
}

const initialTankers: TankerUnit[] = [
  {
    id: "T-801",
    vehicleNo: "CG-04-WT-8821",
    driver: "Satish Kumar",
    capacityLiters: 10000,
    currentZone: "Zone 1 (Civil Lines)",
    destination: "Telibandha Colony Block B",
    status: "In Transit",
    etaMinutes: 12,
  },
  {
    id: "T-802",
    vehicleNo: "CG-04-WT-9014",
    driver: "Anil Sahu",
    capacityLiters: 12000,
    currentZone: "Zone 3 (Tatibandh)",
    destination: "Mowa Community Hospital Relief Point",
    status: "Dispensing",
    etaMinutes: 0,
  },
  {
    id: "T-803",
    vehicleNo: "CG-04-WT-4102",
    driver: "Vikram Netam",
    capacityLiters: 8000,
    currentZone: "Zone 2 (Pandri)",
    destination: "Central Reservoir Depot",
    status: "Refilling",
    etaMinutes: 25,
  },
];

export function TankerDispatchPanel() {
  const [tankers, setTankers] = useState<TankerUnit[]>(initialTankers);

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Emergency Tanker Fleet Dispatch</h3>
            <p className="text-xs text-muted-foreground">Live GPS tracking and relief allocation across municipal zones</p>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
          3 Tankers Active
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {tankers.map((t) => (
          <div
            key={t.id}
            className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-amber-500/30 transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400">{t.vehicleNo}</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  t.status === "In Transit"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                    : t.status === "Dispensing"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                    : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                }`}
              >
                {t.status}
              </span>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-200">{t.destination}</p>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-500" />
                {t.currentZone}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
              <span className="text-slate-400">Driver: {t.driver}</span>
              <span className="font-mono text-cyan-300 font-semibold">
                {t.etaMinutes > 0 ? `ETA: ${t.etaMinutes} mins` : "Arrived"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
