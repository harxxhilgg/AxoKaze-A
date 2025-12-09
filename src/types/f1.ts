export type SessionType = "FP1" | "FP2" | "FP3" | "QUALI" | "SPRINT";

export type RaceSession = {
  type: SessionType;
  dateTimeUTC: string;
};

export type CircuitLocation = {
  lat: string;
  long: string;
  locality: string;
  country: string;
};

export type Circuit = {
  circuitId: string;
  circuitName: string;
  circuitUrl: string;
  location: CircuitLocation;
};

export type Race = {
  round: number;
  raceName: string;
  circuit: Circuit;
  date: string;
  time: string;
  sessions: RaceSession[];
};

export type RaceResult = {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: {
    driverId: string;
    permanentNumber: string;
    code: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
  };
  Constructor: {
    constructorId: string;
    name: string;
    nationality: string;
  };
  grid: string;
  laps: string;
  status: string;
  Time?: {
    time: string;
  };
  fastestLap?: {
    rank: string;
    lap: string;
    Time: {
      time: string;
    };
  };
};

export type RaceDetails = {
  season: string;
  round: string;
  raceName: string;
  circuit: Circuit;
  date: string;
  time: string;
  results: RaceResult[];
};

export type DriverStanding = {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: {
    driverId: string;
    permanentNumber: string;
    code: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
  };
  Constructors: Array<{
    constructorId: string;
    name: string;
    nationality: string;
  }>;
};

export type DriverStandingsData = {
  season: string;
  round: string;
  standings: DriverStanding[];
};

export type ConstructorStanding = {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: {
    constructorId: string;
    name: string;
    nationality: string;
  };
};

export type ConstructorStadingsData = {
  season: string;
  round: string;
  standings: ConstructorStanding[];
};

export type F1Store = {
  selectedYear: number;
  racesByYear: Record<number, Race[]>;
  isLoading: boolean;
  error: string | null;
  selectedRace: RaceDetails | null;
  isLoadingResults: boolean;
  driverStandings: DriverStandingsData | null;
  constructorStandings: ConstructorStadingsData | null;
  isLoadingDriverStandings: boolean;
  isLoadingConstructorStandings: boolean;
  loadRaces: (year: number) => Promise<void>;
  setSelectedYear: (year: number) => void;
  getCurrentRaces: () => Race[];
  loadRaceResults: (year: number, round: number) => Promise<void>;
  loadDriverStandings: (year: number) => Promise<void>;
  loadConstructorStandings: (year: number) => Promise<void>;
  clearSelectedRace: () => void;
  resetF1Store: () => void;
};
