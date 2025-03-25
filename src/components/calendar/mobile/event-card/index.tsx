"use client";

import { Card } from "@/components/ui/card";
import { CalendarSlotMetadata, parseDescription } from "@/lib/ical";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { VEvent } from "node-ical";
import { useMemo } from "react";
import { useCal } from "../../calendar-provider";
import { EventBadges } from "./badges";

interface EventCardProps {
  event: VEvent;
  selectable?: boolean;
  onClick?: () => void;
  oldEvent?: boolean;
}


export function EventCard({
  event,
  selectable = false,
  onClick,
  oldEvent = false,
}: EventCardProps) {
  const { rsvps } = useCal();
  const { data: rsvpsForEvent = [] } = api.rsvp.getAllRsvpForAnEvent.useQuery(
    { eventId: event.uid },
    { enabled: !!event.uid }
  );

  const isGoing = useMemo(
    () => rsvps?.some((rsvp) => rsvp.eventId === event.uid),
    [rsvps, event.uid]
  );

  const metadata = useMemo(
    (): Partial<CalendarSlotMetadata> => parseDescription(event.description),
    [event.description]
  );

  const eventTimeRange = useMemo(() => {
    const startTime = format(new Date(event.start), "hh:mm a");
    const endTime = format(new Date(event.end), "hh:mm a");
    return `${startTime} - ${endTime}`;
  }, [event.start, event.end]);

  return (
    <Card className={`bg-transparent border-none border-gray-200 flex flex-row rounded-none shadow-none ${oldEvent ? "opacity-50" : ""} ${selectable && !oldEvent ? "cursor-pointer hover:bg-gray-100" : ""}`} onClick={selectable ? onClick : undefined}>
      <div className="my-auto p-4">
        <div className="flex h-16 w-16 flex-col items-center rounded-md border border-gray-200 bg-gray-100 p-2">
          <p className="text-2xl font-bold">
            {format(new Date(event.start), "d")}
          </p>
          <p className="text-xs">{format(new Date(event.start), "EEE")}</p>
        </div>
      </div>
      <div className="py-4">
        <EventBadges
          event={event}
          metadata={metadata}
          oldEvent={oldEvent}
          isGoing={!!isGoing}
          rsvpsForEvent={rsvpsForEvent}
        />
        <h2 className="font-bold">{event.summary}</h2>
        <div className="text-sm text-gray-500">
          <p className="flex flex-row items-center gap-1">
            <Clock className="h-4 w-4" />
            {eventTimeRange}
          </p>
        </div>
        {metadata.description && (
          <div className="text-sm text-gray-500">
            <p className="line-clamp-1 items-center pr-2">
              {metadata.description}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}