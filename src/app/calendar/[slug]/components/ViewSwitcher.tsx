import { Calendar, CalendarRange, CalendarDays } from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { CalendarView } from "./CalendarProvider";
interface ViewSwitcherProps {
  currentView: CalendarView;
  onViewChange: (view: CalendarView) => void;
}

export function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  return (
    <ToggleGroup className="hidden md:flex" type="single" value={currentView} onValueChange={onViewChange}>
      <ToggleGroupItem value="month" aria-label="Toggle month view">
        <Calendar className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="3day" aria-label="Toggle 3-day view">
        <CalendarRange className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="week" aria-label="Toggle week view">
        <CalendarDays className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}