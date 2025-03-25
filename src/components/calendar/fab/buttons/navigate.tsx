"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { CircularFab } from "./wrapper";

interface FABNavigateProps {
  direction: "left" | "right";
  onClick: () => void;
}

export function FABNavigate({ direction, onClick }: FABNavigateProps) {
  return (
    <CircularFab onClick={onClick}>
      {direction === "left" ? (
        <ChevronLeft className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
    </CircularFab>
  );
}
