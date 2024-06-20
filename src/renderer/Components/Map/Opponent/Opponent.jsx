import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix marker icon issue
const customIcon = new L.Icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const CustomMarker = ({ position, radarPosition }) => {
  const calculateDistance = (radarPosition, markerPosition) => {
    const radarLatLng = L.latLng(radarPosition[0], radarPosition[1]);
    const markerLatLng = L.latLng(markerPosition.lat, markerPosition.lng);
    return (radarLatLng.distanceTo(markerLatLng) / 1000).toFixed(2); // Distance in kilometers
  };

  return (
    <Marker position={position} icon={customIcon}>
      <Popup>
        Distance to radar: {calculateDistance(radarPosition, position)} km
      </Popup>
    </Marker>
  );
};

export default CustomMarker;
