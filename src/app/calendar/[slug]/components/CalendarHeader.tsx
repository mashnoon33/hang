"use client";

import { useCalendar } from "./CalendarProvider";
import { ViewSwitcher } from "./ViewSwitcher";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useViewportWidth } from "@/lib/hooks/use-viewport-width";
export function CalendarHeader() {
    const { periodLabel, handleToday, handlePrevious, handleNext, currentView, setCurrentView } = useCalendar();

    return (
        <div className="flex items-center h-14 justify-between p-4 sm:pt-2 border-b border-gray-200" id="calendar-header">
            <div className="flex items-center gap-2 sm:gap-1  w-full">
                <div className="flex items-center gap-2">
                <SidebarTrigger />

                    <div className=" items-center gap-1 hidden md:flex">
                        <button
                            onClick={handlePrevious}
                            className="p-3 text-gray-600 hover:bg-gray-100 rounded-full"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-3 text-gray-600 hover:bg-gray-100 rounded-full"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>

                    </div>
                    <button
                        onClick={handleToday}
                        className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Today
                    </button>
                    <span className="text-sm font-semibold text-gray-900 min-w-[150px] sm:min-w-[100px]">
                        {periodLabel}
                    </span>
                </div>
            </div>
            <ViewSwitcher
                currentView={currentView}
                onViewChange={setCurrentView} />
        </div>
    );
}
