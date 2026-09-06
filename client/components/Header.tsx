import { Link } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3.5 px-4 sm:px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              FairWater Admin Command Center
            </h1>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Raipur Water Infrastructure & Distribution Monitoring
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-all text-xs font-semibold flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Citizen Portal</span>
          </Link>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700">Live Telemetry</span>
          </div>
        </div>
      </div>
    </header>
  );
};
