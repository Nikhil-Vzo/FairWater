import { RequestHandler } from "express";

export interface ZoneRiskAnalytics {
  zoneId: string;
  zoneName: string;
  leakProbability: number; // Percentage 0 - 100
  waterQualityIndex: number; // Score 0 - 100
  purityStatus: "Optimal" | "Moderate Contamination Risk" | "Critical Impurity";
  predictedFailureDays: number;
  anomaliesDetected: string[];
  recommendedAction: string;
}

export const handleGetRiskAnalytics: RequestHandler = (_req, res) => {
  const analytics: ZoneRiskAnalytics[] = [
    {
      zoneId: "z1",
      zoneName: "Zone 1 (Telibandha)",
      leakProbability: 82,
      waterQualityIndex: 91,
      purityStatus: "Optimal",
      predictedFailureDays: 4,
      anomaliesDetected: ["Pressure anomaly spike at 03:00 AM", "Micro-vibration in main valve A1"],
      recommendedAction: "Dispatch maintenance unit to inspect main valve A1 before pressure breach.",
    },
    {
      zoneId: "z2",
      zoneName: "Zone 2 (Pandri)",
      leakProbability: 24,
      waterQualityIndex: 78,
      purityStatus: "Moderate Contamination Risk",
      predictedFailureDays: 18,
      anomaliesDetected: ["Slight decrease in residual chlorine ppm"],
      recommendedAction: "Schedule chemical dosing check at Pandri pumping station.",
    },
    {
      zoneId: "z3",
      zoneName: "Zone 3 (Shankar Nagar)",
      leakProbability: 91,
      waterQualityIndex: 64,
      purityStatus: "Critical Impurity",
      predictedFailureDays: 1,
      anomaliesDetected: ["Turbidity spike (+45%)", "Sustained pressure drop (-1.2 bar)"],
      recommendedAction: "CRITICAL: Isolate sub-pipe section B4; dispatch emergency response crew.",
    },
    {
      zoneId: "z4",
      zoneName: "Zone 4 (Tatibandh)",
      leakProbability: 15,
      waterQualityIndex: 95,
      purityStatus: "Optimal",
      predictedFailureDays: 45,
      anomaliesDetected: [],
      recommendedAction: "Normal operations. Routine check scheduled in 14 days.",
    },
  ];

  return res.json({ analytics });
};
