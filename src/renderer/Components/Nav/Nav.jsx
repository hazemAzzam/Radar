import React, { useState, useEffect } from 'react';
import style from './nav.module.css';

export default function Nav() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleString();
  return (
    <>
      <p class={style.time}>{formattedTime}</p>
    </>
  );
}
