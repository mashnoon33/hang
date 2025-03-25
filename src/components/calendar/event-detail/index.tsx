
import { TopNav } from "@/components/top-nav";
import { EventDetailIsolate } from "./detail-isolate";


export function EventDetail() {
  return (
    <div className="flex h-full w-full flex-col">
      <TopNav />
      <EventDetailIsolate />
    </div>
  );
}


