import React, { useEffect } from 'react';
import style from './left.module.css';
import { useNavigate } from 'react-router-dom';

export default function Left() {
  const navigate = useNavigate();

  const handleWindowNavigation = (windowName) => {
    window.electron.ipcRenderer.sendMessage(`navigate`, windowName);
  };

  useEffect(() => {
    window.electron.ipcRenderer.on('navigate_to', (arg) => {
      navigate(`/${arg}`);
    });
  });
  return (
    <>
      <div className={style.buttons_group}>
        <button>Main</button>
      </div>
      <div className={style.buttons_group}>
        <button
          onClick={() => {
            handleWindowNavigation('palet');
          }}
        >
          PALET
        </button>
        <button
          onClick={() => {
            handleWindowNavigation('pypas');
          }}
        >
          PARAM
        </button>
        <button>PYPAS</button>
        <button>L-776</button>
        <button>LINES</button>
      </div>
      <div className={style.buttons_group}>
        <button>VIDEO</button>
      </div>
      <div className={style.buttons_group}>
        <button>EXTRN</button>
        <button>RULER</button>
        <button>VECT</button>
        <button>TRALL</button>
        <button>SELECT</button>
        <button>CTRL.</button>
      </div>
      <div className={style.buttons_group}>
        <button>ZOOM</button>
        <button>CNTR</button>
        <button>GRID</button>
        <button>10KM</button>
        <button>INP V</button>
        <button>OUT V</button>
        <button>RADAR STATUS</button>
      </div>
    </>
  );
}
