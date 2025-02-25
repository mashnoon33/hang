"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { CircularFab } from "./const";
interface FABNavigateProps {
    direction: "left" | "right";
    onClick: () => void;
}

export function FABNavigate({ direction, onClick }: FABNavigateProps) {
    return (
        <CircularFab onClick={onClick}>
            {direction === "left" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </CircularFab>
    );
}