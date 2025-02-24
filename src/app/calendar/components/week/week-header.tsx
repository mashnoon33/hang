import { format, isSameDay } from "date-fns";

interface DayHeaderProps {
  day: Date;
}

function DayHeader({ day }: DayHeaderProps) {
  const isToday = isSameDay(day, new Date());
  return (
    <div className={`bg-white p-2 text-center ${isToday ? "text-blue-500 font-bold" : ""}`}>
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
  return (
    <div className="grid grid-cols-8 border-b border-gray-200">
      <div className="bg-white w-20" />
      {days.map((day) => (
        <DayHeader key={day.toISOString()} day={day} />
      ))}
    </div>
  );
} 