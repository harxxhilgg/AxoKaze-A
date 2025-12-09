import { X } from "lucide-react";
import { useF1Store } from "../../../stores/f1Store";
import { useUIStore } from "../../../stores";
import { getFlagUrl } from "../../../lib/countryCodeMap";
import { usePopupClose } from "../../../hooks/usePopupClose";
import { useEffect, useState } from "react";

const RaceDetailsPopup = () => {
  const { selectedRace, isLoadingResults } = useF1Store();
  const { setShowRaceDetailsPopup } = useUIStore();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  usePopupClose(() => setShowRaceDetailsPopup(false));

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (!selectedRace) return null;

  const handleClose = () => setShowRaceDetailsPopup(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs"
      onClick={handleClose}
    >
      <div
        className={`bg-white dark:bg-zinc-900 rounded-xl w-[90vw] max-w-5xl max-h-[85vh] overflow-hidden flex flex-col transform transition-all duration-300  border-2 border-zinc-50/10 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="relative p-6 border-b border-zinc-200 dark:border-zinc-800">
          {/* flag background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 saturate-50 blur-xs"
            style={{
              backgroundImage: `url(${getFlagUrl(
                selectedRace.circuit.location.country
              )})`,
            }}
          />

          <div className="relative z-10 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-f1wide font-bold">
                {selectedRace.raceName}
              </h2>

              <p className="text-zinc-600 dark:text-zinc-400 mt-1 font-f1reg">
                {selectedRace.circuit.location.locality},{" "}
                {selectedRace.circuit.location.country} • Round{" "}
                {selectedRace.round}
              </p>

              <button
                className="flex justify-center items-center gap-1 text-zinc-600 dark:text-zinc-400 mt-1 font-f1reg cursor-pointer hover:underline hover:text-zinc-50 transition-all duration-200"
                onClick={() => {
                  window.open(
                    selectedRace.circuit.circuitUrl,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                {selectedRace.circuit.circuitName}
              </button>
            </div>

            <button
              onClick={handleClose}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg duration-300 transition cursor-pointer active:scale-95"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* results Table */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {isLoadingResults ? (
            <p className="p-6">Loading results...</p>
          ) : selectedRace.results.length === 0 ? (
            <p className="text-center text-zinc-500 dark:text-zinc-400">
              No results available for this race yet.
            </p>
          ) : (
            <>
              {/* table header - fixed */}
              <div className="px-6 pt-4 pb-4 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
                <div
                  className="grid grid-cols-[60px_1fr_180px_60px_140px_80px] gap-4 font-f1reg font-semibold text-sm text-left"
                  style={{ paddingRight: "1.7rem" }}
                >
                  <div>Pos</div>
                  <div>Driver</div>
                  <div>Team</div>
                  <div>Grid</div>
                  <div>Time</div>
                  <div>Points</div>
                </div>
              </div>

              {/* table Body - Scrollable */}
              <div className="flex-1 overflow-y-auto px-6 py-2">
                <div className="font-f1reg pr-4">
                  {selectedRace.results.map((result) => (
                    <div
                      key={result.Driver.driverId}
                      className="grid grid-cols-[60px_1fr_180px_60px_140px_80px] gap-4 py-3 border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left"
                    >
                      <div className="font-f1wide text-md">
                        {result.position}
                      </div>

                      <div>
                        <p className="font-semibold">
                          {result.Driver.givenName}{" "}
                          {result.Driver.familyName}{" "}
                        </p>
                        <p className="text-sm text-zinc-500">
                          {result.Driver.code}
                        </p>
                      </div>

                      <div>{result.Constructor.name}</div>

                      <div>{result.grid}</div>

                      <div className="text-sm">
                        {result.Time?.time || result.status}
                      </div>

                      <div className="font-bold">{result.points}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaceDetailsPopup;
