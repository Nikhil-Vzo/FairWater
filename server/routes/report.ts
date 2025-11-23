import { RequestHandler } from "express";
import { getSimulationState, addAlert } from "./simulation";
import { db } from "../db"; // Import the Supabase client
import { insertReportSchema } from "../../shared/schema";

// Make the handler async
export const handleAddReport: RequestHandler = async (req, res) => {
  const result = insertReportSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(400)
      .json({ error: "Invalid input", details: result.error.errors });
  }

  // --- GET DATA FROM VALIDATED INPUT ---
  const { issueType, zoneId, description, address, imageUrl } = result.data;

  // --- Insert into Supabase ---
  try {
    const { data, error } = await db
      .from("citizen_reports")
      .insert({
        issue_type: issueType,
        zone_id: zoneId,
        description: description,
        location: address ?? null, // Map address to location column
        image_url: imageUrl ?? null,
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
