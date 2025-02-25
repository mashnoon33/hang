"use client";

import { Button } from "@/components/ui/button";
import { X, Calendar } from "lucide-react";
import { CircularFab } from "./const";

interface FabCtaProps {
    onClick: () => void;
}

export function FabRSVP({ onClick }: FabCtaProps) {
    return (
        <Button onClick={onClick} className="p-8 text-xl text-gray-200 rounded-full bg-black">
            <Calendar className="w-18 h-18" />
            RSVP
        </Button>
    );
}

export function FabClose({ onClick }: FabCtaProps) {
    return (
        <CircularFab onClick={onClick}>
            <X className="w-16 h-16" />
        </CircularFab>
    );
}