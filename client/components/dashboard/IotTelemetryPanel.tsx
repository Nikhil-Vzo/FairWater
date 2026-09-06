import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Radio, AlertTriangle, CheckCircle, Gauge, Activity } from "lucide-react";

interface SensorNode {
  sensorId: string;
  pipeSegment: string;
  zone: string;
  acousticVibrationDB: number;
  flowRateLps: number;
  pressureBar: number;
  anomalyScore: number;
  leakStatus: "NORMAL" | "SUSPECTED_MICRO_LEAK" | "CRITICAL_BURST";
}

interface TelemetryData {
  timestamp: string;
  totalActiveSensors: number;
  activeLeaksDetected: number;
  sensorNodes: SensorNode[];
}

export const IotTelemetryPanel: React.FC = () => {
  const [data, setData] = useState<TelemetryData | null>(null);

  useEffect(() => {
    fetch("/api/iot-telemetry")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load IoT telemetry:", err));
  }, []);

  if (!data) return null;

  return (
    <Card className="border-rose-100 shadow-sm bg-gradient-to-br from-white to-slate-50/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Radio className="h-5 w-5 text-rose-600 animate-pulse" />
              IoT Acoustic Leak Detection Telemetry
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 mt-1">
              Real-time hydroacoustic sensor vibration feeds detecting micro-fractures and underground bursts prior to surface flooding.
            </CardDescription>
          </div>
          <Badge className="bg-rose-50 text-rose-700 border-rose-200">
            {data.activeLeaksDetected} Anomalies Flagged
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.sensorNodes.map((sensor) => {
            const isBurst = sensor.leakStatus === "CRITICAL_BURST";
            const isMicro = sensor.leakStatus === "SUSPECTED_MICRO_LEAK";

            return (
              <div
                key={sensor.sensorId}
                className={`p-3.5 rounded-xl border transition-all ${
                  isBurst
                    ? "bg-rose-50/60 border-rose-200"
                    : isMicro
                    ? "bg-amber-50/60 border-amber-200"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-800">{sensor.sensorId}</span>
                    <h5 className="font-semibold text-xs text-slate-700 mt-0.5">{sensor.pipeSegment}</h5>
                    <p className="text-[11px] text-slate-500">{sensor.zone}</p>
                  </div>
                  {isBurst ? (
                    <Badge className="bg-rose-600 text-white flex items-center gap-1 text-[10px]">
                      <AlertTriangle className="h-3 w-3" /> CRITICAL BURST
                    </Badge>
                  ) : isMicro ? (
                    <Badge className="bg-amber-500 text-white flex items-center gap-1 text-[10px]">
                      <Activity className="h-3 w-3" /> MICRO LEAK
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1 text-[10px]">
                      <CheckCircle className="h-3 w-3" /> NORMAL
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-slate-100 text-center">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-medium">Acoustic dB</div>
                    <div className={`text-xs font-bold font-mono ${sensor.acousticVibrationDB > 65 ? "text-rose-600" : "text-slate-700"}`}>
                      {sensor.acousticVibrationDB} dB
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-medium">Flow Rate</div>
                    <div className="text-xs font-bold font-mono text-slate-700">{sensor.flowRateLps} L/s</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-medium">Pressure</div>
                    <div className="text-xs font-bold font-mono text-slate-700">{sensor.pressureBar} Bar</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
