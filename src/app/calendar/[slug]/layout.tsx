"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { CalendarProvider } from "./components/CalendarProvider";
import { FloatingActionButtonBar } from "./components/fab";
import { SideDrawer } from "./components/side-drawer";
export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <CalendarProvider>
      <SidebarProvider >
        <SideDrawer />
        {children}
        <FloatingActionButtonBar />

      </SidebarProvider>
    </CalendarProvider>
  );
} 