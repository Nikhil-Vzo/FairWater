import { Request, Response } from "express";

export function handleFieldOrders(req: Request, res: Response) {
  res.json({
    success: true,
    orders: [
      {
        id: "FW-1001",
        zone: "Zone 1 (Civil Lines)",
        issue: "Underground main line pressure leak (1.2 bar drop)",
        location: "G.E. Road near Telegraph Office",
        priority: "High",
        status: "On Site",
        assignedEngineer: "Er. Ramesh Verma",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "FW-1002",
        zone: "Zone 3 (Tatibandh)",
        issue: "Water quality turbidity spike (>8.5 NTU)",
        location: "Mowa Sector 2 Booster Pump Station",
        priority: "Critical",
        status: "Assigned",
        assignedEngineer: "Er. Ramesh Verma",
        updatedAt: new Date().toISOString(),
      },
    ],
  });
}
