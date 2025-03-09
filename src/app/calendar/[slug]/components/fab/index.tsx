
import { CalendarModeToggle } from "./mode-toggle";

import React, { useMemo } from 'react';
import { useCalendar } from "../CalendarProvider";
import { FabClose, FabEditCalendar, FabRSVP } from "./cta";
import { FABNavigate } from "./navigate";
import { useSession } from "next-auth/react";
export function FloatingActionButtonBarWrapper({ children }: { children: React.ReactNode }) {
  const { handlePrevious, handleNext, showEventDetail, setShowEventDetail } = useCalendar();

  return (
    <div className={`fixed bottom-4 ${showEventDetail ? 'left-1/2 transform -translate-x-1/2' : 'right-4'} gap-2 flex flex-row items-end md:hidden`}>
      {children}
    </div>
  );
}

export function FloatingActionButtonBar() {
  const { handlePrevious, handleNext, showEventDetail, setShowEventDetail, calendar } = useCalendar();
  const { data: session } = useSession();
  const isOwner = useMemo(() => session?.user?.id === calendar?.userId, [session, calendar]);
  return (
    <FloatingActionButtonBarWrapper>
      {showEventDetail ? <>
        {isOwner && <FabEditCalendar onClick={() => setShowEventDetail(!showEventDetail)} />}
        <FabRSVP onClick={() => setShowEventDetail(!showEventDetail)} />
      </> :
        <>

          <FabClose onClick={() => setShowEventDetail(!showEventDetail)} />
          <CalendarModeToggle />
          <FABNavigate direction="left" onClick={handlePrevious} />
          <FABNavigate direction="right" onClick={handleNext} />

        </>}

    </FloatingActionButtonBarWrapper>
  );
}