"use client";

import { Button } from "@/components/ui/button";
import { X, Calendar, Pencil } from "lucide-react";
import { CircularFab } from "./wrapper";

interface FabCtaProps {
  onClick: () => void;
}

export function FabRSVP({ onClick }: FabCtaProps) {
  return (
    <Button
      onClick={onClick}
      className="rounded-full bg-black p-8 text-xl text-gray-200"
    >
      <Calendar className="w-18 h-18" />
      RSVP
    </Button>
  );
}

export function FabClose({ onClick }: FabCtaProps) {
  return (
    <CircularFab onClick={onClick}>
      <X className="h-16 w-16" />
    </CircularFab>
  );
}

export function FabEditCalendar({ onClick }: FabCtaProps) {
  return (
    <Button
      onClick={onClick}
      className="rounded-full bg-black p-8 text-xl text-gray-200"
    >
      <Pencil className="w-18 h-18" />
    </Button>
  );
}
