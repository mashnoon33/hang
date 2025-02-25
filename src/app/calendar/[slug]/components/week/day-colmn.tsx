import { VEvent } from "node-ical";
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import { Event } from "./event-card";
import { HOURS } from "./utils";
import { isSameDay } from "date-fns";
interface TimeSlotProps {
  day: Date;
  hour: number;
  onTimeSlotSelect: (date: Date) => void;
  isToday: boolean;
  isWeekend: boolean;
}

function TimeSlot({ day, hour, onTimeSlotSelect, isToday, isWeekend }: TimeSlotProps) {
  return (
    <div
      className={`h-12 border-b  ${isWeekend ? "bg-gray-50 border-gray-200" : ""} ${isToday ? "bg-blue-50 border-blue-100" : ""} `}
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

function isWeekend(day: Date) {
  return day.getDay() === 0 || day.getDay() === 6;
}

export function DayColumn({ day, events, onTimeSlotSelect }: DayColumnProps) {
  const isToday = isSameDay(day, new Date());
  const isTodayWeekend = isWeekend(day);
  return (
    <div className="bg-white relative">
      {HOURS.map((hour) => (
        <TimeSlot key={hour} day={day} hour={hour} onTimeSlotSelect={onTimeSlotSelect} isToday={isToday} isWeekend={isTodayWeekend} />
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