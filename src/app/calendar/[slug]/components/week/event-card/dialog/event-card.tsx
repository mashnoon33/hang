/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CalendarSlotMetadata, parseDescription } from "@/lib/ical";
import { api, RouterOutputs } from "@/trpc/react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@heroui/react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { VEvent } from "node-ical";
import { useMemo, useState } from "react";
import { useCalendar } from "../../../CalendarProvider";

export function EventCard({ event, metadata, rsvpsForEvent, selectable = false, onClick, oldEvent = false }: { event: VEvent, metadata: Partial<CalendarSlotMetadata>, rsvpsForEvent: RouterOutputs["rsvp"]["getAllRsvpForAnEvent"] | undefined, selectable?: boolean, onClick?: () => void, oldEvent?: boolean }) {
    const { rsvps } = useCalendar();
    // @ts-expect-error rsvps is undefined
    const isGoing = useMemo(() => rsvps?.filter(rsvp => rsvp.eventId === event.uid)?.length > 0, [rsvps, event.uid]);
    const handleClick = () => {
      if (selectable) {
        onClick?.();
      }
    };
    return (
      <Card className={`${isGoing ? "bg-blue-800" : "bg-slate-100"} rounded-md ${selectable ? "cursor-pointer hover:bg-slate-200" : ""} `} onClick={handleClick}>
        <div className="p-4">
          <h2 className={`text-xl font-bold ${isGoing ? "text-white" : "text-gray-800"}`}>{event.summary}</h2>
          <div className={`text-sm ${isGoing ? "text-white/60" : "text-gray-800"}`}>
            <p>{format(new Date(event.start), "EEEE, MMMM d, yyyy")}</p>
            <p>{format(new Date(event.start), "h:mm a")} - {format(new Date(event.end), "h:mm a")}</p>
            <p>{metadata.capacity ? `${metadata.capacity} people max` : "No capacity limit"}</p>
          </div>
        </div>
        {!!rsvpsForEvent?.length && RSVPList(rsvpsForEvent)}
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