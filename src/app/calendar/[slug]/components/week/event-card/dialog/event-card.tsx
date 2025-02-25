/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { parseDescription } from "@/lib/ical";
import { api, RouterOutputs } from "@/trpc/react";
import { format, isSameDay } from "date-fns";
import { VEvent } from "node-ical";
import { useMemo } from "react";
import { useCalendar } from "../../../CalendarProvider";
import { Check, Clock, ClockIcon, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function EventCard({ event, selectable = false, onClick, oldEvent = false }: { event: VEvent, selectable?: boolean, onClick?: () => void, oldEvent?: boolean }) {
  const { rsvps } = useCalendar();
  // @ts-expect-error rsvps is undefined
  const isGoing = useMemo(() => rsvps?.filter(rsvp => rsvp.eventId === event.uid)?.length > 0, [rsvps, event.uid]);
  const { data: rsvpsForEvent = [] } = api.rsvp.getAllRsvpForAnEvent.useQuery({ eventId: event.uid }, { enabled: !!event.uid });


  const handleClick = () => {
    if (selectable) {
      onClick?.();
    }
  };

  const metadata = useMemo(() => {
    return parseDescription(event.description);
  }, [event.description]);


  const tags = useMemo(() => {
    const defaultTags = metadata.tags?.map(tag => <Badge key={tag}>{tag}</Badge>) ?? [];
    const goingTag = oldEvent
      ? [<Badge key="past" className="bg-gray-500"> <Clock className="w-3 h-3 mr-1 " /> Expired</Badge>]
      : isGoing
        ? [<Badge key="going" className="bg-green-500"> <Check className="w-3 h-3 mr-1 " /> Going</Badge>]
        : [];
    const capacityTag = metadata.capacity
      ? [<Badge key="capacity" className="bg-blue-500">{<User className="w-3 h-3 mr-1 " />} {`${rsvpsForEvent?.length ?? 0}/${metadata.capacity}`}</Badge>]
      : [];
    const todayTag = isSameDay(new Date(event.start), new Date())
      ? [<Badge key="today" className="bg-yellow-500"> <Clock className="w-3 h-3 mr-1 " /> Today</Badge>]
      : [];
    return [...goingTag, ...capacityTag, ...todayTag, ...defaultTags];
  }, [metadata.tags, metadata.capacity, oldEvent, isGoing, rsvpsForEvent, event.start])

  return (
    <Card className={` bg-transparent ${oldEvent ? "opacity-50" : ""} border-none border-gray-200 ${selectable && !oldEvent ? "cursor-pointer hover:bg-gray-100" : ""}  rounded-none flex flex-row shadow-none `} onClick={handleClick}>
      <div className={`p-4 my-auto `}>
        <div className="flex flex-col items-center bg-gray-100 border border-gray-200 rounded-md p-2 w-16 h-16">
          <p className="text-2xl font-bold">{format(new Date(event.start), "d")}</p>
          <p className="text-xs">{format(new Date(event.start), "EEE")}</p>
        </div>
      </div>
      <div className="py-4 ">
        <div className="flex flex-row gap-2">
          {tags}
        </div>
        <h2 className={` font-bold`}>{event.summary}</h2>
        <div className={`text-sm text-gray-500 `}>
          <p className="flex flex-row gap-1 items-center"><ClockIcon className="w-4 h-4" /> {`${format(new Date(event.start), "hh:mm a")} - ${format(new Date(event.end), "hh:mm a")}`}</p>
        </div>
        <div className={`text-sm text-gray-500 `}>
          <p className="pr-2 items-center line-clamp-1">{metadata.description}</p>
        </div>
      </div>
      {/* {!!rsvpsForEvent?.length && RSVPList(rsvpsForEvent)} */}
    </Card>
  );
}

export function RSVPList(rsvpsForEvent: RouterOutputs["rsvp"]["getAllRsvpForAnEvent"]) {
  return <div className=" border-gray-200 p-4 border-t ">
    <TooltipProvider>
      <div className="flex flex-row gap-2">
        {rsvpsForEvent?.map(rsvp => (
          <Tooltip key={rsvp.userId}>
            <TooltipTrigger>
              <Avatar key={rsvp.userId} className="bg-gray-200 border border-gray-300 text-gray-500">
                <AvatarFallback className="text-xs font-bold">
                  {rsvp.user?.name?.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px] flex flex-col ">
              <p className="font-bold">{rsvp.user?.name}</p>
              <p className="text-sm text-gray-500">{rsvp.user?.email}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  </div>;
}