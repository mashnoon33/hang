import { format } from "date-fns";
import { CalendarHeader } from "../CalendarHeader";
import { useCalendar } from "../CalendarProvider";
import { CurrentTimeIndicator } from "./current-time-indicator";
import { DayColumn } from "./day-colmn";
import { TimeColumn } from "./time-column";
import { getWeekDays } from "./utils";
import { WeekHeader } from "./week-header";

interface WeekViewProps {
  selectedDate: Date;
  onTimeSlotSelect: (date: Date) => void;
}

export function WeekView({ selectedDate, onTimeSlotSelect }: WeekViewProps) {
  const { calendar } = useCalendar();
  const days = getWeekDays(selectedDate);

  return (
    <div className="flex-grow flex flex-col  ">
      <div className="sticky top-0 z-10 bg-white">
        <CalendarHeader />
        <WeekHeader days={days} />
      </div>
      <div className="flex-grow grid grid-cols-8 gap-px bg-gray-200 relative">
        <TimeColumn />
        {days.map((day) => (
          <DayColumn
            key={day.toISOString()}
            day={day}
            events={calendar?.events[format(day, "yyyy-MM-dd")] ?? []}
            onTimeSlotSelect={onTimeSlotSelect}
          />
        ))}
        <CurrentTimeIndicator />
      </div>
    </div>
  );
}
