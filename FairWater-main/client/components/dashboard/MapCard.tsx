import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";

interface Zone {
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

// Custom icon creator for zone markers
const createCustomIcon = (color: string, label: string) => {
  return L.divIcon({
    html: `
      <div style="
        width: 48px;
        height: 48px;
        background-color: ${color};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 16px;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        cursor: pointer;
      ">
        ${label}
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -24],
    className: "custom-icon",
  });
};

export const MapCard = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="w-full aspect-square flex items-center justify-center bg-blue-50">
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="w-full aspect-square">
        <MapContainer
          center={[21.2458, 81.6304]}
          zoom={13}
          style={{ width: "100%", height: "100%" }}
          zoomControl={true}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {ZONES.map((zone) => (
            <Marker
              key={zone.id}
              position={[zone.lat, zone.lng]}
              icon={createCustomIcon(zone.color, zone.label)}
              eventHandlers={{
                click: () => setSelectedZone(zone.id),
              }}
            >
              <Tooltip permanent={selectedZone === zone.id} direction="top">
                <div className="text-xs font-medium">
                  <div className="font-bold">{zone.area}</div>
                  <div>Pressure: {zone.pressure} bar</div>
                  <div>Flow: {zone.flow} L/min</div>
                </div>
              </Tooltip>
              <Popup>
                <div className="text-sm font-medium">
                  <div className="font-bold mb-2">
                    {zone.name} - {zone.area}
                  </div>
                  <div className="space-y-1">
                    <div>
                      Pressure:{" "}
                      <span className="font-bold">{zone.pressure} bar</span>
                    </div>
                    <div>
                      Flow: <span className="font-bold">{zone.flow} L/min</span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
