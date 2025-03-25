"use client";
import { format } from "date-fns";
import { useEffect, useState } from "react";

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
  const currentTimePosition =
    ((currentHour * 60 + currentMinutes) / (24 * 60)) * 100;

  return (
    <>
      <span
        style={{ left: "-4rem", top: `calc(${currentTimePosition}% - 10px)` }}
        className="absolute w-16 pr-2 text-right text-xs"
      >
        <div className="rounded-lg bg-red-500 p-1 text-white">
          {format(new Date().setHours(currentHour), "h:mm")}
        </div>
      </span>
      <div
        className="absolute left-0 flex w-full items-center"
        style={{ top: `${currentTimePosition}%` }}
      >
        <div className="h-0.5 w-full bg-red-500"></div>
      </div>
    </>
  );
}
