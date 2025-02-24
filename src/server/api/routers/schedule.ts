import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import ical, { CalendarResponse, VEvent } from "node-ical";

import { format } from "date-fns";

export const scheduleRouter = createTRPCRouter({
    getSchedule: publicProcedure.query(async () => {
        const data = await ical.async.fromURL(env.PRIVATE_ICAL_URL);
        return organizeEventsByDate(data);
    }),
});


function organizeEventsByDate(events: CalendarResponse) {
    return Object.values(events)
      .filter(isCalendarEvent)
      .reduce((acc: Record<string, VEvent[]>, event) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        const dateKey = format(event.start, "yyyy-MM-dd");
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        acc[dateKey].push(event);
        return acc;
      }, {});
  }
  
  

  function isCalendarEvent(event: unknown): event is VEvent {
    return typeof event === 'object' && 
           event !== null && 
           'type' in event && 
           // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
           (event as any).type === 'VEVENT';
  } 