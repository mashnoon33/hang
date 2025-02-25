"use client";

import { format } from "date-fns";
import { VEvent } from "node-ical";
import { useMemo, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { parseDescription } from "@/lib/ical";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EventProps {
  event: VEvent;
}

function EventDialog({ event, onClose }: { event: VEvent, onClose: ()=> void }) {

  const { mutate } = api.rsvp.createRsvp.useMutation();
  const { data: rsvpsForEvent } = api.rsvp.getAllRsvpForAnEvent.useQuery({ eventId: event.uid })
  const [plusOne, setPlusOne] = useState(1);
  const description = parseDescription(event.description)
  const maxPlusOne = useMemo(()=> {
    return (description.capacity ?? 1) - (rsvpsForEvent?.length ?? 0)
  } ,[rsvpsForEvent])
  // alloweable RSVP count 

  const handleRSVP = ()=>  {
    // close the dialogue
    onClose()
    mutate({eventId: event.uid, units: plusOne})
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
          {/* <pre className="whitespace-pre-wrap">{JSON.stringify({ description, maxPlusOne })}</pre>
          <pre className="whitespace-pre-wrap">{JSON.stringify(rsvpsForEvent)}</pre> */}
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className="justify-between">
        <Select value={plusOne.toString()} onValueChange={(v) => setPlusOne(parseInt(v))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pluse one" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(maxPlusOne+1)].map((_, i) =>
              <SelectItem key={i} value={i.toString()}>+ {i }</SelectItem>
            )}
          </SelectContent>
        </Select>
        <Button onClick={handleRSVP}>RSVP</Button>
      </DialogFooter>
    </DialogContent>
  );
}

export function Event({ event }: EventProps) {
  const [isOpen, setIsOpen] = useState(false);
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);
  const startHour = startDate.getHours() + startDate.getMinutes() / 60;
  const endHour = endDate.getHours() + endDate.getMinutes() / 60;
  const top = `${startHour * 48}px`;
  const height = `${(endHour - startHour) * 48}px`;
  const description = parseDescription(event.description)

  const handleClose = ()=> {
    setIsOpen(false)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div
            className="absolute left-0 right-0 mx-1 bg-blue-100 rounded p-1 text-xs overflow-hidden hover:bg-blue-200 cursor-pointer"
            style={{ top, height }}
            title={`${event.summary}\n${format(startDate, "h:mm a")} - ${format(endDate, "h:mm a")}`}
            onClick={() => setIsOpen(true)}
          >
            <div className="font-bold text-blue-900">{event.summary}</div>
            <div className="text-gray-600">
              {format(startDate, startDate.getMinutes() !== 0 ? "h:mm a" : "h a")} - {format(endDate, endDate.getMinutes() !== 0 ? "h:mm a" : "h a")}
            </div>
            {!!Object.keys(description).length && <pre className="whitespace-break-spaces">{JSON.stringify(description)}</pre>}

          </div>
        </DialogTrigger>
        <EventDialog event={event} onClose={handleClose} />
      </Dialog>
    </>
  );
} 