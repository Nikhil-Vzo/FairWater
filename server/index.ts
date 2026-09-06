import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { handleDemo } from "./routes/demo";
import { handleGetZoneStatus, startSimulation } from "./routes/simulation";
import { handleOptimizeSchedule } from "./routes/optimization";
import { handleGetZoneHistory } from "./routes/history";
import { handleAddReport } from "./routes/report";
import { handleAnalyzeImage } from "./routes/analysis";
import { handleGetReportStatus } from "./routes/reportStatus";
import { handleGetRiskAnalytics } from "./routes/riskAnalytics";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // --- NEW FAIRWATER API ---
  app.get("/api/zonestatus", handleGetZoneStatus);
  app.post("/api/optimize", handleOptimizeSchedule);
  app.get("/api/zonehistory", handleGetZoneHistory);
  app.post("/api/report", handleAddReport);
  app.post("/api/analyze", handleAnalyzeImage);
  app.get("/api/report/status/:ticketId", handleGetReportStatus);
  app.get("/api/risk-analytics", handleGetRiskAnalytics);

  // Start the simulation when the server is created
  startSimulation();

  return app;
}
