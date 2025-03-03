/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { format } from "date-fns";
import { VEvent } from "node-ical";
import { useCallback, useMemo, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, NumberInput } from "@heroui/react";
import { CalendarSlotMetadata, parseDescription } from "@/lib/ical";
import { api, RouterOutputs } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Card, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function EventDialog({ isOpen, event, metadata, onClose }: { isOpen: boolean, event: VEvent, metadata: Partial<CalendarSlotMetadata>, onClose: () => void }) {

    const { mutate: createRsvp } = api.rsvp.createRsvp.useMutation();
    const { mutate: cancelRsvp } = api.rsvp.cancelRsvp.useMutation();
    const { data: rsvpsForEvent, isLoading: isLoadingRsvps } = api.rsvp.getAllRsvpForAnEvent.useQuery({ eventId: event.uid }, { enabled: !!event.uid && isOpen });
    const { data: session } = useSession();
  
    const [plusOne, setPlusOne] = useState(0);
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
    const handlePlusOneChange = useCallback((value: number) => {
      if (value > maxPlusOne) {
        setPlusOne(maxPlusOne);
      } else if (value < 0) {
        setPlusOne(0);
      } else {
        setPlusOne(value);
      }
    }, [maxPlusOne]);
    
    return (
      <Modal isOpen={isOpen} onOpenChange={onClose} key={event.uid}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2>{isRsvped ? "You're RSVPed!" : "Are you coming?"}</h2>
                <p className="text-sm text-gray-500">
                  {isRsvped ? "You have already RSVPed for this event." : "Please let me know if you're coming to this event and whether you'll be bringing a plus one"}
                </p>
              </ModalHeader>
              <ModalBody>
                <Card className="bg-slate-100 rounded-md">
                  <div className="p-4">
                    <h2 className="text-xl font-bold">{event.summary}</h2>
                    <p className="text-sm  text-gray-500">{format(new Date(event.start), "EEEE, MMMM d, yyyy")}</p>
                    <p className="text-sm text-gray-500">{format(new Date(event.start), "h:mm a")} - {format(new Date(event.end), "h:mm a")}</p>
                    <p className="text-sm text-gray-500">{metadata.capacity ? `${metadata.capacity} people max` : "No capacity limit"}</p>
                  </div>
                  {!!rsvpsForEvent?.length && RSVPList(rsvpsForEvent)}
                </Card>
              </ModalBody>
              <ModalFooter className="flex-row w-full">
                {isRsvped ? (
                  <Button variant="destructive" onClick={handleCancelRSVP}>Cancel RSVP</Button>
                ) : (
                  <div className="flex w-full flex-row justify-between gap-2">
                    <div className="flex w-[100px] flex-row gap-2">
                    <NumberInput
                      label="+"
                      placeholder="Enter number"
                      value={plusOne}
                      onValueChange={handlePlusOneChange}
                      labelPlacement="outside-left"
                      size="sm"
                      width="30px"
                    />
                    </div>
                    <Button className="ml-auto" onClick={handleRSVP}>RSVP</Button>
                  </div>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
}
  

export function RSVPList(rsvpsForEvent: RouterOutputs["rsvp"]["getAllRsvpForAnEvent"]) {
  return <div className=" border-gray-200 p-4 border-t ">
    {/* <span className="text-sm text-gray-500 font-bold">
          RSVPS
        </span> */}
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