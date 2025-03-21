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

export function organizeEventsById(events: CalendarResponse) {
  return Object.values(events)
    .filter(isCalendarEvent)
    .reduce((acc: Record<string, VEvent>, event) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      acc[event.uid] = event;
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



export interface CalendarSlotMetadata {
  capacity: number,
  tags: string[]
  type: 'a' | 'u'
  description: string
}

// 


// capacity:6 \n
// tags:dinner, hang, 
export function parseDescription(text: string): Partial<CalendarSlotMetadata> {
  const event: Partial<CalendarSlotMetadata> = {}
  try {
    const lines = text.split("\n")
    lines.forEach(line => {
      // search for key: val
      const [k, v] = line.split(":")
      switch (k) {
        case 'capacity':

          event.capacity = parseInt(v ?? '')
          break;
        case 'tags':

          event.tags = (v ?? '').split(',')
          break;
        case 'type':
          event.type = (v?.trim().toLowerCase() === 'u' ? 'u' : 'a');
          break;
        case 'd':
          event.description = v ?? '';
          break;
        default:
          break;
      }
    })
    return event
  } catch {
    return event
  }
}