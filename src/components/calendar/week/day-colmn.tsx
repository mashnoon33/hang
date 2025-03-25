import { type VEvent } from "node-ical";
import ScrollIntoViewIfNeeded from "react-scroll-into-view-if-needed";
import { Event } from "./event-card";
import { HOURS } from "./utils";
import { isSameDay } from "date-fns";
import { TimeSlot } from "./time-slot";


interface DayColumnProps {
  day: Date;
  events: VEvent[];
  onTimeSlotSelect: (date: Date) => void;
}

function isWeekend(day: Date) {
  return day.getDay() === 0 || day.getDay() === 6;
}

export function DayColumn({ day, events, onTimeSlotSelect }: DayColumnProps) {
  const isToday = isSameDay(day, new Date());
  const isTodayWeekend = isWeekend(day);
  return (
    <div className="relative bg-white">
      {HOURS.map((hour) => (
        <TimeSlot
          key={hour}
          day={day}
          hour={hour}
          onTimeSlotSelect={onTimeSlotSelect}
          isToday={isToday}
          isWeekend={isTodayWeekend}
        />
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
