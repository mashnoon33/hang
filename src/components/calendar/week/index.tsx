import { format } from "date-fns";
import { useCal } from "../calendar-provider";
import { CurrentTimeIndicator } from "./current-time-indicator";
import { DayColumn } from "./day-colmn";
import { TimeColumn } from "./time-column";
import { getWeekDays } from "./utils";
import { WeekHeader } from "./week-header";
import { CalendarHeader } from "../header";
import { StaticHeaderScrollBody } from "@/components/ui/static-header-scroll-body";
import { TopNav } from "@/components/top-nav";

interface WeekViewProps {
  selectedDate: Date;
  onTimeSlotSelect: (date: Date) => void;
}

export function WeekView({ selectedDate, onTimeSlotSelect }: WeekViewProps) {
  const { calendar, currentView } = useCal();
  const days = getWeekDays(
    selectedDate,
    currentView === "3day" ? "3day" : "week",
  );

  return (
    <StaticHeaderScrollBody className="flex h-dvh flex-grow flex-col">
      <div>
        <div className="md:hidden">
          <TopNav />
        </div>
        <div className="overflow-x-auto bg-white">
          <CalendarHeader />
        </div>
        <div className="overflow-x-auto border-b border-gray-200 bg-white">
          <WeekHeader days={days} />
        </div>
      </div>
      <div className="flex  flex-row">
        <TimeColumn />
        <div
          className={`grid flex-grow ${currentView === "3day" ? "grid-cols-3" : "grid-cols-7"} relative gap-px bg-gray-200`}
        >
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
    </StaticHeaderScrollBody>
  );
}
