import { Request, Response } from "express";

export function handleTankerDispatch(req: Request, res: Response) {
  res.json({
    success: true,
    activeFleet: [
      {
        id: "T-801",
        vehicleNo: "CG-04-WT-8821",
        driver: "Satish Kumar",
        capacityLiters: 10000,
        currentZone: "Zone 1 (Civil Lines)",
        destination: "Telibandha Colony Block B",
        status: "In Transit",
        etaMinutes: 12,
      },
      {
        id: "T-802",
        vehicleNo: "CG-04-WT-9014",
        driver: "Anil Sahu",
        capacityLiters: 12000,
        currentZone: "Zone 3 (Tatibandh)",
        destination: "Mowa Community Hospital Relief Point",
        status: "Dispensing",
        etaMinutes: 0,
      },
    ],
  });
}
