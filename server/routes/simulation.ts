import { RequestHandler } from "express";
import { Zone, Alert, ZoneStatusResponse } from "@shared/api";
import { db } from "../db"; // Import the Supabase client

// Base data, moved from the frontend components
const ZONES: Zone[] = [
  {
    id: "z1",
    name: "Zone 1",
    label: "Z1",
    area: "Civil Lines / Telibandha",
    lat: 21.2582,
    lng: 81.6304,
    pressure: 3.2,
    flow: 850,
    color: "#22c55e",
  },
  {
    id: "z2",
    name: "Zone 2",
    label: "Z2",
    area: "Pandri / Shankar Nagar",
    lat: 21.245,
    lng: 81.62,
    pressure: 2.8,
    flow: 720,
    color: "#eab308",
  },
  {
    id: "z3",
    name: "Zone 3",
    label: "Z3",
    area: "Mowa / Tatibandh (Tail-End)",
    lat: 21.235,
    lng: 81.645,
    pressure: 1.5,
    flow: 420,
    color: "#ef4444",
  },
  {
    id: "z4",
    name: "Zone 4",
    label: "Z4",
    area: "Gondra / Devendra Nagar",
    lat: 21.252,
    lng: 81.655,
    pressure: 3.0,
    flow: 800,
    color: "#06b6d4",
  },
  {
    id: "z5",
    name: "Zone 5",
    label: "Z5",
    area: "Ramnagar / Kupri Road",
    lat: 21.24,
    lng: 81.61,
    pressure: 2.6,
    flow: 680,
    color: "#8b5cf6",
  },
  {
    id: "z6",
    name: "Zone 6",
    label: "Z6",
    area: "Jai Stambh Chowk",
    lat: 21.248,
    lng: 81.635,
    pressure: 3.1,
    flow: 820,
    color: "#ec4899",
  },
  {
    id: "z7",
    name: "Zone 7",
    label: "Z7",
    area: "Lisner / Tekari",
    lat: 21.265,
    lng: 81.64,
    pressure: 2.4,
    flow: 620,
    color: "#f59e0b",
  },
  {
    id: "z8",
    name: "Zone 8",
    label: "Z8",
    area: "Kota / Khond Road",
    lat: 21.23,
    lng: 81.615,
    pressure: 1.8,
    flow: 480,
    color: "#10b981",
  },
  {
    id: "z9",
    name: "Zone 9",
    label: "Z9",
    area: "Risali / Durga Tekdi",
    lat: 21.26,
    lng: 81.665,
    pressure: 2.2,
    flow: 580,
    color: "#6366f1",
  },
  {
    id: "z10",
    name: "Zone 10",
    label: "Z10",
    area: "New Raipur / IT Park",
    lat: 21.22,
    lng: 81.63,
    pressure: 2.0,
    flow: 520,
    color: "#f87171",
  },
];

const BASE_ALERTS: Alert[] = [
  {
    id: "2",
    message: "Citizen report: Water shortage in Zone 2",
    type: "info",
    icon: "MapPin",
    badge: "📍",
    badgeColor: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "3",
    message: "Pump maintenance due in Zone 1",
    type: "info",
    icon: "Wrench",
    badge: "🔧",
    badgeColor: "bg-blue-100 text-blue-800",
  },
];

// In-memory state
let currentZones = [...ZONES.map((z) => ({ ...z }))];
let currentAlerts: Alert[] = [...BASE_ALERTS];

// Helper to get random fluctuation
const fluctuate = (value: number, percent: number) => {
  const amount = value * percent;
  return parseFloat((value - amount / 2 + Math.random() * amount).toFixed(1));
};

// --- NEW: Function to log data to Supabase ---
const logZoneData = async (zones: Zone[]) => {
  const records = zones.map((zone) => ({
    zone_id: zone.id,
    pressure: zone.pressure,
    flow: zone.flow,
    // created_at is set by default in Supabase
  }));

  try {
    const { error } = await db.from("zone_history").insert(records);
    if (error) {
      console.error("Supabase insert error:", error.message);
    }
  } catch (error) {
    console.error("Error logging data to Supabase:", error);
  }
};

// The simulation function
const simulateData = () => {
  const newAlerts: Alert[] = [...BASE_ALERTS];

  currentZones = currentZones.map((zone) => {
    // Simulate data fluctuations
    const newPressure = fluctuate(zone.pressure, 0.1); // 10% fluctuation
    const newFlow = fluctuate(zone.flow, 0.15); // 15% fluctuation

    // --- Dynamic Alert Generation ---
    if (zone.id === "z3" && newPressure < 1.7) {
      newAlerts.unshift({
        id: "1",
        message: `Low pressure detected in Zone 3 (${newPressure} bar)`,
        type: "warning",
        icon: "AlertCircle",
        badge: "⚠️",
        badgeColor: "bg-red-100 text-red-800",
      });
    }

    if (zone.id === "z7" && newPressure > 3.5) {
      newAlerts.push({
        id: "4",
        message: `High pressure spike in Zone 7 (${newPressure} bar)`,
        type: "warning",
        icon: "BarChart",
        badge: "📊",
        badgeColor: "bg-orange-100 text-orange-800",
      });
    }
    // --- End Alert Generation ---

    return {
      ...zone,
      pressure: newPressure,
      flow: Math.round(newFlow),
    };
  });

  currentAlerts = newAlerts;

  // --- NEW: Log the new data to Supabase ---
  // We don't wait for this to finish (no await)
  // so it doesn't block the simulation loop.
  logZoneData(currentZones);
};

// --- Public API ---

let simulationInterval: NodeJS.Timeout | null = null;

// Start the simulation timer
export const startSimulation = () => {
  if (simulationInterval) {
    return; // Already started
  }
  console.log("Starting real-time water data simulation...");
  // Run once immediately, then set interval
  simulateData();
  simulationInterval = setInterval(simulateData, 5000);
};

// The API handler for GET /api/zonestatus
export const handleGetZoneStatus: RequestHandler = (req, res) => {
  const response: ZoneStatusResponse = {
    zones: currentZones,
    alerts: currentAlerts,
  };
  res.status(200).json(response);
};

// --- This lets other routes read the current simulation state ---
export const getSimulationState = () => {
  return { zones: currentZones, alerts: currentAlerts };
};