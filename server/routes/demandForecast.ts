import { Router } from "express";

export const demandForecastRouter = Router();

demandForecastRouter.get("/", (_req, res) => {
  const currentHour = new Date().getHours();

  // 24-hour demand forecast (ML simulated model based on weather, historical usage, and diurnal patterns)
  const hourlyForecast = Array.from({ length: 24 }).map((_, idx) => {
    const hour = (currentHour + idx) % 24;
    let baseDemand = 120; // MLD
    if ((hour >= 6 && hour <= 9) || (hour >= 18 && hour <= 21)) {
      baseDemand = 280 + Math.floor(Math.random() * 30); // Peak hours
    } else if (hour >= 0 && hour <= 4) {
      baseDemand = 45 + Math.floor(Math.random() * 15); // Low night demand
    } else {
      baseDemand = 160 + Math.floor(Math.random() * 25);
    }

    return {
      hour: `${hour.toString().padStart(2, "0")}:00`,
      predictedDemandMLD: baseDemand,
      solarAvailabilityKW: (hour >= 7 && hour <= 17) ? Math.floor(Math.sin((hour - 7) / 10 * Math.PI) * 4500) : 0,
      gridTariffRate: (hour >= 17 && hour <= 22) ? "Peak (₹9.5/kWh)" : (hour >= 23 || hour <= 5) ? "Off-Peak (₹4.2/kWh)" : "Standard (₹6.8/kWh)"
    };
  });

  const pumpSchedules = [
    { pumpId: "PUMP-CENTRAL-01", status: "Active (Solar Powered)", targetZone: "Central Zone", flowRate: "3,200 m³/h", estimatedCostSavedToday: "₹18,400" },
    { pumpId: "PUMP-NORTH-02", status: "Scheduled (Off-Peak Night Run)", targetZone: "North Zone", flowRate: "2,800 m³/h", estimatedCostSavedToday: "₹12,100" },
    { pumpId: "PUMP-WEST-04", status: "Throttled (Peak Tariff Avoidance)", targetZone: "West Zone", flowRate: "1,100 m³/h", estimatedCostSavedToday: "₹15,800" },
    { pumpId: "PUMP-EAST-01", status: "Standby (Surge Ready)", targetZone: "East Zone", flowRate: "0 m³/h", estimatedCostSavedToday: "₹0" },
  ];

  res.json({
    timestamp: new Date().toISOString(),
    forecastSummary: {
      totalPredictedDemandMLD: 3420,
      peakHour: "08:00",
      recommendedSolarUsagePercent: 68,
      estimatedDailyEnergySavings: "₹46,300"
    },
    hourlyForecast,
    pumpSchedules
  });
});
