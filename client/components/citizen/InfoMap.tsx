import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Co-ordinates for Z1, Z2, Z3
const zonePins = [
  { id: "z1", name: "Zone 1", position: [21.2582, 81.6304] as [number, number] },
  { id: "z2", name: "Zone 2", position: [21.245, 81.62] as [number, number] },
  { id: "z3", name: "Zone 3", position: [21.235, 81.645] as [number, number] },
];

export const InfoMap = () => {
  return (
    <div className="mt-8 text-center">
      <div className="w-full h-64 rounded-lg overflow-hidden shadow-md border">
        <MapContainer
          center={[21.245, 81.635]}
          zoom={13}
          style={{ width: "100%", height: "100%" }}
          zoomControl={false}
          scrollWheelZoom={false}
          dragging={false}
          touchZoom={false}
          doubleClickZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {zonePins.map((zone) => (
            <Marker key={zone.id} position={zone.position}>
              <Popup>{zone.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <p className="text-sm text-gray-600 mt-4">
        Your report is routed to the nearest water monitoring zone.
      </p>
    </div>
  );
};