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

  // --- KEY CHANGE: Calculate 30 minutes ago ---
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();

  // 2. Fetch data from Supabase
  try {
    const { data, error } = await db
      .from("zone_history")
      .select("created_at, pressure, flow")
      .eq("zone_id", zoneId)
      // --- KEY CHANGE: Add time filter to query ---
      // Only select records created in the last 30 minutes
      .gte("created_at", thirtyMinutesAgo)
      // --- KEY CHANGE: Sort ascending (chronological) ---
      .order("created_at", { ascending: true }); // Get data in chronological order

    if (error) {
      console.error("Supabase query error:", error.message);
      return res.status(500).json({ error: "Database query failed" });
    }

    // 3. Format and send response
    // --- KEY CHANGE: No .reverse() needed as we sorted ascending ---
    const response: ZoneHistoryResponse = data;
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in handleGetZoneHistory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};