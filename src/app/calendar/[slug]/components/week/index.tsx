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
  const { calendar, currentView } = useCalendar();
  const days = getWeekDays(selectedDate, currentView === "3day" ? "3day" : "week");

  return (
    <div className="flex-grow flex flex-col  ">
      <div className="sticky top-0  z-10 bg-white  overflow-x-auto">
        <CalendarHeader />
      </div>
      <div className="sticky top-14 z-10 bg-white border-b border-gray-200  overflow-x-auto">
        <WeekHeader days={days} />
      </div>
      <div className="flex-grow flex flex-row">
        <TimeColumn />

        <div className={`flex-grow grid ${currentView === "3day" ? "grid-cols-3" : "grid-cols-7"} gap-px bg-gray-200 relative`}>
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
    </div>
  );
}
