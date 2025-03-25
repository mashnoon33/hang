import { VEvent } from "node-ical";
import { format, startOfWeek, addWeeks, endOfWeek, eachDayOfInterval } from "date-fns";
import { useCal } from "../calendar-provider";
import { DayCell } from "./day-cell";

interface CalendarGridProps {
  handleDayClick: (date: Date) => void;
  events: VEvent[];
}

export function CalendarGrid({ handleDayClick, events }: CalendarGridProps) {
  const { periodLabel, selectedDate } = useCal();

  const currentWeekStart = startOfWeek(selectedDate);
  const nextWeekStart = addWeeks(currentWeekStart, 1);
  const nextWeekEnd = endOfWeek(nextWeekStart);

  const days = eachDayOfInterval({ start: currentWeekStart, end: nextWeekEnd });
  const daysWithEvents = new Set(
    events.map((event) => format(new Date(event.start), "yyyy-MM-dd")),
  );

  const dayOfWeekHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="ml-4 flex items-center">
        <h2 className="font-semibold">{periodLabel}</h2>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {dayOfWeekHeaders.map((day, i) => (
          <div key={i} className="text-center text-xs text-gray-700">
            {day}
          </div>
        ))}
        {days.map((day, i) => (
          <DayCell
            key={i + dayOfWeekHeaders.length}
            day={day}
            daysWithEvents={daysWithEvents}
            handleDayClick={handleDayClick}
          />
        ))}
      </div>
    </div>
  );
} 