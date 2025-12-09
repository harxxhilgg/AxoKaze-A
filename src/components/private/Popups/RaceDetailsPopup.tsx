import { X, Eye, EyeOff } from "lucide-react";
import { useF1Store } from "../../../stores/f1Store";
import { useUIStore } from "../../../stores";
import { getFlagUrl } from "../../../lib/countryCodeMap";
import { usePopupClose } from "../../../hooks/usePopupClose";
import { useEffect, useState } from "react";

const RaceDetailsPopup = () => {
  const { selectedRace, isLoadingResults } = useF1Store();
  const { setShowRaceDetailsPopup } = useUIStore();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Check if race has happened
  const hasResults = selectedRace?.results && selectedRace.results.length > 0;

  // Toggle sessions visibility (only when race has results)
  const [showSessions, setShowSessions] = useState(false);

  usePopupClose(() => setShowRaceDetailsPopup(false));

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Reset showSessions when popup closes/opens
  useEffect(() => {
    setShowSessions(false);
  }, [selectedRace]);
  if (!selectedRace) return null;

  const handleClose = () => setShowRaceDetailsPopup(false);

  // Format session time to user's local timezone
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
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs"
      onClick={handleClose}
    >
      <div
        className={`bg-white dark:bg-zinc-900 rounded-xl w-[90vw] max-w-5xl max-h-[85vh] overflow-hidden flex flex-col transform transition-all duration-300 border-2 border-zinc-50/10 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
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

            {/* Toggle button + Close button */}
            <div className="flex items-center gap-2">
              {/* Toggle Button - only show if race has results */}
              {hasResults && (
                <button
                  onClick={() => setShowSessions(!showSessions)}
                  className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-zinc-300 dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-50/15 duration-300 transition-all cursor-pointer active:scale-95 font-f1reg"
                  title={showSessions ? "Hide Sessions" : "Show Sessions"}
                >
                  {showSessions ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                    Sessions
                  </span>
                </button>
              )}

              {/* Close button */}
              <button
                onClick={handleClose}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg duration-300 transition cursor-pointer active:scale-95"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {isLoadingResults ? (
            <p className="p-6 text-center font-f1reg">Loading...</p>
          ) : !hasResults ? (
            // ===== NO RESULTS - SHOW ONLY SESSIONS =====
            <div className="flex-1 overflow-y-auto p-6">
              <h3 className="text-lg font-f1wide mb-2">
                Upcoming Race Schedule
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                This race hasn't taken place yet. Here are the session times:
              </p>

              <div className="space-y-3">
                {selectedRace.sessions?.map((session) => (
                  <div
                    key={session.type}
                    className="flex justify-between items-center p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700"
                  >
                    <span className="font-f1wide text-base">
                      {session.type}
                    </span>
                    <span className="font-f1reg text-sm text-zinc-600 dark:text-zinc-400">
                      {formatSessionTime(session.dateTimeUTC)}
                    </span>
                  </div>
                ))}

                {/* main race time */}
                <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-300 dark:border-red-700">
                  <span className="font-f1wide text-base text-red-700 dark:text-red-400">
                    RACE
                  </span>
                  <span className="font-f1reg text-sm text-red-600 dark:text-red-400">
                    {formatSessionTime(
                      `${selectedRace.date}T${selectedRace.time}`
                    )}
                  </span>
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400 font-f1reg">
                Check back after the race to see results!
              </p>
            </div>
          ) : (
            <>
              {/* sessions Section (collapsible) */}
              {showSessions && (
                <div className="border-b border-zinc-200 dark:border-zinc-700 p-6 bg-zinc-50 dark:bg-zinc-900/50">
                  <h3 className="text-lg font-f1wide mb-4">Session Schedule</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedRace.sessions?.map((session) => (
                      <div
                        key={session.type}
                        className="flex justify-between items-center p-3 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700"
                      >
                        <span className="font-f1wide text-sm">
                          {session.type}
                        </span>
                        <span className="font-f1reg text-xs text-zinc-600 dark:text-zinc-400">
                          {formatSessionTime(session.dateTimeUTC)}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-300 dark:border-red-700">
                      <span className="font-f1wide text-sm text-red-700 dark:text-red-400">
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

              {/* results Table */}
              <div className="flex-1 flex flex-col overflow-hidden">
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

                {/* table Body - scrollable */}
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
                            {result.Driver.givenName} {result.Driver.familyName}
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaceDetailsPopup;
