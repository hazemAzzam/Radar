import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import {
  haversine,
  calculateNewPositionAlongPath,
  getTotalDistance,
} from '../utils';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { radarPosition, diameter } from '../Map';

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

const Plane = ({
  positionsToVisit,
  speed,
  onEnterRadarRange,
  onLeaveRadarRange,
}) => {
  const [currentPosition, setCurrentPosition] = useState(positionsToVisit[0]);
  const [distanceToRadar, setDistanceToRadar] = useState(null);
  const [approachingRadar, setApproachingRadar] = useState(null);

  useEffect(() => {
    // console.log(alert('hi'));
    const totalDistance = getTotalDistance(positionsToVisit);
    const totalDuration = totalDistance / speed; // Total duration in hours
    const updateInterval = 100; // Update every second

    let elapsed = 0;
    let enteredRange = false;

    const interval = setInterval(() => {
      elapsed += updateInterval / (1000 * 3600); // Convert to hours
      const fraction = elapsed / totalDuration;

      if (fraction >= 1) {
        setCurrentPosition(positionsToVisit[positionsToVisit.length - 1]);
        clearInterval(interval);
      } else {
        const [newLat, newLon] = calculateNewPositionAlongPath(
          positionsToVisit,
          fraction,
        );
        setCurrentPosition([newLat, newLon]);

        // Calculate distance to radar
        const newDistanceToRadar = haversine(
          newLat,
          newLon,
          radarPosition[0],
          radarPosition[1],
        );
        setDistanceToRadar(newDistanceToRadar);

        // Determine if approaching or moving away from radar
        if (distanceToRadar !== null) {
          if (newDistanceToRadar < distanceToRadar) {
            setApproachingRadar(true);
          } else {
            setApproachingRadar(false);
          }
        } else {
          // Initially set the approachingRadar based on the first comparison
          setApproachingRadar(newDistanceToRadar < diameter);
        }

        // Check radar range
        if (newDistanceToRadar <= diameter) {
          if (!enteredRange) {
            enteredRange = true;
            onEnterRadarRange();
          }
        } else {
          if (enteredRange) {
            enteredRange = false;
            onLeaveRadarRange();
          }
        }
      }
    }, updateInterval);

    return () => clearInterval(interval);
  }, []);

  const popupContent = (
    <div>
      <p>Speed: {speed} km/h</p>
      {distanceToRadar !== null ? (
        <p>Distance to Radar: {distanceToRadar.toFixed(2)} km</p>
      ) : (
        <p>Distance to Radar: Calculating...</p>
      )}
      <p>
        {approachingRadar !== null
          ? approachingRadar
            ? 'Approaching Radar'
            : 'Moving Away from Radar'
          : ''}
      </p>
    </div>
  );

  return (
    <Marker position={currentPosition} icon={customIcon}>
      <Popup>{popupContent}</Popup>
    </Marker>
  );
};

export default Plane;
