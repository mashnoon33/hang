"use client";

import { useCalendar } from "../CalendarProvider";
import { useEffect, useState } from "react";
import { Calendar, List, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CalendarModeToggle() {
    const { currentView, setCurrentView } = useCalendar();
    const [isExpanded, setIsExpanded] = useState(false);



    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleViewChange = (view: "month" | "week" | "3day") => {
        setCurrentView(view);
        setIsExpanded(false);
    };


    return (
        <div className=" flex flex-col items-end space-y-2">
            {isExpanded && (
                <>
                    <Button
                        onClick={() => handleViewChange("month")}
                        className=" h-12 bg-slate-800 text-white rounded-full shadow-lg flex items-center justify-center"
                    >
                        <Calendar className="w-6 h-6" />
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
                </>
            )}
            <Button
                onClick={toggleExpand}
                className="p-3 text-gray-200 rounded-full"
            >
                {isExpanded ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
        </div>
    );
}

