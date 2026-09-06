import { Router } from "express";

export const iotTelemetryRouter = Router();

export interface IotSensorNode {
  sensorId: string;
  pipeSegment: string;
  zone: string;
  acousticVibrationDB: number; // > 65 dB indicates structural leak noise
  flowRateLps: number;
  pressureBar: number;
  anomalyScore: number; // 0 - 100
  leakStatus: "NORMAL" | "SUSPECTED_MICRO_LEAK" | "CRITICAL_BURST";
  coordinates: { lat: number; lng: number };
}

iotTelemetryRouter.get("/", (_req, res) => {
  const sensorNodes: IotSensorNode[] = [
    {
      sensorId: "IOT-ACOUSTIC-101",
      pipeSegment: "GE Road Main Feeder Line DN400",
      zone: "Central Zone",
      acousticVibrationDB: 74.2,
      flowRateLps: 184.5,
      pressureBar: 3.2,
      anomalyScore: 88,
      leakStatus: "CRITICAL_BURST",
      coordinates: { lat: 21.2514, lng: 81.6296 }
    },
    {
      sensorId: "IOT-ACOUSTIC-102",
      pipeSegment: "Tatibandh Ring Road Sub-Feeder",
      zone: "West Zone",
      acousticVibrationDB: 58.1,
      flowRateLps: 92.1,
      pressureBar: 2.8,
      anomalyScore: 42,
      leakStatus: "SUSPECTED_MICRO_LEAK",
      coordinates: { lat: 21.248, lng: 81.588 }
    },
    {
      sensorId: "IOT-ACOUSTIC-103",
      pipeSegment: "Telibandha Lake Secondary Distribution",
      zone: "East Zone",
      acousticVibrationDB: 32.4,
      flowRateLps: 145.0,
      pressureBar: 4.1,
      anomalyScore: 12,
      leakStatus: "NORMAL",
      coordinates: { lat: 21.241, lng: 81.662 }
    },
    {
      sensorId: "IOT-ACOUSTIC-104",
      pipeSegment: "Bhanpuri Industrial Trunk Line",
      zone: "North Zone",
      acousticVibrationDB: 28.9,
      flowRateLps: 210.8,
      pressureBar: 4.5,
      anomalyScore: 8,
      leakStatus: "NORMAL",
      coordinates: { lat: 21.295, lng: 81.635 }
    }
  ];

  res.json({
    timestamp: new Date().toISOString(),
    totalActiveSensors: 420,
    activeLeaksDetected: 2,
    sensorNodes
  });
});
