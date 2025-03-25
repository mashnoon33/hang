"use client";

import { parseDescription } from "@/lib/ical";
import {
    addWeeks,
    format,
    isSameDay,
    isSameWeek,
} from "date-fns";
import { VEvent } from "node-ical";
import { Calendar } from "../calendar-provider";

export function filterAndSortEvents(calendar: Calendar | undefined, selectedDate: Date): VEvent[] {
  if (!calendar) return [];
  
  return Object.values(calendar.events)
    .flat()
    .filter(
      (event) =>
        (isSameWeek(new Date(event.start), selectedDate) ||
          isSameWeek(new Date(event.start), addWeeks(selectedDate, 1))) &&
        parseDescription(event.description)?.type !== "u",
    )
    .sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
    );
}

export function findClosestEvent(events: VEvent[]): VEvent | null {
  if (events.length === 0) return null;
  
  const today = new Date();
  let closestEvent = events[0];
  let minDiff = Math.abs(
    new Date(events[0]?.start ?? "").getTime() - today.getTime(),
  );

  events.forEach((event) => {
    const eventDate = new Date(event.start);
    const diff = Math.abs(eventDate.getTime() - today.getTime());
    if (diff < minDiff) {
      closestEvent = event;
      minDiff = diff;
    }
  });

  return closestEvent ?? null;
}

export function scrollToEventDate(containerRef: React.RefObject<HTMLDivElement>, date: Date) {
  if (!containerRef.current) return;

  const eventElements = 
    containerRef.current.querySelectorAll("[data-event-date]");
  let found = false;
  
  eventElements.forEach((eventElement) => {
    if (
      !found &&
      isSameDay(
        new Date(eventElement.getAttribute("data-event-date") ?? ""),
        date,
      )
    ) {
      eventElement.scrollIntoView({ behavior: "smooth" });
      found = true;
    }
  });
  
  if (!found) {
    console.log(`No events found for date: ${format(date, "yyyy-MM-dd")}`);
  }
}