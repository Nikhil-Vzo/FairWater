import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Sun, TrendingUp, Clock, DollarSign, Activity } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface HourlyForecast {
  hour: string;
  predictedDemandMLD: number;
  solarAvailabilityKW: number;
  gridTariffRate: string;
}

interface PumpSchedule {
  pumpId: string;
  status: string;
  targetZone: string;
  flowRate: string;
  estimatedCostSavedToday: string;
}

interface DemandData {
  forecastSummary: {
    totalPredictedDemandMLD: number;
    peakHour: string;
    recommendedSolarUsagePercent: number;
    estimatedDailyEnergySavings: string;
  };
  hourlyForecast: HourlyForecast[];
  pumpSchedules: PumpSchedule[];
}

export const DemandForecastPanel: React.FC = () => {
  const [data, setData] = useState<DemandData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/demand-forecast")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load demand forecast:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-4 text-sm text-slate-500 animate-pulse">Loading AI Demand Forecast & Pump Optimization...</div>;
  }

  if (!data) return null;

  return (
    <Card className="border-cyan-100 shadow-sm bg-gradient-to-br from-white to-slate-50/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-600" />
              AI Water Demand Forecast & Solar-Pump Scheduler
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 mt-1">
              Real-time 24-hour predictive ML model synchronizing pumping schedules with solar peak production and off-peak grid tariffs.
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">
            AI Optimizing
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs">
            <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-cyan-500" /> 24h Total Demand
            </div>
            <div className="text-lg font-bold text-slate-800 mt-1">{data.forecastSummary.totalPredictedDemandMLD} MLD</div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs">
            <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-amber-500" /> Peak Surge Hour
            </div>
            <div className="text-lg font-bold text-slate-800 mt-1">{data.forecastSummary.peakHour} IST</div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs">
            <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
              <Sun className="h-3.5 w-3.5 text-amber-500" /> Solar Pumping Ratio
            </div>
            <div className="text-lg font-bold text-emerald-600 mt-1">{data.forecastSummary.recommendedSolarUsagePercent}%</div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs">
            <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
              <DollarSign className="h-3.5 w-3.5 text-emerald-500" /> Est. Daily Savings
            </div>
            <div className="text-lg font-bold text-emerald-600 mt-1">{data.forecastSummary.estimatedDailyEnergySavings}</div>
          </div>
        </div>

        {/* Demand vs Solar Chart */}
        <div className="h-52 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.hourlyForecast} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="predictedDemandMLD" name="Demand (MLD)" stroke="#0284c7" fill="#e0f2fe" strokeWidth={2} />
              <Area type="monotone" dataKey="solarAvailabilityKW" name="Solar Gen (kW)" stroke="#f59e0b" fill="#fef3c7" strokeWidth={1.5} opacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pump Schedules */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-cyan-600" /> Autonomous Pump Dispatch & Cost Optimization
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {data.pumpSchedules.map((pump) => (
              <div key={pump.pumpId} className="bg-white p-3 rounded-lg border border-slate-200/80 flex justify-between items-center text-xs">
                <div>
                  <span className="font-semibold text-slate-800">{pump.pumpId}</span>
                  <span className="text-slate-400 ml-2">({pump.targetZone})</span>
                  <p className="text-slate-500 text-[11px] mt-0.5">{pump.status}</p>
                </div>
                <div className="text-right">
                  <div className="font-mono font-medium text-slate-700">{pump.flowRate}</div>
                  <div className="text-emerald-600 font-semibold text-[11px]">Saved {pump.estimatedCostSavedToday}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
