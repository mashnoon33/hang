import { format, isSameDay } from "date-fns";
import { useCal } from "../calendar-provider";

interface DayHeaderProps {
  day: Date;
}

function DayHeader({ day }: DayHeaderProps) {
  const isToday = isSameDay(day, new Date());
  return (
    <div
      className={`bg-white p-2 text-center ${isToday ? "font-bold text-blue-500" : ""}`}
    >
      <div className={`font-medium ${isToday ? "text-blue-500" : ""}`}>
        {format(day, "EEE")}
      </div>
      <div className={`text-sm ${isToday ? "text-blue-500" : "text-gray-500"}`}>
        {format(day, "MMM d")}
      </div>
    </div>
  );
}

interface WeekHeaderProps {
  days: Date[];
}

export function WeekHeader({ days }: WeekHeaderProps) {
  const { currentView } = useCal();
  return (
    <div className="flex flex-grow flex-row">
      <div className="h-14 w-14 flex-shrink-0" />
      <div
        className={`grid ${currentView === "3day" ? "grid-cols-3" : "grid-cols-7"} flex-grow`}
      >
        {days.map((day) => (
          <DayHeader key={day.toISOString()} day={day} />
        ))}
      </div>
    </div>
  );
}
