"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationButtonProps {
  onClick: () => void;
  direction: "previous" | "next";
}

export function NavigationButton({ onClick, direction }: NavigationButtonProps) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="icon"
      className="h-8 w-8 rounded-full"
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
} 