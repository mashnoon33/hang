import { HOURS } from "./utils";
import { Event } from "./event-card";
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import { VEvent } from "node-ical";

interface TimeSlotProps {
  day: Date;
  hour: number;
  onTimeSlotSelect: (date: Date) => void;
}

function TimeSlot({ day, hour, onTimeSlotSelect }: TimeSlotProps) {
  return (
    <div
      className="h-12 border-b border-gray-100"
      onClick={() => {
        const date = new Date(day);
        date.setHours(hour);
        onTimeSlotSelect(date);
      }}
    />
  );
}

interface DayColumnProps {
  day: Date;
  events: VEvent[];
  onTimeSlotSelect: (date: Date) => void;
}

export function DayColumn({ day, events, onTimeSlotSelect }: DayColumnProps) {
  return (
    <div className="bg-white relative">
      {HOURS.map((hour) => (
        <TimeSlot key={hour} day={day} hour={hour} onTimeSlotSelect={onTimeSlotSelect} />
      ))}
      {events.map((event) => (
        <div key={event.uid}>
          {/* @ts-expect-error jsx element ref */}
          <ScrollIntoViewIfNeeded>
            <Event event={event} />
          </ScrollIntoViewIfNeeded>
        </div>
      ))}
    </div>
  );
} 