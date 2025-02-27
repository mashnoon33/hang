'use client'
import { format } from 'date-fns';
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
    <>
      <span style={{ left: "-4rem", top: `calc(${currentTimePosition}% - 10px)` }} className="text-xs w-16 text-right absolute pr-2 ">
        <div className="bg-red-500 text-white rounded-lg p-1">
          {format(new Date().setHours(currentHour), "h:mm a")}
        </div>
      </span>
      <div
        className="absolute left-0 w-full flex items-center"
        style={{ top: `${currentTimePosition}%` }}>
        <div className="w-full h-0.5 bg-red-500"></div>
      </div>
    </>
  )
}