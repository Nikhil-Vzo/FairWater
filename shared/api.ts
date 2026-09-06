/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

// --- EXISTING TYPES ---
export interface Pipeline {
  id: string;
  name: string;
  pressure: number; // bar
  flow: number; // L/min
  status: "Normal" | "Leak" | "High Pressure" | "Low Pressure";
}

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
  pipelines: Pipeline[]; // New field
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
  zone: string;
  area: string;
  minutes: number;
  highlighted: boolean;
}

export type OptimizationResponse = OptimizationSchedule[];

// --- NEW TYPES ---
export interface HistoryDataPoint {
  created_at: string; // ISO timestamp
  pressure: number;
  flow: number;
}

export type ZoneHistoryResponse = HistoryDataPoint[];

export interface DemoResponse {
  message: string;
}