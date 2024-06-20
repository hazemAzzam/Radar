import React, { useState } from 'react';
import styles from './Lines.module.css';

const Lines = () => {
  const [speed, setSpeed] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [positionsToVisit, setPositionsToVisit] = useState([]);

  const handleAddPosition = () => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      alert('Please enter valid latitude and longitude.');
      return;
    }

    setPositionsToVisit([...positionsToVisit, [lat, lon]]);
    setLatitude('');
    setLongitude('');
  };

  const handleRemovePosition = (index) => {
    const updatedPositions = [...positionsToVisit];
    updatedPositions.splice(index, 1);
    setPositionsToVisit(updatedPositions);
  };

  const handleSavePositions = () => {
    // Handle saving positions logic here
    // alert(positionsToVisit.length());
    window.electron.ipcRenderer.sendMessage('save-line', {
      speed,
      positionsToVisit,
    });
    // alert('Positions saved!');
  };

  return (
    <div className={styles.container}>
      <h2>Plane Position Manager</h2>
      <div className={styles.speed_control}>
        <label htmlFor="speed">Speed (km/h):</label>
        <input
          type="number"
          id="speed"
          placeholder="Enter speed"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
        />
      </div>
      <div className={styles.positions}>
        <h3>Positions to Visit</h3>
        <ul className={styles.positions_list}>
          {positionsToVisit.map((position, index) => (
            <li key={index} className={styles.position_item}>
              <span>
                Position {index + 1}: ({position.latitude}, {position.longitude}
                )
              </span>
              <button
                className={styles.remove_position_btn}
                onClick={() => handleRemovePosition(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.add_position}>
          <label htmlFor="latitude">Latitude:</label>
          <input
            type="text"
            id="latitude"
            placeholder="Enter latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <label htmlFor="longitude">Longitude:</label>
          <input
            type="text"
            id="longitude"
            placeholder="Enter longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          <button
            className={styles.add_position_btn}
            onClick={handleAddPosition}
          >
            Add Position
          </button>
        </div>
      </div>
      <button className={styles.save_btn} onClick={handleSavePositions}>
        Save
      </button>
    </div>
  );
};

export default Lines;
