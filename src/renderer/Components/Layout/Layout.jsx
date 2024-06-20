import React from 'react';
import { Outlet } from 'react-router-dom';
import style from './layout.module.css';
export default function Layout() {
  return (
    <>
      <div className={style.container}>
        <Outlet />
      </div>
    </>
  );
}
