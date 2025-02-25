import { addDays, addMonths, addWeeks, endOfWeek, format, startOfWeek } from "date-fns";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { api, type RouterOutputs } from "@/trpc/react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useViewportWidth } from "@/lib/hooks/use-viewport-width";

export type Calendar = RouterOutputs["schedule"]["getCalendar"];
export type CalendarView = "month" | "mobile-month" | "week" | "3day";
interface CalendarContextType {
  selectedDate: Date;
  currentView: CalendarView;
  periodLabel: string;
  calendar: Calendar | undefined;
  rsvps: RouterOutputs["rsvp"]["getAllRsvps"] | undefined;
  setSelectedDate: (date: Date) => void;
  setCurrentView: (view: CalendarView) => void;
  handleDateSelect: (date: Date) => void;
  handleTimeSlotSelect: (date: Date) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  handleToday: () => void;
  refetchRsvps: () => Promise<void>;
  showEventDetail: boolean;
  setShowEventDetail: (show: boolean) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function CalendarProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const { size } = useViewportWidth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<CalendarView>(size === "sm" ? "mobile-month" : "week");
  const { slug } = useParams();
  const [showEventDetail, setShowEventDetail] = useState(true);
  // Fetch calendar data
  const { data: calendar } = api.schedule.getCalendar.useQuery({ identifier: slug as string }, { enabled: status === "authenticated" });
  const { data: rsvps, refetch: refetchRsvps } = api.rsvp.getAllRsvps.useQuery(undefined, { enabled: status === "authenticated" });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotSelect = (date: Date) => {
    setSelectedDate(date);
    // Here you would typically open an event creation modal
  };
  const handlePrevious = () => {
    setSelectedDate((current) => {
      switch (currentView) {
        case "month":
          return addMonths(current, -1);
        case "week":
          return addWeeks(current, -1);
        case "3day":
          return addDays(current, -3); // Adjust this if you want a different behavior for 3day view
        case "mobile-month":
          return addWeeks(current, -2);
        default:
          return current;
      }
    });
  };

  const handleNext = () => {
    setSelectedDate((current) => {
      switch (currentView) {
        case "month":
          return addMonths(current, 1);
        case "week":
          return addWeeks(current, 1);
        case "3day":
          return addDays(current, 3); // Adjust this if you want a different behavior for 3day view
        case "mobile-month":
          return addWeeks(current, 2);
        default:
          return current;
      }
    });
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const periodLabel = useMemo(() => {
    switch (currentView) {
      case "month":
        return format(selectedDate, "MMMM yyyy");
      case "mobile-month":
        return `${format(startOfWeek(selectedDate), "MMM d")} - ${format(endOfWeek(addWeeks(selectedDate, 1)), "MMM d")}`;
      default:
        return `${format(startOfWeek(selectedDate), "MMM d")} - ${format(endOfWeek(selectedDate), "MMM d")}`;
    }
  }, [currentView, selectedDate]);
    

  useEffect(() => {
    if (size === "sm") {
      setCurrentView("mobile-month");
    } else {
      setShowEventDetail(false);
      // dont do anything for now
    }
  }, [size]);

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        currentView,
        periodLabel,
        calendar,
        rsvps,
        setSelectedDate,
        setCurrentView,
        handleDateSelect,
        handleTimeSlotSelect,
        handlePrevious,
        handleNext,
        handleToday,
        // @ts-expect-error refetchRsvps is a promise
        refetchRsvps,
        showEventDetail,
        setShowEventDetail,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
} 