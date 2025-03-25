
interface TimeSlotProps {
  day: Date;
  hour: number;
  onTimeSlotSelect: (date: Date) => void;
  isToday: boolean;
  isWeekend: boolean;
}

export function TimeSlot({
  day,
  hour,
  onTimeSlotSelect,
  isToday,
  isWeekend,
}: TimeSlotProps) {
  return (
    <div
      className={`h-12 border-b ${isWeekend ? "border-gray-200 bg-gray-50" : ""} ${isToday ? "border-blue-100 bg-blue-50" : ""} `}
      onClick={() => {
        const date = new Date(day);
        date.setHours(hour);
        onTimeSlotSelect(date);
      }}
    />
  );
}