import React, { useEffect, useRef } from 'react';
import style from './settings.module.css';

export default function Settings() {
  let theme = useRef();

  function handleSaveEvent() {
    // alert(theme.current.value);
    window.electron.ipcRenderer.sendMessage('set-theme', theme.current.value);
    window.electron.ipcRenderer.sendMessage('refresh', null);
  }
  useEffect(() => {}, []);
  return (
    <>
      <div className={style.container}>
        <div className={style.element}>
          <label htmlFor="themes">Themes</label>
          <select name="themes" id="" ref={theme}>
            <option value="light">Light</option>
            <option value="spinal_map">Spinal Map</option>
            <option value="tilegen">Tilegen</option>
          </select>
        </div>
        <div className={style.save}>
          <button
            onClick={() => {
              handleSaveEvent();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
