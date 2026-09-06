import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
// import "leaflet/dist/leaflet.css"; // Remove this line
import { Card, CardContent } from "@/components/ui/card";
import { Zone } from "@shared/api";

interface MapCardProps {
  zones: Zone[];
  onZoneSelect: (zoneId: string) => void;
  selectedZoneId: string | null;
}

export function MapCard({
  zones,
  onZoneSelect,
  selectedZoneId,
}: MapCardProps) {
  return (
    <Card className="h-[600px] overflow-hidden">
      <CardContent className="h-full p-0">
        <MapContainer
          {...({
            center: [21.245, 81.635],
            zoom: 13,
            style: { height: "100%", width: "100%" },
            scrollWheelZoom: false,
          } as any)}
        >
          <TileLayer
            {...({
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            } as any)}
          />

          {zones.map((zone) => {
            const isSelected = selectedZoneId === zone.id;
            return (
              <CircleMarker
                key={zone.id}
                {...({
                  center: [zone.lat, zone.lng],
                  radius: isSelected ? 12 : 8,
                  pathOptions: {
                    color: zone.color,
                    fillColor: zone.color,
                    fillOpacity: isSelected ? 0.8 : 0.5,
                    weight: isSelected ? 4 : 2,
                  },
                  eventHandlers: {
                    click: () => {
                      onZoneSelect(zone.id);
                    },
                  },
                } as any)}
              >
                <Tooltip>
                  <div>
                    <div className="font-bold">
                      {zone.name} ({zone.label})
                    </div>
                    <div>{zone.area}</div>
                    <hr className="my-1" />
                    <div>Pressure: {zone.pressure} bar</div>
                    <div>Flow: {zone.flow} L/min</div>
                  </div>
                </Tooltip>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </CardContent>
    </Card>
  );
}