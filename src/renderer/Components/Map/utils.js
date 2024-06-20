// Haversine formula to calculate distance between two points
export function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Calculate new position
export function calculateNewPosition(lat1, lon1, lat2, lon2, fraction) {
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const λ1 = (lon1 * Math.PI) / 180;
  const λ2 = (lon2 * Math.PI) / 180;
  const Δφ = φ2 - φ1;
  const Δλ = λ2 - λ1;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const A = Math.sin((1 - fraction) * c) / Math.sin(c);
  const B = Math.sin(fraction * c) / Math.sin(c);

  const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2);
  const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2);
  const z = A * Math.sin(φ1) + B * Math.sin(φ2);

  const φ3 = Math.atan2(z, Math.sqrt(x * x + y * y));
  const λ3 = Math.atan2(y, x);

  return [φ3 * (180 / Math.PI), λ3 * (180 / Math.PI)];
}

export function getTotalDistance(positions) {
  let totalDistance = 0;
  for (let i = 0; i < positions.length - 1; i++) {
    const [lat1, lon1] = positions[i];
    const [lat2, lon2] = positions[i + 1];
    totalDistance += haversine(lat1, lon1, lat2, lon2);
  }
  return totalDistance;
}

export function calculateNewPositionAlongPath(positions, fraction) {
  let accumulatedDistance = 0;

  for (let i = 0; i < positions.length - 1; i++) {
    const [lat1, lon1] = positions[i];
    const [lat2, lon2] = positions[i + 1];
    const segmentDistance = haversine(lat1, lon1, lat2, lon2);
    const nextAccumulatedDistance = accumulatedDistance + segmentDistance;

    if (fraction * getTotalDistance(positions) <= nextAccumulatedDistance) {
      const remainingDistance =
        fraction * getTotalDistance(positions) - accumulatedDistance;
      const fractionInSegment = remainingDistance / segmentDistance;
      return calculateNewPosition(lat1, lon1, lat2, lon2, fractionInSegment);
    }

    accumulatedDistance = nextAccumulatedDistance;
  }

  return positions[positions.length - 1]; // Should not reach here normally
}
