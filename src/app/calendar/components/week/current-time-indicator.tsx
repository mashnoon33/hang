export function CurrentTimeIndicator() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentTimePosition = (currentHour * 60 + currentMinutes) / (24 * 60) * 100;

  return (
    <div
      className="absolute left-0 w-full h-0.5 bg-red-500"
      style={{ top: `${currentTimePosition}%` }} />
  );
}
