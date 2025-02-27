"use client";

import { CalendarProvider } from "./components/CalendarProvider";
import { SideDrawer } from "./components/side-drawer";
import { FloatingActionButtonBar } from "./components/fab";
export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CalendarProvider>
      <div className="flex h-screen w-full">
        {/* Side Drawer */}
        <div className="w-[20rem]  border-r border-gray-200 min-w-[350px] h-screen  hidden lg:block">
          <SideDrawer />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col w-[calc(100%-20rem)]  overflow-auto">
          {/* Calendar Content */}
          <div className="flex-1 overflow-auto h-full">
            {children}
          </div>
        </div>
        <FloatingActionButtonBar />
      </div>
    </CalendarProvider>
  );
} 