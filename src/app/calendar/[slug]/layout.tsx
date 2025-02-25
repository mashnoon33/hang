"use client";

import { CalendarProvider } from "./components/CalendarProvider";
import { SideDrawer } from "./components/side-drawer";
export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CalendarProvider>
      <div className="flex h-full ">
        {/* Side Drawer */}
        <div className="w-80  border-r border-gray-200 overflow-hidden">
          <div className="p-4">
            <SideDrawer />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Calendar Content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </CalendarProvider>
  );
} 