/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// --- NEW TYPES FOR FAIRWATER ---

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
  type: "warning" | "info";
  icon: "AlertCircle" | "MapPin" | "Wrench" | "BarChart";
  badge: string;
  badgeColor: string;
}

export interface ZoneStatusResponse {
  zones: Zone[];
  alerts: Alert[];
}