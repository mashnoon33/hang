"use client";

import { useCalendar } from "../CalendarProvider";
import { useEffect, useState } from "react";
import { Calendar, List, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingActionButton() {
    const { currentView, setCurrentView } = useCalendar();
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsVisible(window.innerWidth <= 768); // md or smaller
        };

        handleResize(); // Check on mount
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleViewChange = (view: string) => {
        setCurrentView(view);
        setIsExpanded(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-2">
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
            <button
                onClick={toggleExpand}
                className="w-14 h-14 bg-slate-800 text-white rounded-full shadow-lg flex items-center justify-center"
            >
                {isExpanded ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>
    );
}

