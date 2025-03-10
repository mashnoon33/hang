/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/spinner";
import { CalendarSlotMetadata, parseDescription } from "@/lib/ical";
import { api, RouterOutputs } from "@/trpc/react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@heroui/react";
import { format } from "date-fns";
import { Calendar, Clock, LucideIcon, ReceiptText, Star, TicketCheck, TicketX, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { VEvent } from "node-ical";
import { useMemo, useState } from "react";
import { useCalendar } from "../../../CalendarProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type RSVPStatus = 'rsvped' | 'canceled' | false;

export function EventDialog({ isOpen, event, onClose }: { isOpen: boolean, event: VEvent, onClose: () => void }) {
  const [success, setSuccess] = useState<RSVPStatus>(false);
  const [loading, setLoading] = useState(false);
  const { refetchRsvps, calendar } = useCalendar();
  const { data: rsvpsForEvent, refetch: refetchRsvpsForEvent } = api.rsvp.getAllRsvpForAnEvent.useQuery({ eventId: event.uid }, { enabled: !!event.uid && isOpen });
  const { mutate: sendRsvpEmail } = api.mail.sendRsvpEmail.useMutation();
  const metadata = useMemo(() => {
    return parseDescription(event.description);
  }, [event.description]);
  const { data: session } = useSession();

  const { mutate: createRsvp } = api.rsvp.createRsvp.useMutation({
    onSuccess: async () => {
      await refetchRsvps();
      await refetchRsvpsForEvent();
      void sendRsvpEmail({ event: { name: event.summary, start: event.start, end: event.end }, user: { name: session?.user.name ?? "", email: session?.user.email ?? "" }, calendarId: calendar?.id ?? 0 });
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
      await refetchRsvps();
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
    createRsvp({ eventId: event.uid, units: plusOne, calendarId: calendar!.id });
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
            <TicketCheck className="h-40 w-40 text-green-400" />
          ) : (
            <TicketX className="h-40 w-40 text-red-400" />
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
          <div className="flex flex-col gap-1">
            <IconLabel icon={Star} labelClass="">
              {event.summary}
            </IconLabel>
            {metadata.description && (
              <IconLabel icon={ReceiptText} labelClass="">
                {metadata.description}
              </IconLabel>
            )}
            <IconLabel icon={Calendar} labelClass="">
              {format(new Date(event.start), "MMM d, yyyy")}
            </IconLabel>
            <IconLabel icon={Clock} labelClass="">
              {`${format(new Date(event.start), "hh:mm a")} - ${format(new Date(event.end), "hh:mm a")}`}
            </IconLabel>
            {description.capacity !== undefined && (
              <IconLabel icon={Users} labelClass="">
                {`${rsvpsForEvent?.length ?? 0}/${description.capacity}`}
              </IconLabel>
            )}
            {!!rsvpsForEvent?.length && rsvpsForEvent.length > 0 && (
              <IconLabel icon={Users} labelClass="">
                {rsvpsForEvent.map(rsvp => (
                  <Badge key={rsvp.userId} className="bg-gray-200 border border-gray-300 hover:bg-gray-300 text-gray-600 gap-1 pl-1 pr-2">
                    <Avatar key={rsvp.userId} className="bg-gray-200 border  w-[16px] h-[16px] border-gray-300 text-gray-500">
                      <AvatarImage src={rsvp.user?.image ?? ""} />
                      <AvatarFallback className="text-[8px] font-bold">
                        {rsvp.user?.name?.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-xs ">{rsvp.user?.name?.split(" ")[0]}</p>
                  </Badge>
                ))}
              </IconLabel>
            )}


          </div>
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

interface IconLabelProps {
  icon: LucideIcon;

  labelClass?: string;
  children?: React.ReactNode;
}

export function IconLabel({ icon: Icon, labelClass = "font-normal", children }: IconLabelProps) {
  return (
    <div className="flex flex-row gap-2 items-center text-gray-600">
      <Icon className="w-4 h-4 flex-shrink-0" />
      {children}
    </div>
  );
}