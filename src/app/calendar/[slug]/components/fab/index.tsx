
import { CalendarModeToggle } from "./mode-toggle";

import React from 'react';
import { FABNavigate } from "./navigate";
import { useCalendar } from "../CalendarProvider";
import { FabClose, FabRSVP } from "./cta";
import { X } from "lucide-react";
export function FloatingActionButtonBarWrapper({ children }: { children: React.ReactNode }) {
  const { handlePrevious, handleNext, showEventDetail, setShowEventDetail } = useCalendar();

  return (
    <div className={`fixed bottom-4 ${showEventDetail ? 'left-1/2 transform -translate-x-1/2' : 'right-4'} gap-2 flex flex-row items-end md:hidden`}>
      {children}
    </div>
  );
}

export function FloatingActionButtonBar() {
  const { handlePrevious, handleNext, showEventDetail, setShowEventDetail } = useCalendar();
  return (
    <FloatingActionButtonBarWrapper>
      {showEventDetail ? <FabRSVP onClick={() => setShowEventDetail(!showEventDetail)} /> :
        <>
        <FabClose onClick={() => setShowEventDetail(!showEventDetail)} />
          <CalendarModeToggle />
          <FABNavigate direction="left" onClick={handlePrevious} />
          <FABNavigate direction="right" onClick={handleNext} />

        </>}

    </FloatingActionButtonBarWrapper>
  );
}