export type TeamTypes = {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
};

export type PlayerTypes = {
  id: number;
  first_name: string;
  height_feet: number | null;
  height_inches: number | null;
  last_name: string;
  position: string;
  team: TeamTypes;
  weight_pounds: number | null;
};

export type ChildrenTypes = {
  children: React.ReactNode;
};

export type ReactContextTypes = {
  players: PlayerTypes[];
  teams: TeamTypes[];
  loading: LoadingTeamsAndPlayersTypes;
  error: ErrorTeamsAndPlayersTypes;
};

export type FetchTeamsTypes = {
  setTeams: React.Dispatch<React.SetStateAction<TeamTypes[]>>;
  setLoading: React.Dispatch<React.SetStateAction<LoadingTeamsAndPlayersTypes>>;
  setError: React.Dispatch<React.SetStateAction<ErrorTeamsAndPlayersTypes>>;
};

export type fetchPlayersTypes = {
  setPlayers: React.Dispatch<React.SetStateAction<PlayerTypes[]>>;
  setLoading: React.Dispatch<React.SetStateAction<LoadingTeamsAndPlayersTypes>>;
  setError: React.Dispatch<React.SetStateAction<ErrorTeamsAndPlayersTypes>>;
};

export type LoadingTeamsAndPlayersTypes = {
  players: boolean;
  teams: boolean;
};

export type ErrorTeamsAndPlayersTypes = {
  players: string | null;
  teams: string | null;
};
