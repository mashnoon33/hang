interface ViewSwitcherProps {
  currentView: "month" | "week";
  onViewChange: (view: "month" | "week") => void;
}

export function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="flex space-x-2 bg-white rounded-lg shadow-sm border p-1">
      <button
        onClick={() => onViewChange("month")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
          ${currentView === "month"
            ? "bg-gray-100 text-gray-900"
            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          }`}
      >
        Month
      </button>
      <button
        onClick={() => onViewChange("week")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
          ${currentView === "week"
            ? "bg-gray-100 text-gray-900"
            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          }`}
      >
        Week
      </button>
    </div>
  );
} 