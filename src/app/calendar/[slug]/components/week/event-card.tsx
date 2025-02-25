import { format } from "date-fns";
import { VEvent } from "node-ical";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface EventProps {
  event: VEvent;
}

function EventDialog({ event }: { event: VEvent }) {
  return (
    <DialogContent>
      <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
        <pre className="whitespace-pre-wrap">{JSON.stringify(event, null, 2)}</pre>

      </DialogDescription>
    </DialogHeader>
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
          </div>
        </DialogTrigger>
        <EventDialog event={event} />
      </Dialog>
    </>
  );
} 