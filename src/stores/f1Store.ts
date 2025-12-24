import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ConstructorStadingsData, DriverStandingsData } from "../types/f1";
import type { F1Store, Race, RaceDetails, RaceSession } from "../types";

const buildDateTime = (date: string, time: string) => `${date}T${time}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizeRace = (race: any) => {
  const sessions: RaceSession[] = [];

  if (race.FirstPractice) {
    sessions.push({
      type: "FP1",
      dateTimeUTC: buildDateTime(
        race.FirstPractice.date,
        race.FirstPractice.time
      ),
    });
  }

  if (race.SecondPractice) {
    sessions.push({
      type: "FP2",
      dateTimeUTC: buildDateTime(
        race.SecondPractice.date,
        race.SecondPractice.time
      ),
    });
  }

  if (race.ThirdPractice) {
    sessions.push({
      type: "FP3",
      dateTimeUTC: buildDateTime(
        race.ThirdPractice.date,
        race.ThirdPractice.time
      ),
    });
  }

  if (race.SprintQualifying) {
    sessions.push({
      type: "SPRINT QUALI",
      dateTimeUTC: buildDateTime(
        race.SprintQualifying.date,
        race.SprintQualifying.time
      ),
    });
  }

  if (race.Sprint) {
    sessions.push({
      type: "SPRINT",
      dateTimeUTC: buildDateTime(race.Sprint.date, race.Sprint.time),
    });
  }

  if (race.Qualifying) {
    sessions.push({
      type: "QUALI",
      dateTimeUTC: buildDateTime(race.Qualifying.date, race.Qualifying.time),
    });
  }

  return {
    round: Number(race.round),
    raceName: race.raceName,
    circuit: {
      circuitId: race.Circuit.circuitId,
      circuitName: race.Circuit.circuitName,
      location: {
        lat: race.Circuit.Location.lat,
        long: race.Circuit.Location.long,
        locality: race.Circuit.Location.locality,
        country: race.Circuit.Location.country,
      },
    },
    date: race.date,
    time: race.time,
    sessions,
  };
};

// store
export const useF1Store = create<F1Store>()(
  persist(
    (set, get) => ({
      selectedYear: 2026, // default year - CACHED (saved to localStorage)
      racesByYear: {}, // CACHED (main cache)
      selectedRace: null, // CACHED but temporary
      isLoading: false, // CACHED (doesn't matter)
      isLoadingResults: false, // CACHED (doesn't matter)
      driverStandings: null, // CACHED (temporary data)
      constructorStandings: null, // CACHED (temporary data)
      isLoadingDriverStandings: false,
      isLoadingConstructorStandings: false,
      error: null, // CACHED (temporary)

      loadRaces: async (year: number) => {
        const state = get(); // retrive current store state - includes cached data from localStorage

        // check if year is already cached
        if (state.racesByYear[year]) {
          return;
        }

        /*
          - state.racesByYear[year] checks if we have data for this year
          - ex. state.racesByYear[2024] if exists, we're done
          - fn exists immediately, no API call
          - cache miss - continue to API call
        */

        // prevents multiple API calls - if loading then do not return anything
        if (state.isLoading) return;

        try {
          // update ui state and changes are persisted to localStorage for a sec
          set({ isLoading: true, error: null });

          // ---------------

          await new Promise((resolve) => setTimeout(resolve, 2000)); //! remove in prod

          // ---------------

          const res = await fetch(
            `https://api.jolpi.ca/ergast/f1/${year}/races/`
          );

          if (!res.ok) {
            throw new Error("Failed to fetch F1 Calendar");
          }

          const data = await res.json();
          const apiRaces = data.MRData.RaceTable.Races;

          const races: Race[] = apiRaces.map(normalizeRace);

          /*
            CACHING happens here

            - ...state.racesByYear -> spread existing cached years (2023, 2024, ...)
            - [year]: races -> Add the new year we just fetched
            - result stored in localStoarge automatically by persist middleware

            ex.:
            - before api call:
            selectedYear: 2024,
            racesByYear: {
              2024: [* 24 races *]
            }

            - after fetching 2025:
            selectedYear: 2025,
            racesByYear: {
              2024: [* 24 races *], <- old cached
              2025: [* 24 races *] <- newly cached
            }
          */

          set((state) => ({
            racesByYear: {
              ...state.racesByYear, // keep all existing years
              [year]: races, // add new year data
            },
            isLoading: false, // update loading state when completion
          }));
        } catch (e) {
          const error = e as Error;
          set({
            error: error.message ?? "Unknown error",
            isLoading: false,
          });
        }
      },

      /*
        what happens here?
        - year 2024 is selected in dropdown
        - setSelectedYear(2024) called
        - updates selectedYear to 2024 (persisted)
        - calls loadRaces(2024)
        - loadRaces checks cache -> finds 2024 data -> returns instantly

        what if user clicks "2021" instead for the first time?
        - year 2021 is selected in dropdown
        - setSelectedYear(2021) called
        - updates selectedYear to 2021 (persisted)
        - calls loadRaces(2021)
        - loadRaces checks cache -> didn't find 2021 data -> procceeds executing
        - fetches from the API
        - saves 2020 data to racesByYear[2020]
        - next time: if year 2021 is selected then instant loads
      */

      setSelectedYear: async (year: number) => {
        set({ selectedYear: year }); // save selected year in memory
        await get().loadRaces(year); // load races for selected year (uses cache)
      },

      /*
        - state.selectedYear -> 2024
        - state.racesByYear[2024] -> gets cached races
        - if not found, returns empty array[]
      */

      /*
        const state = get(); <- basically means get all zustand store data and store it in state & and below is the snapshot of what it contains

        state = {
          selectedYear: 2025,
          racesByYear: { 2024: [...], 2025: [...] },
          selectedRace: null,
          isLoading: false,
          isLoadingResults: false,
          driverStandings: null,
          isLoadingDriverStandings: false,
          isLoadingConstructorStandings: false,
          error: null
          ... all the methods like loadRaces, setSelectedYear, etc.
        }
      */

      getCurrentRaces: () => {
        const state = get(); // gets all current store data
        return state.racesByYear[state.selectedYear] || []; // returns the races array of objects by getting the selectedYear
      },

      /*
        here, selectedRace is temporary popup data
        - when user closes popup and refreshes page, it's null again
        - no cache check logic if (cachedResult) return
        - fetches fresh every time popup opens
        we can make it cached too...
      */

      loadRaceResults: async (year: number, round: number) => {
        try {
          set({ isLoadingResults: true, error: null });

          const cachedRace = get().getRaceByRound(round);

          // if no cached race found, can't display anything
          if (!cachedRace) {
            throw new Error("Race not found in cache");
          }

          const res = await fetch(
            `https://api.jolpi.ca/ergast/f1/${year}/${round}/results.json`
          );

          if (!res.ok) {
            throw new Error("Failed to fetch race results");
          }

          const data = await res.json();
          const raceData = data.MRData.RaceTable.Races[0];

          // if race hasn't happened yet (no results), use cached race data
          if (!raceData) {
            const raceDetails: RaceDetails = {
              season: String(year),
              round: String(cachedRace.round),
              raceName: cachedRace.raceName,
              circuit: {
                circuitId: cachedRace.circuit.circuitId,
                circuitUrl: cachedRace.circuit.circuitUrl || "",
                circuitName: cachedRace.circuit.circuitName,
                location: cachedRace.circuit.location,
              },
              date: cachedRace.date,
              time: cachedRace.time,
              results: [],
              sessions: cachedRace.sessions || [],
            };

            set({
              selectedRace: raceDetails,
              isLoadingResults: false,
            });
            return;
          }

          // race has results - use API data
          const raceDetails: RaceDetails = {
            season: raceData.season,
            round: raceData.round,
            raceName: raceData.raceName,
            circuit: {
              circuitId: raceData.Circuit.circuitId,
              circuitUrl: raceData.Circuit.url,
              circuitName: raceData.Circuit.circuitName,
              location: {
                lat: raceData.Circuit.Location.lat,
                long: raceData.Circuit.Location.long,
                locality: raceData.Circuit.Location.locality,
                country: raceData.Circuit.Location.country,
              },
            },
            date: raceData.date,
            time: raceData.time,
            results: raceData.Results || [],
            sessions: cachedRace?.sessions || [],
          };

          set({
            selectedRace: raceDetails,
            isLoadingResults: false,
          });
        } catch (e) {
          const error = e as Error;
          set({
            error: error.message ?? "Unknown error",
            isLoadingResults: false,
          });
        }
      },

      clearSelectedRace: () => set({ selectedRace: null }),

      getRaceByRound: (round: number) => {
        const races = get().getCurrentRaces();
        return races.find((race) => race.round === round);
      },

      loadDriverStandings: async (year: number) => {
        try {
          set({ isLoadingDriverStandings: true, error: null });

          const res = await fetch(
            `https://api.jolpi.ca/ergast/f1/${year}/driverstandings.json`
          );

          if (!res.ok) {
            throw new Error("Failed to fetch driver standings");
          }

          const data = await res.json();
          const standingsData = data.MRData.StandingsTable.StandingsLists[0];

          const driverStandings: DriverStandingsData = {
            season: standingsData.season,
            round: standingsData.round,
            standings: standingsData.DriverStandings || [],
          };

          set({
            driverStandings,
            isLoadingDriverStandings: false,
          });
        } catch (e) {
          const error = e as Error;
          set({
            error: error.message ?? "Unknown error",
            isLoadingDriverStandings: false,
          });
        }
      },

      loadConstructorStandings: async (year: number) => {
        try {
          set({ isLoadingConstructorStandings: true, error: null });

          const res = await fetch(
            `https://api.jolpi.ca/ergast/f1/${year}/constructorstandings`
          );

          if (!res.ok) {
            throw new Error("Failed to fetch constructor standings");
          }

          const data = await res.json();
          const standingsData = data.MRData.StandingsTable.StandingsLists[0];

          const constructorStandings: ConstructorStadingsData = {
            season: standingsData.season,
            round: standingsData.round,
            standings: standingsData.ConstructorStandings || [],
          };

          set({
            constructorStandings,
            isLoadingConstructorStandings: false,
          });
        } catch (e) {
          const error = e as Error;
          set({
            error: error.message ?? "Unknown error",
            isLoadingConstructorStandings: false,
          });
        }
      },

      resetF1Store: () => {
        set({
          selectedYear: 2026, // change default year
          racesByYear: {},
          selectedRace: null,
          driverStandings: null,
          isLoading: false,
          isLoadingResults: false,
          isLoadingDriverStandings: false,
          isLoadingConstructorStandings: false,
          error: null,
        });
      },
    }),
    {
      name: "f1-calendar-cache",
      version: 9, //! increment if structure changes
    }
  )
);
