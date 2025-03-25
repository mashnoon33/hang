import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FabEditCalendar, FabRSVP, FabClose, CalendarModeToggle, FABNavigate } from "./buttons";
import { useCal } from "../calendar-provider";


export function FloatingActionButtonBar() {
  const {
    handlePrevious,
    handleNext,
    showEventDetail,
    setShowEventDetail,
    calendar,
  } = useCal();
  const { data: session } = useSession();
  const isOwner = useMemo(
    () => session?.user?.id === calendar?.userId,
    [session, calendar],
  );
  return (
    <FloatingActionButtonBarWrapper>
      {showEventDetail ? (
        <>
          {isOwner && (
            <FabEditCalendar
              onClick={() => setShowEventDetail(!showEventDetail)}
            />
          )}
          <FabRSVP onClick={() => setShowEventDetail(!showEventDetail)} />
        </>
      ) : (
        <>
          <FabClose onClick={() => setShowEventDetail(!showEventDetail)} />
          <CalendarModeToggle />
          <FABNavigate direction="left" onClick={handlePrevious} />
          <FABNavigate direction="right" onClick={handleNext} />
        </>
      )}
    </FloatingActionButtonBarWrapper>
  );
}

function FloatingActionButtonBarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showEventDetail } = useCal();

  return (
    <div
      className={`fixed bottom-4 ${showEventDetail ? "left-1/2 -translate-x-1/2 transform" : "right-4"} flex flex-row items-end gap-2 md:hidden`}
    >
      {children}
    </div>
  );
}
