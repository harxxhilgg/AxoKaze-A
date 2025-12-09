import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { usePopupClose } from "../../../hooks/usePopupClose";
import { useF1Store } from "../../../stores/f1Store";
import { useUIStore } from "../../../stores";
import { getNationalityFlag } from "../../../lib/nationalityToFlag";
import F1Logo from "../../../assets/F1.svg";

const ConstructorStandingsPopup = () => {
  const { constructorStandings, selectedYear } = useF1Store();
  const { setShowConstructorStandingsPopup } = useUIStore();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  usePopupClose(() => setShowConstructorStandingsPopup(false));

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (!constructorStandings) return null;

  const handleClose = () => setShowConstructorStandingsPopup(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs"
      onClick={handleClose}
    >
      <div
        className={`bg-white dark:bg-zinc-900 rounded-xl w-[90vw] max-w-5xl max-h-[85vh] overflow-hidden flex flex-col transform transition-all duration-300 border-2 border-zinc-50/10 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
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
                Constructor Standings • {selectedYear}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1 font-f1reg">
                Races: {constructorStandings.round}
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
            <div className="grid grid-cols-[60px_1fr_100px_100px_120px] gap-4 font-f1reg font-semibold text-sm text-left">
              <div>Pos</div>
              <div>Constructor</div>
              <div>Wins</div>
              <div>Points</div>
              <div>Nationality</div>
            </div>
          </div>

          {/* table Body - Scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-2">
            <div className="font-f1reg pr-4">
              {constructorStandings.standings.map((standing, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[60px_1fr_100px_100px_100px] gap-4 py-3 border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left"
                >
                  <div className="font-f1wide text-md">{standing.position}</div>

                  <div>
                    <p className="font-semibold flex">
                      <span>{standing.Constructor.name}</span>
                    </p>
                  </div>

                  <div>{standing.wins}</div>

                  <div className="font-semibold">{standing.points}</div>

                  <div>
                    <span className="font-semibold flex gap-2">
                      <p
                        className="cursor-default"
                        title={`${standing.Constructor.nationality}`}
                      >
                        {getNationalityFlag(standing.Constructor.nationality)}
                      </p>
                      <p>{standing.Constructor.nationality}</p>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstructorStandingsPopup;
