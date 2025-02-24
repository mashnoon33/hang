import { format } from "date-fns";
import { VEvent } from "node-ical";

interface EventProps {
  event: VEvent;
}

export function Event({ event }: EventProps) {
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);
  const startHour = startDate.getHours() + startDate.getMinutes() / 60;
  const endHour = endDate.getHours() + endDate.getMinutes() / 60;
  const top = `${startHour * 48}px`;
  const height = `${(endHour - startHour) * 48}px`;

  return (
    <div
      className="absolute left-0 right-0 mx-1 bg-blue-100 rounded p-1 text-xs overflow-hidden"
      style={{ top, height }}
      title={`${event.summary}\n${format(startDate, "h:mm a")} - ${format(endDate, "h:mm a")}`}
    >
      <div className="font-medium truncate">{event.summary}</div>
      <div className="text-gray-600">
        {format(startDate, "h:mm a")}
      </div>
    </div>
  );
} 