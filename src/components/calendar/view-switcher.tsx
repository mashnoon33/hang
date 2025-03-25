import { Calendar, CalendarRange, CalendarDays } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { type CalendarView } from "./calendar-provider";
interface ViewSwitcherProps {
  currentView: CalendarView;
  onViewChange: (view: CalendarView) => void;
}

export function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  return (
    <ToggleGroup
      className="hidden md:flex"
      type="single"
      value={currentView}
      onValueChange={onViewChange}
    >
      <ToggleGroupItem value="month" aria-label="Toggle month view" className="flex-none items-center gap-2">
        <Calendar className="h-4 w-4" />
        Month
      </ToggleGroupItem>
      <ToggleGroupItem value="week" aria-label="Toggle week view" className="flex-none items-center gap-2">
        <CalendarDays className="h-4 w-4" />
        Week
      </ToggleGroupItem>
      <ToggleGroupItem value="3day" aria-label="Toggle 3-day view" className="flex-none items-center gap-2">
        <CalendarRange className="h-4 w-4" />
        3 Day
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
