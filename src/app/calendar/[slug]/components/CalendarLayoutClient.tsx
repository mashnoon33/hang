"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { CalendarProvider } from "./CalendarProvider";
import { FloatingActionButtonBar } from "./fab";
import { SideDrawer } from "./side-drawer";

export function CalendarLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CalendarProvider>
      <SidebarProvider>
        <SideDrawer />
        {children}
        <FloatingActionButtonBar />
      </SidebarProvider>
    </CalendarProvider>
  );
} 