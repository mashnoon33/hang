import { eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek } from "date-fns";
import { CalendarHeader } from "../CalendarHeader";
import { useCalendar } from "../CalendarProvider";
interface MonthViewProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function MonthView({ selectedDate, onDateSelect }: MonthViewProps) {
  const { events } = useCalendar();

  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // Filter and organize events by date

  return (
    <div className="flex-grow flex flex-col">
      <CalendarHeader />
      <div className="flex-grow grid grid-cols-7 grid-rows-6 gap-px bg-gray-200">
      {/* Month header */}
      {/* <div className="flex items-center justify-center mb-4">
        <h2 className="text-xl font-semibold">
          {format(selectedDate, "MMMM yyyy")}
        </h2>
      </div> */}

      {/* Week day headers */}
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div
          key={day}
          className="bg-white p-2 text-sm font-medium text-gray-500"
        >
          {day}
        </div>
      ))}

      {/* Calendar grid */}
      {days.map((day) => {
        const dateKey = format(day, "yyyy-MM-dd");
        const dayEvents = events[dateKey] ?? [];
        
        return (
          <div
            key={day.toISOString()}
            className={`bg-white p-2 min-h-[100px] ${
              !isSameMonth(day, monthStart)
                ? "text-gray-400"
                : "text-gray-900"
            } ${
              isSameDay(day, selectedDate)
                ? "bg-blue-50"
                : ""
            }`}
            onClick={() => onDateSelect(day)}
          >
            <div className="font-medium">{format(day, "d")}</div>
            <div className="space-y-1 mt-1">
              {dayEvents.map((event) => (
                <div
                  key={event.uid}
                  className="text-xs p-1 bg-blue-100 rounded truncate"
                  title={event.summary}
                >
                  {format(new Date(event.start), "HH:mm")} {event.summary}
                </div>
              ))}
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
} 