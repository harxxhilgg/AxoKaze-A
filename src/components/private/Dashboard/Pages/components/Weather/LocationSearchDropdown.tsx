import type React from "react";
import type { Location } from "../../../../../../types";
import { MapPin } from "lucide-react";

interface LocationSearchDropdownProps {
  showDropdown: boolean;
  locations: Location[];
  highlightedIndex: number;
  searchTerm: string;
  dropdownRef: React.RefObject<HTMLDivElement>;
  setItemRef: (index: number) => (el: HTMLDivElement | null) => void;
  selectLocation: (location: Location) => void;
  isLoading: boolean;
}

const LocationSearchDropdown: React.FC<LocationSearchDropdownProps> = ({
  showDropdown,
  locations,
  highlightedIndex,
  searchTerm,
  dropdownRef,
  setItemRef,
  selectLocation,
  isLoading,
}) => {
  if (!showDropdown) return null;

  if (isLoading) {
    return (
      <div
        ref={dropdownRef}
        className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg p-4 font-display"
      >
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Searching locations...
          </span>
        </div>
      </div>
    );
  }

  if (locations.length === 0 && searchTerm) {
    return (
      <div
        ref={dropdownRef}
        className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg p-4 font-display"
      >
        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
          No locations found
        </p>
      </div>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg max-h-96 overflow-y-auto font-display"
    >
      {locations.map((location, index) => (
        <div
          key={location.id}
          ref={setItemRef(index)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            selectLocation(location);
          }}
          onMouseDown={(e) => e.preventDefault()}
          className={`
            flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors
            ${
              index === highlightedIndex
                ? "bg-blue-50 dark:bg-blue-900/25"
                : "hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
            }
            ${index === locations.length - 1 ? "" : "border-b border-zinc-100 dark:border-zinc-700"}
          `}
        >
          <div className="shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <MapPin size={16} className="text-blue-600 dark:text-blue-400" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
              {location.name}
            </p>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
              {location.region && `${location.region}, `}
              {location.country}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchDropdown;
