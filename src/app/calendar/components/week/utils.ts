import { eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

export const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function getWeekDays(selectedDate: Date) {
  const weekStart = startOfWeek(selectedDate);
  const weekEnd = endOfWeek(selectedDate);
  return eachDayOfInterval({ start: weekStart, end: weekEnd });
}

