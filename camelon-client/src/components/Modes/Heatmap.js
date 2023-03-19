import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";




import "leaflet/dist/leaflet.css";
import "../../css/Pinmap.css";

import L from "leaflet";
import "leaflet.heat";
import { useSelector } from "react-redux";

export default function Heatmap() {
  const { locations } = useSelector((state) => state.data);
  const { user_current_location } = useSelector((state) => state.data);

  function SetView({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
    // var newMarker = new L.circle(coords).addTo(map);
    // var marker = L.circle(coords, 1609.34, {
    //   color: "blue",
    //   fillColor: "blue",
    // }).addTo(map);
    return null;
  }

  const HeatMap = () => {
    const map = useMap();

    useEffect(() => {
      const points = locations
        ? locations.map((location) => {
            return [location.latitude, location.longitude, 15];
          })
        : [];

      L.heatLayer(points, { radius: 25, blur: 15 }).addTo(map);
    }, []);
  };

  return (
    <>
      <div class="sm" style={{ marginTop: 16,marginBottom:"5%" }}>
        <div class="p-1 border-2 border-gray-200 border rounded dark:border-gray-700">
          <MapContainer center={[13.751, 100.492]} zoom={13}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <HeatMap />
            <SetView
              coords={[
                user_current_location.latitude,
                user_current_location.longitude,
              ]}
            />
          </MapContainer>
        </div>
      </div>
    </>
  );
}
