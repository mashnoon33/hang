"use client";


import { api } from "@/trpc/react";

export function Schedule() {
  const [schedule] = api.schedule.getSchedule.useSuspenseQuery();

  return (
    <div className="w-full  bg-white">
      {schedule ? (
        <pre className="whitespace-pre-wrap">{JSON.stringify(schedule, null, 2)}</pre>
      ) : (
        <p>No schedule available.</p>
      )}
    </div>
  );
}
