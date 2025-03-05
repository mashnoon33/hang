"use client";

import { parseDescription } from "@/lib/ical";
import { eachDayOfInterval, endOfMonth, endOfWeek, format, isAfter, isPast, isSameDay, isSameMonth, startOfMonth, startOfWeek } from "date-fns";
import { VEvent } from "node-ical";
import { useEffect, useRef, useState } from "react";
import { useCalendar } from "../CalendarProvider";
import {EventDialog } from "../week/event-card/dialog";
import { EventCard } from "../week/event-card/dialog/event-card";

export function MobileMonth() {
    const { selectedDate, setSelectedDate, calendar, rsvps } = useCalendar();
    const [events, setEvents] = useState<VEvent[]>([]);
    const calRef = useRef<HTMLDivElement | null>(null);
    const eventsRef = useRef<HTMLDivElement | null>(null);
    const [calendarHeight, setCalendarHeight] = useState<number>(0);
    const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<VEvent>();

    useEffect(() => {
        if (calendar) {
            const allEvents = Object.values(calendar.events).flat().sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
            setEvents(allEvents);
        }
    }, [calendar]);

    useEffect(() => {
        if (calRef.current) {
            setCalendarHeight(calRef.current.offsetHeight);
        }
    }, [calRef.current]);

    const handleDayClick = (date: Date) => {
        console.log(`Day clicked: ${format(date, "yyyy-MM-dd")}`);
        setSelectedDate(date);
        setTimeout(() => scrollToEvents(date), 100); // Delay to ensure DOM updates
    };

    const scrollToEvents = (date: Date) => {
        console.log(`Scrolling to events for date: ${format(date, "yyyy-MM-dd")}`);
        if (eventsRef.current) {
            const eventElements = eventsRef.current.querySelectorAll("[data-event-date]");
            let found = false;
            eventElements.forEach((eventElement) => {
                if (!found && isSameDay(new Date(eventElement.getAttribute("data-event-date") ?? ""), date)) {
                    console.log(`Event found for date: ${format(date, "yyyy-MM-dd")}, scrolling into view.`);
                    eventElement.scrollIntoView({ behavior: "smooth" });
                    found = true;
                }
            });
            if (!found) {
                console.log(`No events found for date: ${format(date, "yyyy-MM-dd")}`);
            }
        }
    };

    useEffect(() => {
        if (events.length > 0) {
            const today = new Date();
            let closestEvent = events[0];
            let minDiff = Math.abs(new Date(events[0]?.start ?? "").getTime() - today.getTime());

            events.forEach(event => {
                const eventDate = new Date(event.start);
                const diff = Math.abs(eventDate.getTime() - today.getTime());
                if (diff < minDiff) {
                    closestEvent = event;
                    minDiff = diff;
                }
            });

            if (closestEvent) {
                scrollToEvents(new Date(closestEvent.start));
            }
        }
    }, [events]);

    const handleEventClick = (event: VEvent) => {
        setSelectedEvent(event);
        setIsEventDialogOpen(true);
    };

    return (
        <div className="mobile-month-view flex flex-col h-dvh">
            <div className="calendar pb-4 mb-1 shadow-md" ref={calRef}>
                {renderMonthCalendar(selectedDate, handleDayClick, events)}
            </div>
            <div className="p-2 overflow-y-auto space-y-2 pb-[200px]" ref={eventsRef} style={{ height: `calc(100% - ${calendarHeight}px)` }}>
                {events.map((event) => (
                    <div key={event.uid} data-event-date={event.start}>
                        <EventCard oldEvent={isPast(new Date(event.start))} onClick={() => handleEventClick(event)} event={event} metadata={parseDescription(event.description)} rsvpsForEvent={[]} selectable={true && !isPast(new Date(event.start))} />
                    </div>
                ))}
            </div>
            {selectedEvent && <EventDialog isOpen={isEventDialogOpen} event={selectedEvent} metadata={parseDescription(selectedEvent?.description)} onClose={() => setIsEventDialogOpen(false)} />}
        </div>
    );

    function renderMonthCalendar(selectedDate: Date, handleDayClick: (date: Date) => void, events: VEvent[]) {
        const monthStart = startOfMonth(selectedDate);
        const monthEnd = endOfMonth(monthStart);
        const calendarStart = startOfWeek(monthStart);
        const calendarEnd = endOfWeek(monthEnd);

        const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
        const daysWithEvents = new Set(events.map(event => format(new Date(event.start), "yyyy-MM-dd")));

        const dayOfWeekHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        return (
            <div className="flex flex-col gap-2 p-2">
                <div className="flex items-center  ml-4">
                    <h2 className=" font-semibold">
                        {format(selectedDate, "MMMM yyyy")}
                    </h2>
                </div>

                <div className=" grid grid-cols-7 gap-2">
                    {dayOfWeekHeaders.map((day, i) => (
                        <div key={i} className="text-xs text-center   text-gray-700">
                            {day}
                        </div>
                    ))}
                    {days.map((day, i) => {
                        const dateString = format(day, "yyyy-MM-dd");
                        const hasEvents = daysWithEvents.has(dateString);
                        const sameMonth = isSameMonth(day, selectedDate);
                        const todayAndFuture = isSameDay(day, new Date()) || isAfter(day, new Date());
                        const shouldHighlight = hasEvents && sameMonth && todayAndFuture;
                        const highlightClass = shouldHighlight ? "bg-blue-200 font-bold text-blue-700" : "text-gray-500";
                        const disabledClass = !sameMonth || !hasEvents ? "text-gray-200 bg-transparent" : "";

                        return (
                            <button
                                disabled={!sameMonth || !hasEvents}
                                key={i + dayOfWeekHeaders.length}
                                onClick={() => handleDayClick(day)}
                                className={`p-2 justify-self-center rounded-full w-10 h-10 ${!sameMonth ? "text-gray-200 bg-transparent" : highlightClass}`}
                            >
                                {format(day, "d")}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }
}