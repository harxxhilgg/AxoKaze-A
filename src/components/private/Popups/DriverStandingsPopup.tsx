import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { usePopupClose } from "../../../hooks/usePopupClose";
import { useF1Store } from "../../../stores/f1Store";
import { useUIStore } from "../../../stores";
import { getNationalityFlag } from "../../../lib/nationalityToFlag";
import F1Logo from "../../../assets/F1.svg";

const DriverStandingsPopup = () => {
  const { driverStandings, selectedYear } = useF1Store();
  const { setShowDriverStandingsPopup } = useUIStore();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  usePopupClose(() => setShowDriverStandingsPopup(false));

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (!driverStandings) return null;

  const handleClose = () => setShowDriverStandingsPopup(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs backdrop-brightness-50 selection:bg-zinc-50/15 cursor-pointer"
      onClick={handleClose}
    >
      <div
        className={`bg-white dark:bg-zinc-900 rounded-xl w-[90vw] max-w-5xl max-h-[85vh] overflow-hidden flex flex-col transform transition-all duration-300 border-2 border-zinc-50/10 cursor-default ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="relative p-6 border-b border-zinc-200 dark:border-zinc-800">
          {/* F1 logo background */}
          <img
            src={F1Logo}
            alt=""
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-auto opacity-15 pointer-events-none"
          />

          <div className="relative z-10 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-f1wide font-bold">
                Driver Standings • {selectedYear}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1 font-f1reg">
                Races: {driverStandings.round}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg duration-300 transition cursor-pointer active:scale-95"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* standings Table */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* table header - fixed */}
          <div className="px-6 pt-4 pb-4 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
            <div
              className="grid grid-cols-[60px_1fr_180px_80px_80px] gap-4 font-f1reg font-semibold text-sm text-left"
              style={{ paddingRight: "1.7rem" }}
            >
              <div>Pos</div>
              <div>Driver</div>
              <div>Team</div>
              <div>Wins</div>
              <div>Points</div>
            </div>
          </div>

          {/* table Body - Scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-2">
            <div className="font-f1reg pr-4">
              {driverStandings.standings.map((standing, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[60px_1fr_180px_80px_80px] gap-4 py-3 border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left"
                >
                  <div className="font-f1wide text-md">{standing.position}</div>

                  <div>
                    <p className="font-semibold flex items-center gap-2">
                      <span
                        className="text-lg cursor-default"
                        title={`${standing.Driver.nationality}`}
                      >
                        {getNationalityFlag(standing.Driver.nationality)}
                      </span>

                      <span>
                        {standing.Driver.givenName} {standing.Driver.familyName}
                      </span>
                    </p>
                    <p className="text-sm text-zinc-500">
                      {standing.Driver.code}
                    </p>
                  </div>

                  <div>{standing.Constructors[0]?.name || "N/A"}</div>

                  <div>{standing.wins}</div>

                  <div className="font-bold">{standing.points}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverStandingsPopup;
