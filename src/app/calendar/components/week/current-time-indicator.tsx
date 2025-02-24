'use client'
import { useEffect, useState } from 'react';

export function CurrentTimeIndicator() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  const currentHour = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentTimePosition = (currentHour * 60 + currentMinutes) / (24 * 60) * 100;

  return (
    <div
      className="absolute left-0 w-full h-0.5 bg-red-500"
      style={{ top: `${currentTimePosition}%` }} />
  );
}
