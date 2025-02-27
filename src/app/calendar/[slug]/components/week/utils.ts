import { addDays, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

export const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function getWeekDays(selectedDate: Date, viewType: "week" | "3day" = "week") {
  if (viewType === "3day") {
    const start = selectedDate;
    const end = addDays(selectedDate, 2);
    return eachDayOfInterval({ start, end });
  }
  
  const weekStart = startOfWeek(selectedDate);
  const weekEnd = endOfWeek(selectedDate);
  return eachDayOfInterval({ start: weekStart, end: weekEnd });
}

