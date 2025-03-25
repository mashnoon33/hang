"use client";

import { Button } from "@/components/ui/button";
import { Calendar, List, Menu, X } from "lucide-react";
import { useState } from "react";
import { type CalendarView, useCal } from "../../calendar-provider";
import { CircularFab } from "./wrapper";

export function CalendarModeToggle() {
  const { setCurrentView } = useCal();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleViewChange = (view: CalendarView) => {
    setCurrentView(view);
    setIsExpanded(false);
  };

  return (
    <div className="relative flex flex-col items-end space-y-2">
      {isExpanded && (
        <div className="absolute bottom-20 right-0 flex flex-col gap-2">
          <Button
            onClick={() => handleViewChange("mobile-month")}
            className="flex h-12 items-center justify-center rounded-full bg-slate-800 text-white shadow-lg"
          >
            <Calendar className="w- h-6" />
            <span className="text-sm">Month</span>
          </Button>
          <Button
            onClick={() => handleViewChange("week")}
            className="flex h-12 items-center justify-center rounded-full bg-slate-800 text-white shadow-lg"
          >
            <List className="h-6 w-6" />
            <span className="text-sm">Week</span>
          </Button>
          <Button
            onClick={() => handleViewChange("3day")}
            className="flex h-12 items-center justify-center rounded-full bg-slate-800 text-white shadow-lg"
          >
            <List className="h-6 w-6" />
            <span className="text-sm">3 Day</span>
          </Button>
        </div>
      )}
      <CircularFab onClick={toggleExpand}>
        {isExpanded ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
      </CircularFab>
    </div>
  );
}
