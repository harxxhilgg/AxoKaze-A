import { X, Eye, EyeOff, MapPin } from "lucide-react";
import { useF1Store } from "../../../stores/f1Store";
import { useUIStore } from "../../../stores";
import { getFlagUrl } from "../../../lib/countryCodeMap";
import { usePopupClose } from "../../../hooks/usePopupClose";
import { useEffect, useState } from "react";

const RaceDetailsPopup = () => {
  const { selectedRace, isLoadingResults } = useF1Store();
  const { setShowRaceDetailsPopup } = useUIStore();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // check if race has happened
  const hasResults = selectedRace?.results && selectedRace.results.length > 0;

  // toggle sessions visibility (only when race has results)
  const [showSessions, setShowSessions] = useState(false);

  usePopupClose(() => setShowRaceDetailsPopup(false));

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // reset showSessions when popup closes/opens
  useEffect(() => {
    setShowSessions(false);
  }, [selectedRace]);

  if (!selectedRace) return null;

  const handleClose = () => setShowRaceDetailsPopup(false);

  // format session time to user's local timezone
  const formatSessionTime = (dateTimeUTC: string) => {
    return new Date(dateTimeUTC).toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs backdrop-brightness-50 px-2 sm:px-4 selection:bg-zinc-50/15 cursor-pointer"
      onClick={handleClose}
    >
      <div
        className={`bg-white dark:bg-zinc-900 rounded-xl w-full sm:w-[90vw] max-w-5xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden flex flex-col transform transition-all duration-300 border-2 border-zinc-50/10 cursor-default ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="relative p-4 sm:p-6 border-b border-zinc-200 dark:border-zinc-800">
          {/* flag background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 saturate-50 blur-xs"
            style={{
              backgroundImage: `url(${getFlagUrl(
                selectedRace.circuit.location.country
              )})`,
            }}
          />

          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-f1wide font-bold line-clamp-2">
                {selectedRace.raceName}
              </h2>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1 font-f1reg">
                {selectedRace.circuit.location.locality},{" "}
                {selectedRace.circuit.location.country} • Round{" "}
                {selectedRace.round}
              </p>

              <button
                className="flex justify-center items-center gap-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1 font-f1reg cursor-pointer hover:underline hover:text-zinc-50 transition-all duration-200"
                onClick={() => {
                  window.open(
                    selectedRace.circuit.circuitUrl,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />

                <span className="line-clamp-1">
                  {selectedRace.circuit.circuitName}
                </span>
              </button>
            </div>

            {/* toggle button + close button */}
            <div className="flex items-center gap-2 self-end sm:self-start">
              {/* toggle Button - only show if race has results */}
              {hasResults && (
                <button
                  onClick={() => setShowSessions(!showSessions)}
                  className="flex items-center justify-center gap-2 h-9 sm:h-10 px-3 sm:px-4 rounded-lg bg-zinc-300 dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-50/15 duration-300 transition-all cursor-pointer active:scale-95 font-f1reg"
                  title={showSessions ? "Hide Sessions" : "Show Sessions"}
                >
                  {showSessions ? (
                    <EyeOff size={14} className="sm:w-4 sm:h-4" />
                  ) : (
                    <Eye size={14} className="sm:w-4 sm:h-4" />
                  )}
                  <span className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
                    Sessions
                  </span>
                </button>
              )}

              {/* close button */}
              <button
                onClick={handleClose}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg duration-300 transition cursor-pointer active:scale-95"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {isLoadingResults ? (
            <p className="p-4 sm:p-6 text-center font-f1reg">Loading...</p>
          ) : !hasResults ? (
            // ===== NO RESULTS - SHOW ONLY SESSIONS =====
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-f1wide mb-2">
                Race Schedule
              </h3>

              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-4 sm:mb-6 font-f1reg">
                This race hasn't taken place yet. Here are the session times.
              </p>

              <div className="space-y-2 sm:space-y-3">
                {selectedRace.sessions?.map((session) => (
                  <div
                    key={session.type}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0 p-3 sm:p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700"
                  >
                    <span className="font-f1wide text-sm sm:text-base">
                      {session.type}
                    </span>

                    <span className="font-f1reg text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                      {formatSessionTime(session.dateTimeUTC)}
                    </span>
                  </div>
                ))}

                {/* main race time */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-300 dark:border-red-700 shadow-[0px_0px_300px_100px_rgba(255,24,1,0.1)]">
                  <span className="font-f1wide text-sm sm:text-base text-red-700 dark:text-red-400">
                    RACE
                  </span>

                  <span className="font-f1reg text-xs sm:text-sm text-red-600 dark:text-red-400">
                    {formatSessionTime(
                      `${selectedRace.date}T${selectedRace.time}`
                    )}
                  </span>
                </div>
              </div>

              <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-f1reg">
                Check back after the race to see results!
              </p>
            </div>
          ) : (
            <>
              {/* sessions section (collapsible) */}
              {showSessions && (
                <div className="border-b border-zinc-200 dark:border-zinc-700 p-4 sm:p-6 bg-zinc-50 dark:bg-zinc-900/50">
                  <h3 className="text-base sm:text-lg font-f1wide mb-3 sm:mb-4">
                    Session Schedule
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {selectedRace.sessions?.map((session) => (
                      <div
                        key={session.type}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0 p-2 sm:p-3 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700"
                      >
                        <span className="font-f1wide text-xs sm:text-sm">
                          {session.type}
                        </span>

                        <span className="font-f1reg text-xs text-zinc-600 dark:text-zinc-400">
                          {formatSessionTime(session.dateTimeUTC)}
                        </span>
                      </div>
                    ))}

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0 p-2 sm:p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-300 dark:border-red-700">
                      <span className="font-f1wide text-xs sm:text-sm text-red-700 dark:text-red-400">
                        RACE
                      </span>

                      <span className="font-f1reg text-xs text-red-600 dark:text-red-400">
                        {formatSessionTime(
                          `${selectedRace.date}T${selectedRace.time}`
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* results table */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* table header - fixed - hide on mobile */}
                <div className="hidden lg:block px-4 sm:px-6 pt-4 pb-4 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
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

                {/* table Body - scrollable */}
                <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-2">
                  <div className="font-f1reg sm:pr-4">
                    {selectedRace.results.map((result) => (
                      <div
                        key={result.Driver.driverId}
                        className="grid grid-cols-[40px_1fr_50px] lg:grid-cols-[60px_1fr_180px_60px_140px_80px] gap-2 lg:gap-4 py-2 sm:py-3 border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left"
                      >
                        <div className="font-f1wide text-sm lg:text-md">
                          {result.position}
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-sm lg:text-base truncate">
                            {result.Driver.givenName} {result.Driver.familyName}
                          </p>

                          <p className="text-xs lg:text-sm text-zinc-500 truncate">
                            {result.Constructor.name}
                          </p>

                          <p className="text-xs text-zinc-400 lg:hidden">
                            Grid: {result.grid}
                          </p>
                        </div>

                        <div className="hidden lg:block">
                          {result.Constructor.name}
                        </div>

                        <div className="hidden lg:block">{result.grid}</div>

                        <div className="hidden lg:block text-sm">
                          {result.Time?.time || result.status}
                        </div>

                        <div className="font-bold text-sm lg:text-base text-right lg:text-left">
                          {result.points}
                        </div>
                      </div>
                    ))}
                  </div>
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
