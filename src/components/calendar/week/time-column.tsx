import { format } from "date-fns";
import { HOURS } from "./utils";

export function TimeColumn() {
  return (
    <div className="w-16 bg-white">
      {HOURS.map((hour) => (
        <div
          key={hour}
          className="h-12 border-b border-r border-gray-200 pr-2 text-right text-xs text-gray-500"
        >
          {format(new Date().setHours(hour), "ha")}
        </div>
      ))}
    </div>
  );
}
