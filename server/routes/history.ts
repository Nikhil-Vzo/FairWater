import { RequestHandler } from "express";
import { db } from "../db";
import { ZoneHistoryResponse } from "@shared/api";
import { z } from "zod";

// --- Zod schema for query validation ---
const historyQuerySchema = z.object({
  zoneId: z.string().min(1),
});

export const handleGetZoneHistory: RequestHandler = async (req, res) => {
  // 1. Validate query parameters
  const result = historyQuerySchema.safeParse(req.query);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid zoneId parameter" });
  }

  const { zoneId } = result.data;

  // 2. Fetch data from Supabase
  try {
    const { data, error } = await db
      .from("zone_history")
      .select("created_at, pressure, flow")
      .eq("zone_id", zoneId)
      .order("created_at", { ascending: false }) // Get the most recent data
      .limit(50); // Limit to the last 50 entries (approx 4 mins of data)

    if (error) {
      console.error("Supabase query error:", error.message);
      return res.status(500).json({ error: "Database query failed" });
    }

    // 3. Format and send response
    // Data is fetched descending, so reverse it to be chronological for charts
    const response: ZoneHistoryResponse = data.reverse();
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in handleGetZoneHistory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};