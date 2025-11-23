import { z } from "zod";

export const insertReportSchema = z.object({
    issueType: z.string().min(1, "Issue type is required"),
    zoneId: z.string().min(1, "Zone is required"),
    description: z.string().min(1, "Description is required"),
    address: z.string().optional(),
    imageUrl: z.string().optional().nullable(),
});

export type InsertReport = z.infer<typeof insertReportSchema>;
