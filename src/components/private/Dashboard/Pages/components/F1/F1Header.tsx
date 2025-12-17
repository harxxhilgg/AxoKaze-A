import F1Icon from "../../../../../../assets/F1.svg";
import { useF1Store } from "../../../../../../stores/f1Store";
import { ChevronRight } from "lucide-react";
import { useUIStore } from "../../../../../../stores";

const F1Header = () => {
  const {
    selectedYear,
    isLoading,
    loadDriverStandings,
    loadConstructorStandings,
  } = useF1Store();

  const {
    setShowF1YearDropdown,
    showF1YearDropdown,
    setShowDriverStandingsPopup,
    setShowConstructorStandingsPopup,
  } = useUIStore();

  const handleDriverStandings = async () => {
    await loadDriverStandings(selectedYear);
    setShowDriverStandingsPopup(true);
  };

  const handleConstructorStandings = async () => {
    await loadConstructorStandings(selectedYear);
    setShowConstructorStandingsPopup(true);
  };

  const now = new Date();

  // march 10, 2026 at 00:00
  const march10_2026 = new Date("2026-03-10T00:00:00Z");

  const shouldShowButtons =
    selectedYear < 2026 || (selectedYear === 2026 && now >= march10_2026);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 items-start lg:items-center justify-between">
      <div className="flex items-center gap-4 select-none">
        <img
          src={F1Icon}
          className="w-24 h-24 lg:w-30 lg:h-30 object-contain"
        />
        <p className="font-f1wide text-lg lg:text-[20px]">Formula 1</p>
      </div>

      {/* year dropdown button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center font-f1reg gap-2 sm:gap-3 lg:gap-4 w-full lg:w-auto">
        {shouldShowButtons && (
          <>
            <button
              disabled={isLoading}
              onClick={handleDriverStandings}
              className="flex items-center justify-center gap-2 w-full sm:w-auto h-10 px-4 rounded-lg bg-zinc-300 dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-50/15 duration-300 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              title="Driver Standings"
            >
              <span className="font-semibold text-sm lg:text-base text-zinc-900 dark:text-zinc-100">
                Driver Standings
              </span>
            </button>

            <button
              onClick={handleConstructorStandings}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 w-full sm:w-auto h-10 px-4 rounded-lg bg-zinc-300 dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-50/15 duration-300 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              title="Constructor Standings"
            >
              <span className="font-semibold text-sm lg:text-base text-zinc-900 dark:text-zinc-100">
                Constructor Standings
              </span>
            </button>
          </>
        )}

        <button
          onClick={() => setShowF1YearDropdown(true)}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 w-full sm:w-auto h-10 pl-4 pr-2 rounded-lg bg-zinc-300 dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-50/15 duration-300 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
          title="Select Season"
        >
          <span className="font-semibold text-sm lg:text-base text-zinc-900 dark:text-zinc-100">
            {selectedYear}
          </span>
          <ChevronRight
            size={18}
            className={`transition duration-300 text-zinc-700 dark:text-zinc-300 ${showF1YearDropdown ? "rotate-90" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};

export default F1Header;
