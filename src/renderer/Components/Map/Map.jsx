import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import radarStyle from './radar.module.css';
import Opponent from './Opponent/Opponent';
import Plane from './Plane/Plane';

// Radar center position
export const radarPosition = [26.8206, 30.8025];
export const diameter = 80; // Desired distance in kilometers

function calculateIconSize(distance, zoom) {
  const metersPerPixel =
    (156543.03392 * Math.cos((radarPosition[0] * Math.PI) / 180)) /
    Math.pow(2, zoom);
  const sizeInPixels = (distance * 1000) / metersPerPixel;
  return [sizeInPixels, sizeInPixels];
}

const Map = () => {
  const [iconSize, setIconSize] = useState([146.5, 146.5]); // Default icon size
  const [markers, setMarkers] = useState([]);
  const [radarClassName, setRadarClassName] = useState(radarStyle.radar); // Default radar style
  const [lines, setLines] = useState([]);

  const addMarker = (latlng) => {
    setMarkers((prevMarkers) => [...prevMarkers, latlng]);
  };

  function MapEventTracker() {
    useMapEvents({
      zoomend: (event) => {
        const newZoom = event.target.getZoom();
        const newSize = calculateIconSize(diameter * 2, newZoom);
        setIconSize(newSize);
      },
      click: (e) => {
        addMarker(e.latlng);
      },
    });
    return null;
  }

  const radarIcon = L.divIcon({
    className: radarClassName,
    iconSize: iconSize,
  });

  const handleRadarStyleChange = (danger) => {
    setRadarClassName(
      danger ? `${radarStyle.radar} ${radarStyle.danger}` : radarStyle.radar,
    );
  };

  const handleSaveLine = (args) => {
    console.log(args);
    setLines(1);
    console.log(lines);
  };

  useEffect(() => {
    const initialZoom = 7;
    const initialSize = calculateIconSize(diameter, initialZoom);
    setIconSize(initialSize);

    window.electron.ipcRenderer.on('save-line', handleSaveLine);
  }, []);

  return (
    <MapContainer
      center={radarPosition}
      zoom={7}
      scrollWheelZoom={true}
      minZoom={5}
      maxZoom={7}
      style={{ height: 'calc(100vh - var(--nav-size))', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="http://127.0.0.1:8080/{z}/{x}/{y}.webp"
      />
      <MapEventTracker />
      <Marker position={radarPosition} icon={radarIcon}></Marker>
      {markers.map((position, idx) => (
        <Opponent
          key={`marker-${idx}`}
          position={position}
          radarPosition={radarPosition}
        />
      ))}
      {/* {lines.map((line, idx) => {
        console.log('Rendering line:', line);
        return (
          <Plane
            key={`plane-${idx}`}
            positionsToVisit={line.positionsToVisit}
            speed={line.speed}
            onEnterRadarRange={() => handleRadarStyleChange(true)}
            onLeaveRadarRange={() => handleRadarStyleChange(false)}
          />
        );
      })} */}
    </MapContainer>
  );
};

export default Map;
