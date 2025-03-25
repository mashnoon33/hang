import { TopNav } from "@/components/top-nav";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { EventDetailIsolate } from "../event-detail/detail-isolate";

export function SideDrawer() {
  return (
    <Sidebar>
      <SidebarContent>
        <TopNav />
        <EventDetailIsolate />
      </SidebarContent>
    </Sidebar>
  );
}
