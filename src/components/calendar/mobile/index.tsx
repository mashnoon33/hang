"use client";

import { TopNav } from "@/components/top-nav";
import { StaticHeaderScrollBody } from "@/components/ui/static-header-scroll-body";
import { VEvent } from "node-ical";
import { useEffect, useMemo, useRef, useState } from "react";
import { EventDialog } from "../../modals/rsvp";
import { useCal } from "../calendar-provider";
import { CalendarGrid } from "./calendar-grid";
import { EventList } from "./event-list";
import { filterAndSortEvents, findClosestEvent, scrollToEventDate } from "./utils";


export function MobileMonth() {
  const { selectedDate, setSelectedDate, calendar, periodLabel } = useCal();
  const eventsRef = useRef<HTMLDivElement | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<VEvent | null>(null);

  const events = useMemo(
    () => filterAndSortEvents(calendar, selectedDate),
    [calendar, selectedDate]
  );

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setTimeout(() => scrollToEventDate(eventsRef, date), 100); // Delay to ensure DOM updates
  };

  useEffect(() => {
    const closestEvent = findClosestEvent(events);
    if (closestEvent) {
      scrollToEventDate(eventsRef, new Date(closestEvent.start));
    }
  }, [events]);

  const handleEventClick = (event: VEvent) => {
    setSelectedEvent(event);
    setIsEventDialogOpen(true);
  };

  return (
    <StaticHeaderScrollBody className="flex h-dvh flex-col">
      <div className="mb-1 pb-4 shadow-md">
        <TopNav />
        <CalendarGrid handleDayClick={handleDayClick} events={events} />
      </div>
      <EventList
        events={events}
        periodLabel={periodLabel}
        onEventClick={handleEventClick}
      />
      {selectedEvent && (
        <EventDialog
          isOpen={isEventDialogOpen}
          event={selectedEvent}
          onClose={() => setIsEventDialogOpen(false)}
        />
      )}
    </StaticHeaderScrollBody>
  );
}
