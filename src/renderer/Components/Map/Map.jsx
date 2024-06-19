import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import radarStyle from './radar.module.css';
// import './radar.css';

const center = [26.8206, 30.8025];
const distanceInKm = 80; // Desired distance in kilometers

function calculateIconSize(distance, zoom) {
  const metersPerPixel =
    (156543.03392 * Math.cos((center[0] * Math.PI) / 180)) / Math.pow(2, zoom);
  const sizeInPixels = (distance * 1000) / metersPerPixel;
  return [sizeInPixels, sizeInPixels];
}

export default function Map() {
  const [iconSize, setIconSize] = useState([200, 200]); // Default icon size

  function MapEventTracker() {
    useMapEvents({
      zoomend: (event) => {
        const newZoom = event.target.getZoom();
        const newSize = calculateIconSize(distanceInKm, newZoom);
        setIconSize(newSize);
      },
    });
    return null;
  }

  const radarIcon = L.divIcon({
    className: radarStyle.radar,
    iconSize: iconSize,
  });

  useEffect(() => {
    // Set the initial icon size based on the initial zoom level
    const initialZoom = 7;
    const initialSize = calculateIconSize(distanceInKm, initialZoom);
    setIconSize(initialSize);
  }, []);

  return (
    <>
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={true}
        minZoom={6}
        maxZoom={7}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="http://127.0.0.1:8080/{z}/{x}/{y}.png"
        />
        <MapEventTracker />
        <Marker position={center} icon={radarIcon}></Marker>
      </MapContainer>
    </>
  );
}
