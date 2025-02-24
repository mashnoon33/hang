"use client";

import { MonthView } from "./components/month";
import { WeekView } from "./components/week";
import { useCalendar } from "./components/CalendarProvider";

function CalendarContent() {
  const {
    selectedDate,
    currentView,
    handleDateSelect,
    handleTimeSlotSelect,
  } = useCalendar();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow flex flex-col">
        {currentView === "month" ? (
          <MonthView
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
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

export default function CalendarPage() {
  return <CalendarContent />;
} 