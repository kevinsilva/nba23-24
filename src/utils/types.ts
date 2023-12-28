export type TeamTypes = {
  id: number | null;
  abbreviation: string | null;
  city: string | null;
  conference: string | null;
  division: string | null;
  full_name: string | null;
  name: string | null;
};

export type PlayerTypes = {
  id: number | null;
  first_name: string | null;
  height_feet: number | null;
  height_inches: number | null;
  last_name: string | null;
  position: string | null;
  team?: TeamTypes;
  weight_pounds: number | null;
  team_id?: number | null;
};

export type LocalPlayersTypes = {
  id: number;
  list: string[][];
};

export type GameTypes = {
  id: number | null;
  date: string | null;
  home_team_id: number | null;
  home_team_score: number | null;
  period?: number | null;
  postseason?: boolean | null;
  season: number | null;
  status?: string | null;
  time?: string | null;
  visitor_team_id: number | null;
  visitor_team_score: number | null;
};

export type TeamGameTypes = {
  id: number | null;
  date: string | null;
  home_team_score: number | null;
  visitor_team_score: number | null;
  season: number | null;
  home_team: TeamTypes;
  visitor_team: TeamTypes;
};

export type AllTeamGameTypes = {
  upcoming: TeamGameTypes[];
  previous: TeamGameTypes[];
};

export type StatsTypes = {
  id: number | null;
  ast: number | null;
  blk: number | null;
  dreb: number | null;
  fg3_pct: number | null;
  fg3a: number | null;
  fg3m: number | null;
  fg_pct: number | null;
  fga: number | null;
  fgm: number | null;
  ft_pct: number | null;
  fta: number | null;
  ftm: number | null;
  game: GameTypes;
  min: string | null;
  oreb: number | null;
  pf: number | null;
  player: PlayerTypes;
  pts: number | null;
  reb: number | null;
  stl: number | null;
  team: TeamTypes;
  turnover: number | null;
};

export type MetaTypes = {
  total_pages: number;
  current_page: number;
  next_page: number | null;
  per_page: number;
  total_count: number;
};

export type PlayerStatsTypes = {
  data: StatsTypes[];
  meta: MetaTypes;
};

export type ChildrenTypes = {
  children: React.ReactNode;
};

export type ReactContextTypes = {
  players: LocalPlayersTypes[];
  teams: TeamTypes[];
  loading: LoadingTeamsAndPlayersTypes;
  error: ErrorTeamsAndPlayersTypes;
  setError: React.Dispatch<React.SetStateAction<ErrorTeamsAndPlayersTypes>>;
};

export type FetchTeamsTypes = {
  setTeams: React.Dispatch<React.SetStateAction<TeamTypes[]>>;
  setLoading: React.Dispatch<React.SetStateAction<LoadingTeamsAndPlayersTypes>>;
  setError: React.Dispatch<React.SetStateAction<ErrorTeamsAndPlayersTypes>>;
};

export type FetchPlayersTypes = {
  setPlayers: React.Dispatch<React.SetStateAction<PlayerTypes[]>>;
  setLoading: React.Dispatch<React.SetStateAction<LoadingTeamsAndPlayersTypes>>;
  setError: React.Dispatch<React.SetStateAction<ErrorTeamsAndPlayersTypes>>;
};

export type FetchLocalPlayersTypes = {
  setPlayers: React.Dispatch<React.SetStateAction<LocalPlayersTypes[]>>;
  setLoading: React.Dispatch<React.SetStateAction<LoadingTeamsAndPlayersTypes>>;
  setError: React.Dispatch<React.SetStateAction<ErrorTeamsAndPlayersTypes>>;
};

export type FetchPlayersStatsTypes = {
  playerId: string | undefined;
  season: string;
  setPlayerStats: React.Dispatch<React.SetStateAction<StatsTypes[]>>;
  setLastPage: React.Dispatch<React.SetStateAction<number>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

export type FetchTeamGamesTypes = {
  teamId: string | undefined;
  season: string;
  setTeamGames: React.Dispatch<React.SetStateAction<AllTeamGameTypes>>;
  setSelectedGames: React.Dispatch<React.SetStateAction<TeamGameTypes[]>>;
  setLastPage: React.Dispatch<React.SetStateAction<number>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

export type FetchGameStatsTypes = {
  gameId: string | undefined;
  setGameStats: React.Dispatch<React.SetStateAction<StatsTypes[]>>;
  setHighStats: React.Dispatch<React.SetStateAction<AllHighKeyStatsTypes>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

export type LoadingTeamsAndPlayersTypes = {
  players: boolean;
  teams: boolean;
};

export type ErrorTeamsAndPlayersTypes = {
  players: string | null;
  teams: string | null;
};

export type HighStatsTypes = {
  player: string;
  value: number;
  teamId: number;
};

export type AllHighStatsTypes = {
  pts: HighStatsTypes;
  reb: HighStatsTypes;
  ast: HighStatsTypes;
};

export type AllHighKeyStatsTypes = {
  [key: string]: {
    player: string;
    value: number;
    teamId: number;
  };
};

export type StatsLabelsTypes = {
  [key: string]: string;
};
