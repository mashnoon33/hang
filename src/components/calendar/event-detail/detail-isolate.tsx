import { EventDetailSkeleton } from "./skeleton";
import { useCal } from "../calendar-provider";
import { MarkdownRenderer } from "../side-drawer/markdown";


export function EventDetailIsolate() {
  const { calendar } = useCal();
  return (
    <div className="p-4">
      {!calendar ? (
        <EventDetailSkeleton />
      ) : (
        <div className="mb-20">
          <div className="mb-4 text-4xl font-bold">{calendar.name}</div>
          <MarkdownRenderer markdown={calendar.description ?? ""} />
        </div>
      )}
    </div>
  );
}
