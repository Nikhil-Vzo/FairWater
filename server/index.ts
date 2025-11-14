import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleGetZoneStatus, startSimulation } from "./routes/simulation";
import { handleOptimizeSchedule } from "./routes/optimization"; // Import new handler

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
  app.post("/api/optimize", handleOptimizeSchedule); // Add the new POST route

  // Start the simulation when the server is created
  startSimulation();

  return app;
}