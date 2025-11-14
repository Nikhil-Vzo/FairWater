/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

// --- EXISTING TYPES ---
export interface Zone {
  id: string;
  name: string;
  label: string;
  area: string;
  lat: number;
  lng: number;
  pressure: number;
  flow: number;
  color: string;
}

export interface Alert {
  id: string;
  message: string;
  type: "info" | "warning";
  icon: string;
  badge: string;
  badgeColor: string;
}

export interface ZoneStatusResponse {
  zones: Zone[];
  alerts: Alert[];
}

export interface OptimizationSchedule {
  zoneId: string;
  zoneName: string;
  area: string;
  time: number;
  status: "Balanced" | "Boost";
}

// --- NEW TYPES ---
export interface HistoryDataPoint {
  created_at: string; // ISO timestamp
  pressure: number;
  flow: number;
}

export type ZoneHistoryResponse = HistoryDataPoint[];