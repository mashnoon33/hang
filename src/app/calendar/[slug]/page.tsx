"use client";

import { MobileMonth, MonthView } from "./components/month";
import { WeekView } from "./components/week";
import { useCalendar } from "./components/CalendarProvider";
import { useParams } from "next/navigation";
import { useViewportWidth } from "@/lib/hooks/use-viewport-width";
export default function Calendar() {
  const {
    selectedDate,
    currentView,
    handleDateSelect,
    handleTimeSlotSelect,
  } = useCalendar();
  const { size } = useViewportWidth();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow flex flex-col">
        {currentView === "month" ? (
          size === "sm" ? (
            <MobileMonth />
          ) : (
            <MonthView
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
          )
        ) : (
          <WeekView
            selectedDate={selectedDate}
            onTimeSlotSelect={handleTimeSlotSelect}
          />
        )}
      </div>
    </div>
  );
}