"use client";

import { Badge } from "@/components/ui/badge";
import { CalendarSlotMetadata } from "@/lib/ical";
import { isSameDay } from "date-fns";
import { Check, Clock, User } from "lucide-react";
import { VEvent } from "node-ical";


interface EventBadgeProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
}

const EventBadge = ({ icon, text, className }: EventBadgeProps) => (
  <Badge key={text} className={className}>
    {icon && <span className="mr-1">{icon}</span>}
    {text}
  </Badge>
);

interface EventBadgesProps {
  event: VEvent;
  metadata: Partial<CalendarSlotMetadata>;
  oldEvent: boolean;
  isGoing: boolean;
  rsvpsForEvent: { eventId: string }[];
}

export const EventBadges = ({ event, metadata, oldEvent, isGoing, rsvpsForEvent }: EventBadgesProps) => {
  const badges: JSX.Element[] = [];

  if (oldEvent) {
    badges.push(
      <EventBadge
        key="past"
        icon={<Clock className="h-3 w-3" />}
        text="Expired"
        className="bg-gray-500"
      />
    );
  } else if (isGoing) {
    badges.push(
      <EventBadge
        key="going"
        icon={<Check className="h-3 w-3" />}
        text="Going"
        className="bg-green-500"
      />
    );
  }

  if (metadata.capacity || rsvpsForEvent.length > 0) {
    const attendeeText = metadata.capacity
      ? `${rsvpsForEvent.length}/${metadata.capacity}`
      : `${rsvpsForEvent.length} going`;
    badges.push(
      <EventBadge
        key="capacity"
        icon={<User className="h-3 w-3" />}
        text={attendeeText}
        className="bg-blue-500"
      />
    );
  }

  if (isSameDay(new Date(event.start), new Date())) {
    badges.push(
      <EventBadge
        key="today"
        icon={<Clock className="h-3 w-3" />}
        text="Today"
        className="bg-yellow-500"
      />
    );
  }

  metadata.tags?.forEach((tag) => {
    badges.push(<Badge key={tag}>{tag}</Badge>);
  });

  return <div className="flex flex-row gap-2">{badges}</div>;
};