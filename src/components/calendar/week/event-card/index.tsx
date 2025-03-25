"use client";

import { parseDescription } from "@/lib/ical";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { type VEvent } from "node-ical";
import { useState } from "react";
import { EventDialog } from "../../../modals/rsvp";
import { useCal } from "../../calendar-provider";
import {
  getBackgroundColor,
  getCursorStyle,
  getEventPosition,
  getPrimaryColor,
  getSecondaryColor,
  isOldEvent,
} from "./utils";

export function Event({
  event,
  disableDialog,
}: {
  event: VEvent;
  disableDialog?: boolean;
}) {
  const { rsvps } = useCal();
  const { data: rsvpsForEvent = [] } = api.rsvp.getAllRsvpForAnEvent.useQuery(
    { eventId: event.uid },
    { enabled: !!event.uid },
  );

  const [isOpen, setIsOpen] = useState(false);
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);
  const { top, height } = getEventPosition(startDate, endDate);
  const metadata = parseDescription(event.description);
  const hasRsvp = rsvps?.some((rsvp) => rsvp.eventId === event.uid);

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  const oldEvent = isOldEvent(event);
  const isGoing = rsvps?.some((rsvp) => rsvp.eventId === event.uid);

  const styleProps = {
    oldEvent,
    metadataType: metadata.type,
    hasRsvp,
    isGoing,
  };

  const cursorStyle = getCursorStyle(metadata.type, oldEvent);
  const backgroundColor = getBackgroundColor(styleProps);
  const primaryColor = getPrimaryColor(styleProps);
  const secondaryColor = getSecondaryColor(styleProps);
  
  return (
    <>
      <div
        className={`absolute left-0 right-0 mx-1 overflow-hidden rounded p-2 text-xs ${backgroundColor} ${cursorStyle}`}
        style={{ top, height }}
        title={`${event.summary}\n${format(startDate, "h:mm a")} - ${format(endDate, "h:mm a")}`}
        onClick={!oldEvent ? handleOpen : undefined}
      >
        {rsvpsForEvent?.length > 0 && (
          <div className={`absolute right-1 top-1 h-4 w-4 rounded-full ${oldEvent ? "bg-gray-400" : "bg-blue-500"} text-center text-[10px] leading-4 text-white`}>
            {rsvpsForEvent.length}
          </div>
        )}
        <div className={`font-bold text-[13px] ${primaryColor} mr-2`}>{event.summary}</div>
        <div className={`${secondaryColor}`}>
          {format(startDate, startDate.getMinutes() !== 0 ? "h:mm a" : "h a")} -{" "}
          {format(endDate, endDate.getMinutes() !== 0 ? "h:mm a" : "h a")}
        </div>
      </div>
      {!disableDialog ? (
        <EventDialog isOpen={isOpen} event={event} onClose={handleClose} />
      ) : null}
    </>
  );
}
