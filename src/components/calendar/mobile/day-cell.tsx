import { format, isSameDay, isAfter } from "date-fns";
import { useCal } from "../calendar-provider";
import { useMemo } from "react";

const today = new Date();

interface DayCellProps {
  day: Date;
  daysWithEvents: Set<string>;
  handleDayClick: (date: Date) => void;
}

export function DayCell({ day, daysWithEvents, handleDayClick }: DayCellProps) {
  const { selectedDate } = useCal();
  const dateString = format(day, "yyyy-MM-dd");
  const hasEvents = daysWithEvents.has(dateString);
  const todayAndFuture = isSameDay(day, today) || isAfter(day, today);
  const shouldHighlight = hasEvents && todayAndFuture;
  const isSelected = useMemo(
    () => isSameDay(day, selectedDate),
    [day, selectedDate],
  );

  const highlightClass = shouldHighlight
    ? isSelected
      ? "bg-blue-700 font-bold text-white"
      : "bg-blue-200 font-bold text-blue-700"
    : "text-gray-500";

  return (
    <button
      disabled={!hasEvents}
      onClick={() => handleDayClick(day)}
      className={`h-10 w-10 justify-self-center rounded-full p-2 ${highlightClass}`}
    >
      {format(day, "d")}
    </button>
  );
} 