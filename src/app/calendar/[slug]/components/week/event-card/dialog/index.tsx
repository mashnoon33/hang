/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/spinner";
import { CalendarSlotMetadata, parseDescription } from "@/lib/ical";
import { api, RouterOutputs } from "@/trpc/react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@heroui/react";
import { useSession } from "next-auth/react";
import { VEvent } from "node-ical";
import { useMemo, useState } from "react";
import { useCalendar } from "../../../CalendarProvider";
import { EventCard } from "./event-card";
import { CircleX, TicketCheck, TicketX, X } from "lucide-react";

type RSVPStatus = 'rsvped' | 'canceled' | false;

export function EventDialog({ isOpen, event, metadata, onClose }: { isOpen: boolean, event: VEvent, metadata: Partial<CalendarSlotMetadata>, onClose: () => void }) {
  const [success, setSuccess] = useState<RSVPStatus>(false);
  const [loading, setLoading] = useState(false);
  const { refetchRsvps } = useCalendar();
  const { data: rsvpsForEvent, refetch: refetchRsvpsForEvent } = api.rsvp.getAllRsvpForAnEvent.useQuery({ eventId: event.uid }, { enabled: !!event.uid && isOpen });
  const { data: session } = useSession();

  const { mutate: createRsvp } = api.rsvp.createRsvp.useMutation({
    onSuccess: async () => {
     refetchRsvps();
      await refetchRsvpsForEvent();
      setSuccess('rsvped');
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    }
  });
  const { mutate: cancelRsvp } = api.rsvp.cancelRsvp.useMutation({
    onSuccess: async () => {
       refetchRsvps();
      await refetchRsvpsForEvent();
      setSuccess('canceled');
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    }
  });

  const [plusOne, setPlusOne] = useState(0);
  const description = parseDescription(event.description);
  const maxPlusOne = useMemo(() => {
    return (description.capacity ?? 1) - (rsvpsForEvent?.length ?? 0);
  }, [description.capacity, rsvpsForEvent?.length]);

  const isRsvped = useMemo(() => {
    return rsvpsForEvent?.some(rsvp => rsvp.userId === session?.user.id);
  }, [rsvpsForEvent, session?.user.id]);

  const handleRSVP = () => {
    createRsvp({ eventId: event.uid, units: plusOne });
  };

  const handleCancelRSVP = () => {
    cancelRsvp({ eventId: event.uid });
  };

  const handleClose = () => {
    setSuccess(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} key={event.uid}>
      <ModalContent>
        {loading ? <div className="flex justify-center items-center h-full min-h-80"><LoadingSpinner /></div> : success ? <RSVPChange status={success} /> : <RSVPContent isRsvped={isRsvped ?? false} event={event} metadata={metadata} rsvpsForEvent={rsvpsForEvent} plusOne={plusOne} maxPlusOne={maxPlusOne} setPlusOne={setPlusOne} handleRSVP={handleRSVP} handleCancelRSVP={handleCancelRSVP} />}
      </ModalContent>
    </Modal>
  );

  function RSVPChange({ status }: { status: RSVPStatus }) {
    return (
      <div className="flex flex-col min-h-60">
        <ModalHeader className="flex flex-col ">
          Successfully {status === 'rsvped' ? 'RSVPed' : 'canceled'}
          <p className="text-sm text-gray-500 font-normal">
            {status === 'rsvped' ? "You have already RSVPed for this event." : "You have successfully canceled your RSVP for this event."} The host will be notified of your change.
          </p>
        </ModalHeader>
        <div className="flex justify-center  flex-grow h-full items-center">
          {status === 'rsvped' ? (
            <TicketCheck className="h-40 w-40 text-green-500" />
          ) : (
            <TicketX className="h-40 w-40 text-red-500" />
          )}
        </div>
        <ModalFooter className="flex-row w-full">
          <Button onClick={handleClose}>Close</Button>
        </ModalFooter>
      </div>
    );
  }

  function RSVPContent({
    isRsvped,
    event,
    metadata,
    rsvpsForEvent,
    plusOne,
    maxPlusOne,
    setPlusOne,
    handleRSVP,
    handleCancelRSVP,
  }: {
    isRsvped: boolean;
    event: VEvent;
    metadata: Partial<CalendarSlotMetadata>;
    rsvpsForEvent?: RouterOutputs["rsvp"]["getAllRsvpForAnEvent"];
    plusOne: number;
    maxPlusOne: number;
    setPlusOne: (plusOne: number) => void;
    handleRSVP: () => void;
    handleCancelRSVP: () => void;
  }) {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">
          <h2>{isRsvped ? "You're RSVPed!" : "Are you coming?"}</h2>
          <p className="text-sm text-gray-500 font-normal">
            {isRsvped ? "You have already RSVPed for this event." : "Please let me know if you're coming to this event and whether you'll be bringing a plus one"}
          </p>
        </ModalHeader>
        <ModalBody>
          <EventCard event={event} metadata={metadata} rsvpsForEvent={rsvpsForEvent} />
        </ModalBody>
        <ModalFooter className="flex-row w-full">
          {isRsvped ? (
            <Button variant="destructive" onClick={handleCancelRSVP}>Cancel RSVP</Button>
          ) : (
            <div className="flex w-full flex-row justify-between gap-2">
              <Select
                className="w-[80px]"
                variant="bordered"
                defaultSelectedKeys={[plusOne.toString()]}
                selectedKeys={[plusOne.toString()]}
                onChange={(v) => setPlusOne(parseInt(v.target.value))}
              >
                {[...Array(maxPlusOne + 1)].map((_, i) => (
                  <SelectItem key={i.toString()}>{i.toString()}</SelectItem>
                ))}
              </Select>
              <Button className="ml-auto" onClick={handleRSVP}>RSVP</Button>
            </div>
          )}
        </ModalFooter>
      </>
    );
  }
}
