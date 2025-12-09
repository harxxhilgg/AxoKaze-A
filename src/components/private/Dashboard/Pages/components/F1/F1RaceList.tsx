import { useEffect, useState } from "react";
import { useF1Store } from "../../../../../../stores/f1Store";
import { FaCaretRight } from "react-icons/fa";
import { getFlagUrl } from "../../../../../../lib/countryCodeMap";
import { useUIStore } from "../../../../../../stores";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getTimeZones } from "@vvo/tzdb";

const F1RaceList = () => {
  const {
    getCurrentRaces,
    loadRaces,
    loadRaceResults,
    selectedYear,
    isLoading,
    error,
  } = useF1Store();
  const { setShowRaceDetailsPopup } = useUIStore();

  const races = getCurrentRaces(); // gets & stores current year's races

  const [tzAbbr, setTzAbbr] = useState<string>("");

  useEffect(() => {
    loadRaces(selectedYear);
  }, [selectedYear, loadRaces]);

  useEffect(() => {
    const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const zones = getTimeZones();
    const zone = zones.find((z) => z.name === userTz);

    setTzAbbr(zone?.abbreviation || userTz);
  }, []);

  function formateDate(date: string) {
    const parts = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).formatToParts(new Date(date));

    const day = parts.find((p) => p.type === "day")?.value;
    const month = parts.find((p) => p.type === "month")?.value;
    const year = parts.find((p) => p.type === "year")?.value;

    return `${day} ${month}, ${year}`;
  }

  function formatToLocalTime(utcTime: string) {
    const today = new Date().toISOString().split("T")[0];
    const date = new Date(`${today}T${utcTime}`);

    return new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      // timeZoneName: "short",
    }).format(date);
  }

  function shouldShowResults(raceDateISO: string) {
    const raceDate = new Date(raceDateISO);
    const now = new Date();

    // add a day to race date
    raceDate.setDate(raceDate.getDate() + 1);

    return now >= raceDate;
  }

  const handleRaceClick = async (round: number) => {
    // always open popup - will show sessions or results inside
    await loadRaceResults(selectedYear, round);
    setShowRaceDetailsPopup(true);
  };

  if (isLoading)
    return (
      <SkeletonTheme
        baseColor="rgba(156, 163, 175, 0.1)"
        highlightColor="rgba(209, 213, 219, 0.1)"
        direction="ltr"
        borderRadius={20}
      >
        <div className="mt-2 transition-all">
          <h3 className="text-xl font-f1reg mb-6 ml-1 opacity-75">
            {selectedYear} Season
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Skeleton height={220} className="rounded-2xl" />
            <Skeleton height={220} className="rounded-2xl" />
            <Skeleton height={220} className="rounded-2xl" />
            <Skeleton height={220} className="rounded-2xl" />
            <Skeleton height={220} className="rounded-2xl" />
            <Skeleton height={220} className="rounded-2xl" />
            <Skeleton height={220} className="rounded-2xl" />
            <Skeleton height={220} className="rounded-2xl" />
            <Skeleton height={220} className="rounded-2xl" />
            <Skeleton height={220} className="rounded-2xl" />
            <Skeleton height={220} className="rounded-2xl" />
            <Skeleton height={220} className="rounded-2xl" />
          </div>
        </div>
      </SkeletonTheme>
    );

  if (error)
    return (
      <div className="flex justify-center transition-all mt-20 mb-10">
        <p className="font-f1wide">Error: {error}</p>
      </div>
    );

  if (races.length === 0)
    return (
      <div className="flex justify-center transition-all mt-20 mb-10">
        <p className="font-f1wide">No races found for {selectedYear} season</p>
      </div>
    );

  return (
    <div>
      <h3 className="text-xl font-f1reg mb-6 ml-1">{selectedYear} Season</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {races.map((race) => {
          const hasResults = shouldShowResults(race.date);

          return (
            <div
              key={race.round}
              onClick={() => handleRaceClick(race.round)}
              className="relative h-[220px] rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden transition-all duration-300 select-none hover:shadow-lg cursor-pointer active:scale-95"
            >
              {/* flag */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{
                  backgroundImage: `url(${getFlagUrl(race.circuit.location.country, 640)})`,
                }}
              />

              {/* gradient + blur overlay */}
              <div className="absolute inset-0 backdrop-blur-xs bg-linear-to-t from-white/80 via-white/60 to-white/40 dark:from-zinc-900/90 dark:via-zinc-900/70 dark:to-zinc-900/50" />

              <div className="relative z-10 h-full p-4 flex flex-col justify-between font-f1reg">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {race.raceName}
                  </h3>

                  <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    <p>
                      {race.circuit.location.locality},{" "}
                      {race.circuit.location.country} • Round {race.round}
                    </p>

                    <div className="flex gap-2">
                      <p className="mt-0.5">
                        {formateDate(race.date)} •{" "}
                        {formatToLocalTime(race.time)}
                      </p>
                    </div>
                  </div>
                </div>

                {hasResults && (
                  <button className="inline-flex items-center gap-1 text-sm font-medium text-[#FF180190] hover:gap-2 transition-all cursor-pointer">
                    View Results <FaCaretRight size={18} className="mt-0.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center mt-6 font-f1wide text-xs text-zinc-950/70 dark:text-zinc-50/70">
        All times are shown in your local timezone ({tzAbbr})
      </p>
    </div>
  );
};

export default F1RaceList;
