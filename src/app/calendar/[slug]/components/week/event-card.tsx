/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { format } from "date-fns";
import { VEvent } from "node-ical";
import { useMemo, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { parseDescription } from "@/lib/ical";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSession } from "next-auth/react";

interface EventProps {
  event: VEvent;
}

function EventDialog({ event, onClose }: { event: VEvent, onClose: ()=> void }) {

  const { mutate: createRsvp } = api.rsvp.createRsvp.useMutation();
  const { mutate: cancelRsvp } = api.rsvp.cancelRsvp.useMutation();
  const { data: rsvpsForEvent } = api.rsvp.getAllRsvpForAnEvent.useQuery({ eventId: event.uid });
  const { data: session } = useSession();
  
  const [plusOne, setPlusOne] = useState(1);
  const description = parseDescription(event.description);
  const maxPlusOne = useMemo(() => {
    return (description.capacity ?? 1) - (rsvpsForEvent?.length ?? 0);
  }, [description.capacity, rsvpsForEvent?.length]);

  const isRsvped = useMemo(() => {
    return rsvpsForEvent?.some(rsvp => rsvp.userId === session?.user.id);
  }, [rsvpsForEvent, session?.user.id]);

  const handleRSVP = () => {
    onClose();
    createRsvp({ eventId: event.uid, units: plusOne });
  };

  const handleCancelRSVP = () => {
    onClose();
    cancelRsvp({ eventId: event.uid });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{isRsvped ? "You're RSVPed!" : "Are you coming?"}</DialogTitle>
        <DialogDescription>
          {isRsvped ? "You have already RSVPed for this event." : "Please let me know how many people will be coming. Your presence is very important to me, and I want to make sure we have enough space and resources for everyone."}
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className="justify-between flex-row">
        {isRsvped ? (
          <Button color="destructive" onClick={handleCancelRSVP}>Cancel RSVP</Button>
        ) : (
          <>
            <Select value={plusOne.toString()} onValueChange={(v) => setPlusOne(parseInt(v))}>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Plus one" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(maxPlusOne + 1)].map((_, i) =>
                  <SelectItem key={i} value={i.toString()}>+ {i}</SelectItem>
                )}
              </SelectContent>
            </Select>
            <Button onClick={handleRSVP}>RSVP</Button>
          </>
        )}
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
  const metadata = parseDescription(event.description)

  const handleClose = ()=> {
    setIsOpen(false)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild disabled={metadata.type === 'u'}>
          <div
            className={`absolute left-0 right-0 mx-1 rounded p-1 text-xs overflow-hidden ${metadata.type === 'u' ? 'bg-gray-200 bg-checkered cursor-default' : 'bg-blue-100 hover:bg-blue-200 cursor-pointer'}`}
            style={{ top, height }}
            title={`${event.summary}\n${format(startDate, "h:mm a")} - ${format(endDate, "h:mm a")}`}
          >
            <div className="font-bold text-blue-900">{event.summary}</div>
            <div className="text-gray-600">
              {format(startDate, startDate.getMinutes() !== 0 ? "h:mm a" : "h a")} - {format(endDate, endDate.getMinutes() !== 0 ? "h:mm a" : "h a")}
            </div>
            {/* {!!Object.keys(metadata).length && <pre className="whitespace-break-spaces">{JSON.stringify(metadata)}</pre>} */}

          </div>
        </DialogTrigger>
        <EventDialog event={event} onClose={handleClose} />
      </Dialog>
    </>
  );
} 