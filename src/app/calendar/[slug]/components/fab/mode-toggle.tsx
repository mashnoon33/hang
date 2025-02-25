"use client";

import { CalendarView, useCalendar } from "../CalendarProvider";
import { useEffect, useState } from "react";
import { Calendar, List, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CircularFab } from "./const";

export function CalendarModeToggle() {
    const { currentView, setCurrentView } = useCalendar();
    const [isExpanded, setIsExpanded] = useState(false);



    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleViewChange = (view: CalendarView) => {
        setCurrentView(view);
        setIsExpanded(false);
    };


    return (
        <div className=" flex flex-col items-end space-y-2 relative">
            {isExpanded && (
                <div className="absolute bottom-20 right-0 flex flex-col gap-2">
                    <Button
                        onClick={() => handleViewChange("month")}
                        className=" h-12 bg-slate-800 text-white rounded-full shadow-lg flex items-center justify-center"
                    >
                        <Calendar className="w- h-6" />
                        <span className="text-sm">Month</span>
                    </Button>
                    <Button
                        onClick={() => handleViewChange("week")}
                        className=" h-12 bg-slate-800 text-white rounded-full shadow-lg flex items-center justify-center"
                    >
                        <List className="w-6 h-6" />
                        <span className="text-sm">Week</span>
                    </Button>
                    <Button
                        onClick={() => handleViewChange("3day")}
                        className=" h-12 bg-slate-800 text-white rounded-full shadow-lg flex items-center justify-center"
                    >
                        <List className="w-6 h-6" />
                        <span className="text-sm">3 Day</span>
                    </Button>
                </div>
            )}
            <CircularFab
                onClick={toggleExpand}
            >
                {isExpanded ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </CircularFab>
        </div>
    );
}

