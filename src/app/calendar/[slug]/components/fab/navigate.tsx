"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
interface FABNavigateProps {
    direction: "left" | "right";
    onClick: () => void;
}

export function FABNavigate({ direction, onClick }: FABNavigateProps) {
    return (
        <Button onClick={onClick} className="p-3 text-gray-200 rounded-full">
            {direction === "left" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </Button>
    );
}