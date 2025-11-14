import { RequestHandler } from "express";
import { z } from "zod";
import { getSimulationState, addAlert } from "./simulation";
import { Zone } from "@shared/api";

// Zod schema for validation
const reportSchema = z.object({
  issueType: z.string().min(1, "Issue type is required"),
  zoneId: z.string().min(1, "Zone is required"),
  description: z.string().min(1, "Description is required"),
});

export const handleAddReport: RequestHandler = (req, res) => {
  const result = reportSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: "Invalid input", details: result.error.errors });
  }

  const { issueType, zoneId, description } = result.data;
  const { zones } = getSimulationState();
  
  const zone = zones.find(z => z.id === zoneId);

  if (!zone) {
    return res.status(404).json({ error: "Zone not found" });
  }

  // Add the alert to the in-memory simulation state
  addAlert(issueType, zone, description);
  
  res.status(201).json({ message: "Report added successfully" });
};