import React from 'react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import radarStyle from './radar.module.css';
import './radar.css';

const radarIcon = L.divIcon({
  className: radarStyle.radar,
  iconSize: [200, 200],
});

const center = [27.1448835, 31.1877654];

export default function Map() {
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
        <Marker position={center} icon={radarIcon}></Marker>
        {/* <Circle radius={50000} center={center} /> */}
      </MapContainer>
    </>
  );
}
