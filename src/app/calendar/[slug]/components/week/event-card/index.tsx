/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { parseDescription } from "@/lib/ical";
import { format } from "date-fns";
import { VEvent } from "node-ical";
import { useMemo, useState } from "react";
import { EventDialog } from "./dialog";
import { useCalendar } from "../../CalendarProvider";






export function Event({ event, disableDialog }: { event: VEvent, disableDialog?: boolean }) {
  const { rsvps } = useCalendar();
  const [isOpen, setIsOpen] = useState(false);
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);
  const startHour = startDate.getHours() + startDate.getMinutes() / 60;
  const endHour = endDate.getHours() + endDate.getMinutes() / 60;
  const top = `${startHour * 48}px`;
  const height = `${(endHour - startHour) * 48}px`;
  const metadata = parseDescription(event.description)
  const hasRsvp = useMemo(() => {
    return rsvps?.some(rsvp => rsvp.eventId === event.uid);
  }, [rsvps, event.uid]);

  const handleClose = () => {
    setIsOpen(false)
  }
  const handleOpen = () => {
    setIsOpen(true)
  }
  const backgroundColor = useMemo(() => {
    if (metadata.type === 'u') {
      return 'bg-gray-200 stripes stripes-opacity-20 stripes-size-sm ';
    } else if (hasRsvp) {
      return 'bg-blue-800 hover:bg-blue-700';
    } else {
      return 'bg-blue-100 hover:bg-blue-200';
    }
  }, [metadata.type, hasRsvp]);
  const cursorStyle = metadata.type === 'u' ? 'cursor-default' : 'cursor-pointer';

  return (
    <>
      <div
        className={`absolute left-0 right-0 mx-1 rounded p-1 text-xs overflow-hidden ${backgroundColor} ${cursorStyle}`}
        style={{ top, height }}
        title={`${event.summary}\n${format(startDate, "h:mm a")} - ${format(endDate, "h:mm a")}`}
        onClick={handleOpen}
      >
        <div className={`font-bold ${hasRsvp ? 'text-white' : 'text-blue-900'}`}>{event.summary}</div>
        <div className={`text-gray-600 ${hasRsvp ? 'text-white' : 'text-blue-900'}`}>
          {format(startDate, startDate.getMinutes() !== 0 ? "h:mm a" : "h a")} - {format(endDate, endDate.getMinutes() !== 0 ? "h:mm a" : "h a")}
        </div>
        {/* {!!Object.keys(metadata).length && <pre className="whitespace-break-spaces">{JSON.stringify(metadata)}</pre>} */}

      </div>
      {!disableDialog ? <EventDialog isOpen={isOpen} event={event}  onClose={handleClose} /> : null}
    </>
  );
} 