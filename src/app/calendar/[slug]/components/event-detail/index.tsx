import { useCalendar } from "../CalendarProvider";
import { MarkdownRenderer } from "../side-drawer";

export function EventDetail({ setShowEventDetail }: { setShowEventDetail?: (show: boolean) => void }) {
  return (
    <div className="flex flex-col h-full">
      <EventDetailIsolate />
    </div>
  );
}

export function EventDetailIsolate() {
  const { calendar } = useCalendar();
  return (
    <div className="p-4">
        {!calendar ? (
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-12 bg-gray-300 rounded"></div>
          <div className="h-80 bg-gray-300 rounded mb-4"></div>
          <div className="h-8 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>

        </div>
      ) : (
        <div className="mb-20">
          <div className="text-4xl mb-4 font-bold">{calendar.name}</div>
          <MarkdownRenderer markdown={calendar.description ?? ""} />
        </div>
      )}

    </div>
  );
}