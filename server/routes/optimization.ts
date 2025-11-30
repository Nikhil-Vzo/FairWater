import { RequestHandler } from "express";
import { OptimizationResponse, OptimizationSchedule } from "@shared/api";
import { getSimulationState } from "./simulation"; // Import the state getter


const BASE_SCHEDULE: OptimizationSchedule[] = [
  { zone: "Z1", highlighted: false, area: "Civil Lines", minutes: 10 },
  { zone: "Z2", highlighted: false, area: "Pandri", minutes: 20 },
  { zone: "Z3", highlighted: true, area: "Mowa", minutes: 35 },
  { zone: "Z4", highlighted: false, area: "Gondra", minutes: 18 },
  { zone: "Z5", highlighted: false, area: "Ramnagar", minutes: 24 },
  { zone: "Z6", highlighted: false, area: "Jai Stambh", minutes: 15 },
  { zone: "Z7", highlighted: false, area: "Lisner", minutes: 28 },
  { zone: "Z8", highlighted: false, area: "Kota", minutes: 32 },
  { zone: "Z9", highlighted: false, area: "Risali", minutes: 26 },
  { zone: "Z10", highlighted: false, area: "New Raipur", minutes: 30 },
];


const generateSchedule = (): OptimizationResponse => {
 
  const { alerts } = getSimulationState();

 
  const needsBoost = alerts.some((alert) => alert.id === "1");

  let response: OptimizationResponse;

  if (needsBoost) {
    // 3. --- BOOSTED SCHEDULE ---
    // Low pressure in Z3 detected! Give it a boost.
    response = BASE_SCHEDULE.map((zone) => {
      if (zone.zone === "Z3") {
        return { ...zone, minutes: 40, highlighted: true };
      }
      // Slightly reduce other zones to compensate
      return { ...zone, minutes: Math.max(15, zone.minutes - 5), highlighted: false };
    });
  } else {
    // 4. --- BALANCED SCHEDULE ---
    // No critical alerts. Run a standard, fair schedule.
    response = BASE_SCHEDULE.map((zone) => ({
      ...zone,
      minutes: 20, // Give everyone a fair 20 minutes
      highlighted: false,
    }));
  }

  return response;
};

// The API handler for POST /api/optimize
export const handleOptimizeSchedule: RequestHandler = (req, res) => {
  const newSchedule = generateSchedule();

  // Simulate the "AI" thinking for 1.5 seconds
  setTimeout(() => {
    res.status(200).json(newSchedule);
  }, 1500);
};
