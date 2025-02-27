
import { CalendarModeToggle } from "./mode-toggle";

import React from 'react';
import { FABNavigate } from "./navigate";
import { useCalendar } from "../CalendarProvider";

export function FloatingActionButtonBarWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="fixed bottom-4 right-4 gap-2 flex flex-row  items-end md:hidden ">
            {children}
        </div>
    );
}

export function FloatingActionButtonBar() {
    const { handlePrevious, handleNext } = useCalendar();
    return (
        <FloatingActionButtonBarWrapper>
            <CalendarModeToggle />
            <FABNavigate direction="left" onClick={handlePrevious} />
            <FABNavigate direction="right" onClick={handleNext} />
        </FloatingActionButtonBarWrapper>
    );
}