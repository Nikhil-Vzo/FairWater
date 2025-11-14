import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import { Zone } from "@shared/api"; // Import our new shared type

interface MapCardProps {
  zones: Zone[]; // Accept zones as a prop
}

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

export const MapCard = ({ zones }: MapCardProps) => {
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

          {zones.map((zone) => (
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