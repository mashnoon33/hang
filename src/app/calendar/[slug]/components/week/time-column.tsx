import { format } from "date-fns";
import { HOURS } from "./utils";

export function TimeColumn() {
  return (
    <div className="bg-white w-14">
      {HOURS.map((hour) => (
        <div key={hour} className="h-12 border-b border-gray-100 text-right pr-2 text-xs text-gray-500 border-r border-gray-200">
          {format(new Date().setHours(hour), "ha")}
        </div>
      ))}
    </div>
  );
} 