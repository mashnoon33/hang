/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { parseDescription } from "@/lib/ical";
import { format, isPast, isSameDay } from "date-fns";
import { VEvent } from "node-ical";
import { useMemo, useState } from "react";
import { EventDialog } from "./dialog";
import { useCalendar } from "../../CalendarProvider";
import { api } from "@/trpc/react";






export function Event({ event, disableDialog }: { event: VEvent, disableDialog?: boolean }) {
  const { rsvps } = useCalendar();
  const { data: rsvpsForEvent = [] } = api.rsvp.getAllRsvpForAnEvent.useQuery({ eventId: event.uid }, { enabled: !!event.uid });

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

  const oldEvent = useMemo(() => {
    return isPast(new Date(event.start));
  }, [event.start]);
  const isGoing = useMemo(() => {
    return rsvps?.some(rsvp => rsvp.eventId === event.uid);
  }, [rsvps, event.uid]);

  const tags = useMemo(() => {
    const defaultTags = metadata.tags ?? [];
    const goingTag = oldEvent
      ? ["Expired"]
      : isGoing
        ? ["Going"]
        : [];
    const capacityTag = metadata.capacity
      ? [`${rsvpsForEvent?.length ?? 0}/${metadata.capacity}`]
      : rsvpsForEvent?.length > 0
        ? [`${rsvpsForEvent?.length} going`]
        : [];
 
    return [...goingTag, ...capacityTag, ...defaultTags];
  }, [metadata.tags, metadata.capacity, oldEvent, isGoing, rsvpsForEvent])
  const cursorStyle = metadata.type === 'u' || oldEvent ? 'cursor-default' : 'cursor-pointer';

  const backgroundColor = useMemo(() => {
    if (oldEvent) {
      return 'bg-gray-200';
    } else if (metadata.type === 'u') {
      return 'bg-gray-200 stripes stripes-opacity-20 stripes-size-sm ';
    } else if (hasRsvp) {
      return 'bg-blue-800 hover:bg-blue-700';
    } else {
      return 'bg-blue-100 hover:bg-blue-200';
    }
  }, [metadata.type, hasRsvp, oldEvent]);
  const primaryColor = useMemo(() => {
    if (oldEvent) {
      return 'text-gray-500';
    } else if (metadata.type === 'u') {
      return 'text-gray-500';
    } else if (isGoing) {
      return 'text-white';
    } else {
      return 'text-blue-900';
    }
  }, [metadata.type, oldEvent, isGoing]);

  const secondaryColor = useMemo(() => {
    if (oldEvent) {
      return 'text-gray-500';
    } else if (metadata.type === 'u') {
      return 'text-gray-500';
    } else if (isGoing) {
      return 'text-blue-200';
    } else {
      return 'text-blue-800';
    }
  }, [metadata.type, oldEvent, isGoing]);
  return (
    <>
      <div
        className={`absolute left-0 right-0 mx-1 rounded p-1 text-xs overflow-hidden ${backgroundColor} ${cursorStyle}`}
        style={{ top, height }}
        title={`${event.summary}\n${format(startDate, "h:mm a")} - ${format(endDate, "h:mm a")}`}
        onClick={!oldEvent ? handleOpen : undefined}
      >
        <div className={`font-bold ${primaryColor}`}>{event.summary}</div>
        <div className={`${secondaryColor}`}>
          {format(startDate, startDate.getMinutes() !== 0 ? "h:mm a" : "h a")} - {format(endDate, endDate.getMinutes() !== 0 ? "h:mm a" : "h a")}
        </div>
        {tags.map((tag, index) => (
          <div key={index} className={`mr-1 ${secondaryColor}`}>
            {tag}
          </div>
        ))}
        {/* {!!Object.keys(metadata).length && <pre className="whitespace-break-spaces">{JSON.stringify(metadata)}</pre>} */}

      </div>
      {!disableDialog ? <EventDialog isOpen={isOpen} event={event}  onClose={handleClose} /> : null}
    </>
  );
} 