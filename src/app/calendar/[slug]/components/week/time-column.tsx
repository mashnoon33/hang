import { format } from "date-fns";
import { HOURS } from "./utils";

export function TimeColumn() {
  return (
    <div className="bg-white">
      {HOURS.map((hour) => (
        <div key={hour} className="h-12 border-b border-gray-100 text-right pr-2 text-sm text-gray-500">
          {format(new Date().setHours(hour), "ha")}
        </div>
      ))}
    </div>
  );
} 