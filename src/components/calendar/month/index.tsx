import {
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek,
  } from "date-fns";
  import { useCal } from "../calendar-provider";
  import { CalendarHeader } from "../header";
  interface MonthViewProps {
    selectedDate: Date;
    onDateSelect: (date: Date) => void;
  }
  
  export function MonthView({ selectedDate, onDateSelect }: MonthViewProps) {
    const { calendar } = useCal();
  
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(monthStart);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
  
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  
    return (
      <div className="flex flex-grow flex-col">
        <CalendarHeader />
        <div className="grid flex-grow grid-cols-7 grid-rows-6 gap-px bg-gray-200">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="bg-white p-2 text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
  
          {days.map((day) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const dayEvents = calendar?.events[dateKey] ?? [];
  
            return (
              <div
                key={day.toISOString()}
                className={`min-h-[100px] bg-white p-2 ${!isSameMonth(day, monthStart)
                    ? "text-gray-400"
                    : "text-gray-900"
                  } ${isSameDay(day, selectedDate) ? "bg-blue-50" : ""}`}
                onClick={() => onDateSelect(day)}
              >
                <div className="font-medium">{format(day, "d")}</div>
                <div className="mt-1 space-y-1">
                  {dayEvents.map((event) => (
                    <div
                      key={event.uid}
                      className="truncate rounded bg-blue-100 p-1 text-xs"
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
  