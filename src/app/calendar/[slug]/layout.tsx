"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { CalendarProvider } from "./components/CalendarProvider";
import { SideDrawer } from "./components/side-drawer";
import { useViewportWidth } from "@/lib/hooks/use-viewport-width";
import { FloatingActionButtonBar } from "./components/fab";
export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { size } = useViewportWidth();

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