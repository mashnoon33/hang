"use client";

import { useCal } from "./calendar-provider";
import { EventDetail } from "./event-detail";
import { MobileMonth } from "./mobile";
import { MonthView } from "./month";
import { WeekView } from "./week";


export function CalendarView() {
  const {
    selectedDate,
    currentView,
    handleDateSelect,
    handleTimeSlotSelect,
    showEventDetail,
  } = useCal();

  if (showEventDetail) {
    return <EventDetail />;
  }

  return (
    <div className="flex h-full w-full flex-col">
      {currentView === "week" && (
        <WeekView
          selectedDate={selectedDate}
          onTimeSlotSelect={handleTimeSlotSelect}
        />
      )}
      {currentView === "3day" && (
        <WeekView
          selectedDate={selectedDate}
          onTimeSlotSelect={handleTimeSlotSelect}
        />
      )}
      {currentView === "month" && (
        <MonthView
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />
      )}
      {currentView === "mobile-month" && (
        <MobileMonth />
      )}
    </div>
  );
}
