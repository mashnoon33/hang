"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useCal } from "../calendar-provider";
import { ViewSwitcher } from "../view-switcher";
import { NavigationButton, TodayButton } from "./buttons";

export function CalendarHeader() {
  const {
    periodLabel,
    handleToday,
    handlePrevious,
    handleNext,
    currentView,
    setCurrentView,
  } = useCal();

  return (
    <div
      className="flex h-14  items-center justify-between border-b border-gray-200 p-4 mt-2 sm:pt-2"
      id="calendar-header"
    >
      <div className="flex w-full items-center gap-2 sm:gap-1">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <div className="hidden items-center gap-1 md:flex">
            <NavigationButton onClick={handlePrevious} direction="previous" />
            <NavigationButton onClick={handleNext} direction="next" />
          </div>
          <TodayButton onClick={handleToday} />
          <span className="min-w-[150px] text-sm font-semibold text-gray-900 sm:min-w-[100px]">
            {periodLabel}
          </span>
        </div>
      </div>
      <ViewSwitcher currentView={currentView} onViewChange={setCurrentView} />
    </div>
  );
}
