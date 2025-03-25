import { type VEvent } from "node-ical";
import { isPast } from "date-fns";

export interface EventStyleProps {
  oldEvent: boolean;
  metadataType: string | undefined;
  hasRsvp: boolean | undefined;
  isGoing: boolean | undefined;
}

export const getCursorStyle = (metadataType: string | undefined, oldEvent: boolean): string => {
  return metadataType === "u" || oldEvent ? "cursor-default" : "cursor-pointer";
};

export const getBackgroundColor = ({ oldEvent, metadataType, hasRsvp }: EventStyleProps): string => {
  if (oldEvent) {
    return "bg-gray-200";
  } else if (metadataType === "u") {
    return "bg-gray-200 stripes stripes-opacity-20 stripes-size-sm ";
  } else if (hasRsvp) {
    return "bg-blue-800 hover:bg-blue-700";
  } else {
    return "bg-blue-100 hover:bg-blue-200 border border-blue-200";
  }
};

export const getPrimaryColor = ({ oldEvent, metadataType, isGoing }: EventStyleProps): string => {
  if (oldEvent) {
    return "text-gray-500";
  } else if (metadataType === "u") {
    return "text-gray-500";
  } else if (isGoing) {
    return "text-white";
  } else {
    return "text-blue-900";
  }
};

export const getSecondaryColor = ({ oldEvent, metadataType, isGoing }: EventStyleProps): string => {
  if (oldEvent) {
    return "text-gray-500";
  } else if (metadataType === "u") {
    return "text-gray-500";
  } else if (isGoing) {
    return "text-blue-200";
  } else {
    return "text-blue-800";
  }
};

export const getEventPosition = (startDate: Date, endDate: Date) => {
  const startHour = startDate.getHours() + startDate.getMinutes() / 60;
  const endHour = endDate.getHours() + endDate.getMinutes() / 60;
  return {
    top: `${startHour * 48}px`,
    height: `${(endHour - startHour) * 48}px`,
  };
};

export const isOldEvent = (event: VEvent): boolean => {
  return isPast(new Date(event.start));
};
