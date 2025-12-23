import F1Icon from "../../../../../../assets/F1.svg";
import { useF1Store } from "../../../../../../stores/f1Store";
import { ChevronRight, ExternalLink } from "lucide-react";
import { useUIStore } from "../../../../../../stores";

const F1Header = () => {
  const {
    selectedYear,
    isLoading,
    setSelectedYear,
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
    <>
      {selectedYear !== 2026 && (
        <button
          className="group w-full flex justify-between items-center mt-8 h-14 px-5 rounded-lg relative transition duration-300 select-none border border-zinc-400 dark:border-zinc-900 hover:border-zinc-900 hover:dark:border-zinc-100 cursor-pointer"
          style={{
            backgroundColor: "#0a0a0a",
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #444444 0.5px, transparent 1px),
              radial-gradient(circle at 75% 75%, #333333 0.5px, transparent 1px)
            `,
            backgroundSize: "10px 10px",
            imageRendering: "pixelated",
          }}
          onClick={() => setSelectedYear(2026)}
          title="Check 2026 season calendar"
        >
          <div className="font-f1wide text-black dark:text-white">
            Eyes on the future — the 2026 calendar has been released
          </div>

          <div className="transition duration-300 text-zinc-200 dark:text-zinc-800 group-hover:text-zinc-800 group-hover:dark:text-zinc-200">
            <ExternalLink size={30} color="currentColor" />
          </div>
        </button>
      )}

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
    </>
  );
};

export default F1Header;
