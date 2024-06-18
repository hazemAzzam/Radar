import React, { useState, useEffect } from 'react';
import Map from '../Map/Map';
import style from './home.module.css';
import Nav from '../Nav/Nav';
import Left from '../Left/Left';

export default function Home() {
  return (
    <>
      <div className={style.top}>
        <Nav />
      </div>
      <div className={style.container}>
        <div className={style.left}>
          <Map />
        </div>
        <div className={style.right}>
          <Left />
        </div>
      </div>
    </>
  );
}
