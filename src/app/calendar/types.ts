import type ical from "node-ical";

export type CalendarEvent =  Record<string, ical.VEvent[]>;
