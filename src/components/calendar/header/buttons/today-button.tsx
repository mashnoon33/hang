"use client";

import { Button } from "@/components/ui/button";

interface TodayButtonProps {
  onClick: () => void;
}

export function TodayButton({ onClick }: TodayButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="sm"
      className="h-8"
    >
      Today
    </Button>
  );
} 