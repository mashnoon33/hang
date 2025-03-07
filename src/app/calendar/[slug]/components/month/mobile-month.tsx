"use client";

import { CalendarSlotMetadata, parseDescription } from "@/lib/ical";
import { addWeeks, eachDayOfInterval, endOfMonth, endOfWeek, format, isAfter, isPast, isSameDay, isSameWeek, startOfMonth, startOfWeek } from "date-fns";
import { VEvent } from "node-ical";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCalendar } from "../CalendarProvider";
import { EventCard } from "../week/event-card/dialog/event-card";
import { TopNav } from "../event-detail";
import { EventDialog } from "../week/event-card/dialog";

export function MobileMonth() {
    const { selectedDate, setSelectedDate, calendar, rsvps, periodLabel } = useCalendar();
    const calRef = useRef<HTMLDivElement | null>(null);
    const eventsRef = useRef<HTMLDivElement | null>(null);
    const [calendarHeight, setCalendarHeight] = useState<number>(0);
    const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<VEvent>();

    const events = useMemo(() => {
        if (calendar) {
            return Object.values(calendar.events)
                .flat()
                .filter(event => 
                    (isSameWeek(new Date(event.start), selectedDate) || 
                    isSameWeek(new Date(event.start), addWeeks(selectedDate, 1))) && 
                    parseDescription(event.description)?.type !== "u"
                )
                .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
        }
        return [];
    }, [calendar, selectedDate]);

    useEffect(() => {
        if (calRef.current) {
            setCalendarHeight(calRef.current.offsetHeight);
        }
    }, [calendar]);

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
                <TopNav />
                <RenderMonthCalendar handleDayClick={handleDayClick} events={events} />
            </div>
            <div className="overflow-y-auto pb-[200px]" ref={eventsRef} style={{ height: `calc(100% - ${calendarHeight}px)` }}>
                {!events.length && <div className="text-center text-gray-500 mt-20">No events for {periodLabel}</div>}
                {events.map((event) => (
                    <div key={event.uid} className="border-b border-gray-200" data-event-date={event.start}>
                        <EventCard oldEvent={isPast(new Date(event.end))} onClick={() => handleEventClick(event)} event={event} selectable={true && !isPast(new Date(event.end))} />
                    </div>
                ))}
            </div>
            {selectedEvent && <EventDialog isOpen={isEventDialogOpen} event={selectedEvent} onClose={() => setIsEventDialogOpen(false)} />}
        </div>
    );


}
const today = new Date();


const RenderMonthCalendar = ({  handleDayClick, events }: {  handleDayClick: (date: Date) => void, events: VEvent[] }) => {
    const { periodLabel, selectedDate } = useCalendar();

    const currentWeekStart = startOfWeek(selectedDate);
    const nextWeekStart = addWeeks(currentWeekStart, 1);
    const nextWeekEnd = endOfWeek(nextWeekStart);

    const days = eachDayOfInterval({ start: currentWeekStart, end: nextWeekEnd });
    const daysWithEvents = new Set(events.map(event => format(new Date(event.start), "yyyy-MM-dd")));

    const dayOfWeekHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="flex flex-col gap-2 p-2">
            <div className="flex items-center ml-4">
                <h2 className="font-semibold">
                    {periodLabel}
                </h2>
            </div>

            <div className="grid grid-cols-7 gap-2">
                {dayOfWeekHeaders.map((day, i) => (
                    <div key={i} className="text-xs text-center text-gray-700">
                        {day}
                    </div>
                ))}
                {days.map((day, i) => {
                    return (
                        <DayCell
                            key={i + dayOfWeekHeaders.length}
                            day={day}
                            daysWithEvents={daysWithEvents}
                            handleDayClick={handleDayClick}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function DayCell({ day, daysWithEvents, handleDayClick }: { day: Date, daysWithEvents: Set<string>, handleDayClick: (date: Date) => void }) {
    const { selectedDate } = useCalendar();
    const dateString = format(day, "yyyy-MM-dd");
    const hasEvents = daysWithEvents.has(dateString);
    const todayAndFuture = isSameDay(day, today) || isAfter(day, today);
    const shouldHighlight = hasEvents && todayAndFuture;
    const isSelected = useMemo(() => isSameDay(day, selectedDate), [day, selectedDate]);

    const highlightClass = shouldHighlight ? isSelected ? "bg-blue-700 font-bold text-white" : "bg-blue-200 font-bold text-blue-700" : "text-gray-500";
    return (
        <button
            disabled={!hasEvents}
            onClick={() => handleDayClick(day)}
            className={`p-2 justify-self-center rounded-full w-10 h-10 ${highlightClass}`}
        >
            {format(day, "d")}
        </button>
    );
}

