import { format } from "date-fns";
import { CalendarResponse, VEvent } from "node-ical";

export function organizeEventsByDate(events: CalendarResponse) {
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
