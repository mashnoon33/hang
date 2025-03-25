import { type VEvent } from "node-ical";
import { isPast } from "date-fns";
import { EventCard } from "./event-card";

interface EventListProps {
  events: VEvent[];
  periodLabel: string;
  onEventClick: (event: VEvent) => void;
}

export function EventList({ events, periodLabel, onEventClick }: EventListProps) {
  return (
    <div className="overflow-y-auto pb-[200px]">
      {!events.length && (
        <div className="mt-20 text-center text-gray-500">
          No events for {periodLabel}
        </div>
      )}
      {events.map((event) => (
        <div
          key={event.uid}
          className="border-b border-gray-200"
          data-event-date={event.start}
        >
          <EventCard
            oldEvent={isPast(new Date(event.end))}
            onClick={() => onEventClick(event)}
            event={event}
            selectable={true && !isPast(new Date(event.end))}
          />
        </div>
      ))}
    </div>
  );
} 