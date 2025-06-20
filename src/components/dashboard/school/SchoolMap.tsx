"use client";

import { useEffect, useRef } from "react";
import { Icon, map, Map, tileLayer, marker } from "leaflet";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";

interface SchoolMapProps {
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const markerIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function SchoolMap({ coordinates }: SchoolMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = map(mapRef.current).setView(
        [coordinates.latitude, coordinates.longitude],
        4
      );

      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapInstance.current);

      marker([coordinates.latitude, coordinates.longitude], { icon: markerIcon }).addTo(mapInstance.current);
    }

    return () => {
      // 컴포넌트가 unmount되면 map 제거
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [coordinates]);

  return <MapWrapper ref={mapRef} />;
}

const MapWrapper = styled.div`
  background: white;
  height: 100%;
  padding: 1rem; 
  border-radius: 12px;
  position: relative;
  z-index: 0;

  .leaflet-container {
    height: 100%;
    width: 100%;
    border-radius: 12px;
  }
`;
