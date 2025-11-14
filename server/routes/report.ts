import { RequestHandler } from "express";
import { z } from "zod";
import { getSimulationState, addAlert } from "./simulation";
import { db } from "../db"; // Import the Supabase client

// Zod schema for validation
const reportSchema = z.object({
  issueType: z.string().min(1, "Issue type is required"),
  zoneId: z.string().min(1, "Zone is required"),
  description: z.string().min(1, "Description is required"),
  // --- ADD imageUrl TO SCHEMA ---
  imageUrl: z.string().url().nullable().optional(),
});

// Make the handler async
export const handleAddReport: RequestHandler = async (req, res) => {
  const result = reportSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(400)
      .json({ error: "Invalid input", details: result.error.errors });
  }

  // --- GET imageUrl FROM VALIDATED DATA ---
  const { issueType, zoneId, description, imageUrl } = result.data;

  // --- Insert into Supabase ---
  try {
    const { data, error }_ = await db
      .from("citizen_reports")
      .insert({
        issue_type: issueType,
        zone_id: zoneId,
        description: description,
        image_url: imageUrl ?? null, // <-- SAVE THE IMAGE URL
      })
      .select(); // .select() returns the newly inserted row

    if (error) {
      console.error("Supabase insert error:", error.message);
      throw new Error(error.message);
    }

    // --- IF SUCCESSFUL, also add to the live admin panel ---
    const { zones } = getSimulationState();
    const zone = zones.find((z) => z.id === zoneId);

    if (zone) {
      addAlert(issueType, zone, description);
    }

    res.status(201).json({ message: "Report added successfully", data });
  } catch (error) {
    const e = error as Error;
    console.error("Failed to submit report:", e.message);
    res.status(500).json({ error: "Failed to submit report.", details: e.message });
  }
};