import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import radarStyle from './radar.module.css';

const radarIcon = L.divIcon({
  className: radarStyle.radar,
  iconSize: [50, 50],
});

const center = [27.1448835, 31.1877654];

export default function Map() {
  return (
    <>
      <MapContainer center={center} zoom={7} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} icon={radarIcon}></Marker>
      </MapContainer>
    </>
  );
}
