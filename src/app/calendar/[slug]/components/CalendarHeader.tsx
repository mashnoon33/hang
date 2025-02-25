"use client";

import { useCalendar } from "./CalendarProvider";
import { ViewSwitcher } from "./ViewSwitcher";


export function CalendarHeader() {
    const { periodLabel, handleToday, handlePrevious, handleNext, currentView, setCurrentView } = useCalendar();

    return (
        <div className="flex items-center justify-between m-6">
            <div className="flex items-center gap-4" id="calendar-header">
                <button
                    onClick={handleToday}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Today
                </button>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handlePrevious}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={handleNext}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <span className="text-xl font-semibold text-gray-900 min-w-[200px]">
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
