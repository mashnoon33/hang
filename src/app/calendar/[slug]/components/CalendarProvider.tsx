import { addMonths, addWeeks, endOfWeek, format, startOfWeek } from "date-fns";
import { createContext, useContext, useState, type ReactNode } from "react";
import { api, type RouterOutputs } from "@/trpc/react";
import { useParams } from "next/navigation";


type Calendar = RouterOutputs["schedule"]["getCalendar"];

interface CalendarContextType {
  selectedDate: Date;
  currentView: "month" | "week";
  periodLabel: string;
  calendar: Calendar | undefined;
  setSelectedDate: (date: Date) => void;
  setCurrentView: (view: "month" | "week") => void;
  handleDateSelect: (date: Date) => void;
  handleTimeSlotSelect: (date: Date) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  handleToday: () => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<"month" | "week">("week");
  const { slug } = useParams();

  // Fetch calendar data
  const { data: calendar   } = api.schedule.getCalendar.useQuery({ identifier: slug as string });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotSelect = (date: Date) => {
    setSelectedDate(date);
    // Here you would typically open an event creation modal
  };

  const handlePrevious = () => {
    setSelectedDate((current) => 
      currentView === "month" ? addMonths(current, -1) : addWeeks(current, -1)
    );
  };

  const handleNext = () => {
    setSelectedDate((current) => 
      currentView === "month" ? addMonths(current, 1) : addWeeks(current, 1)
    );
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const periodLabel = currentView === "month"
    ? format(selectedDate, "MMMM yyyy")
    : `${format(startOfWeek(selectedDate), "MMM d")} - ${format(endOfWeek(selectedDate), "MMM d, yyyy")}`;

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        currentView,
        periodLabel,
        calendar,
        setSelectedDate,
        setCurrentView,
        handleDateSelect,
        handleTimeSlotSelect,
        handlePrevious,
        handleNext,
        handleToday,
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