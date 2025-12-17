import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useWeatherStore } from "../../../../../../stores";
import { usePopupClose } from "../../../../../../hooks/usePopupClose";
import type { TimelineView } from "../../../../../../types";
import { Calendar, Clock } from "lucide-react";

interface WeatherFilterMenuProps {
  onClose: () => void;
}

const WeatherFilterMenu: React.FC<WeatherFilterMenuProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { timelineView, setTimelineView } = useWeatherStore();

  usePopupClose(onClose);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleViewChange = (view: TimelineView) => {
    setTimelineView(view);
    onClose();
  };

  const viewOptions = [
    {
      value: "hourly" as TimelineView,
      label: "Hourly Forecast",
      icon: Clock,
      description: "Next 48 hours",
    },
    {
      value: "daily" as TimelineView,
      label: "Daily Forecast",
      icon: Calendar,
      description: "Next 7 days",
    },
  ];

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0" onClick={onClose}>
        <div
          ref={menuRef}
          className={`absolute top-50 right-14 bg-white dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-700 rounded-[14px] shadow-lg p-2 min-w-52 transform transition-all duration-200
            ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* options */}
          <div className="space-y-1">
            {viewOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = timelineView === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => handleViewChange(option.value)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-display text-sm transition-all duration-200 cursor-pointer active:scale-95 ${
                    isSelected
                      ? "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/80"
                  }`}
                >
                  <Icon size={18} className="shrink-0" />
                  <div className="flex-1 text-left">
                    <p className="font-semibold">{option.label}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {option.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherFilterMenu;
