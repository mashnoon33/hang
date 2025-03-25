"use client";
import { CalendarProvider } from "@/components/calendar/calendar-provider";
import { FloatingActionButtonBar } from "@/components/calendar/fab";
import { SideDrawer } from "@/components/calendar/side-drawer";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({
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
