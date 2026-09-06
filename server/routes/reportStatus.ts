import { RequestHandler } from "express";

interface CitizenReportStatus {
  ticketId: string;
  issueType: string;
  zoneId: string;
  status: "Received" | "Under Investigation" | "Dispatch Scheduled" | "Resolved";
  progress: number; // 0 to 100
  estimatedResolution: string;
  assignedEngineer: string;
  lastUpdated: string;
  verificationBadge: string;
}

const mockReports: Record<string, CitizenReportStatus> = {
  "FW-1001": {
    ticketId: "FW-1001",
    issueType: "Leakage",
    zoneId: "Zone 1",
    status: "Dispatch Scheduled",
    progress: 65,
    estimatedResolution: "Within 3 hours",
    assignedEngineer: "Rakesh Sharma (Zone 1 Field Lead)",
    lastUpdated: "10 mins ago",
    verificationBadge: "AI Verified Leak (Confidence: 94%)",
  },
  "FW-1002": {
    ticketId: "FW-1002",
    issueType: "No Water Supply",
    zoneId: "Zone 3",
    status: "Under Investigation",
    progress: 35,
    estimatedResolution: "Within 5 hours",
    assignedEngineer: "Priya Patel (Hydraulics Specialist)",
    lastUpdated: "25 mins ago",
    verificationBadge: "Sensor Cross-Validated (Low Pressure Detected)",
  },
};

export const handleGetReportStatus: RequestHandler = (req, res) => {
  const { ticketId } = req.params;
  const uppercaseId = ticketId.toUpperCase();

  if (mockReports[uppercaseId]) {
    return res.json(mockReports[uppercaseId]);
  }

  // Fallback dynamic tracking for newly created tickets
  return res.json({
    ticketId: uppercaseId,
    issueType: "Citizen Report",
    zoneId: "Zone 2",
    status: "Received",
    progress: 20,
    estimatedResolution: "Within 24 hours",
    assignedEngineer: "Unassigned (Queued)",
    lastUpdated: "Just now",
    verificationBadge: "Logged into Smart Raipur Water Dispatch System",
  });
};
