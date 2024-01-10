import axios from 'axios';
import {
  FetchTeamsTypes,
  FetchLocalPlayersTypes,
  TeamGameTypes,
  FetchTeamGamesTypes,
  AllTeamGameTypes,
  FetchPlayersStatsTypes,
  StatsTypes,
  FetchGameStatsTypes,
  HighStatsTypes,
} from './types';
import { ROSTERS } from '../data/rosters';
import { getHighestStatPlayer } from './utilitary';

const APIKEY = import.meta.env.VITE_APP_API_KEY;

const api = axios.create({
  baseURL: 'https://free-nba.p.rapidapi.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
    'X-RapidAPI-Key': APIKEY,
  },
});

// TEAMS

export const getTeams = async () => {
  try {
    const { data } = await api.get('/teams');
    return data.data;
  } catch (error) {
    throw new Error('Error fetching teams');
  }
};

export const fetchTeams = async ({
  setTeams,
  setLoading,
  setError,
}: FetchTeamsTypes) => {
  try {
    const teamsResponse = await getTeams();
    setTeams(teamsResponse);
    setLoading((prevState) => ({
      ...prevState,
      teams: false,
    }));
  } catch (error) {
    console.error(error);
    setError((prevState) => ({
      ...prevState,
      teams: 'Error fetching teams. Please try again.',
    }));
  }
};

// PLAYERS

export const getAllPlayers = async (page: number) => {
  try {
    const { data } = await api.get('/players', {
      params: {
        page,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Error fetching players');
  }
};

export const getPlayerId = async (playerName: string) => {
  try {
    const { data } = await api.get('/players', {
      params: {
        search: playerName,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Error fetching player id');
  }
};

export const fetchLocalPlayers = async ({
  setPlayers,
  setLoading,
  setError,
}: FetchLocalPlayersTypes) => {
  try {
    setPlayers(ROSTERS);
    setLoading((prevState) => ({ ...prevState, players: false }));
  } catch (error) {
    console.error(error);
    setError((prevState) => ({
      ...prevState,
      players: 'Error fetching players. Please try again.',
    }));
  }
};

// STATS

export const getPlayerStats = async (
  playerId: string | undefined,
  season: string,
  page: string
) => {
  try {
    const { data } = await api.get(
      `/stats?player_ids[]=${playerId}&seasons[]=${season}&page=${page}`
    );
    return data;
  } catch (error) {
    throw new Error('Error fetching player stats');
  }
};

export const fetchPlayerStats = async ({
  playerId,
  season,
  setPlayerStats,
  setLastPage,
  setLoading,
  setError,
}: FetchPlayersStatsTypes) => {
  setLoading(true);
  try {
    let currentPage = 1;
    let totalPages = 1;
    let playerStats: StatsTypes[] = [];
    while (currentPage <= totalPages) {
      const playersStatsResponse = await getPlayerStats(
        playerId,
        season,
        currentPage.toString()
      );

      playerStats = [...playerStats, ...playersStatsResponse.data];
      totalPages = playersStatsResponse.meta.total_pages;
      currentPage++;
    }
    playerStats.sort((a, b) => {
      if (!a.game.date || !b.game.date) return 0;
      return new Date(b.game.date).getTime() - new Date(a.game.date).getTime();
    });

    setPlayerStats(playerStats);
    setLastPage(totalPages);
    setLoading(false);
  } catch (error) {
    console.error(error);
    setError('Error fetching player stats. Please try again.');
  }
};

export const getGameStats = async (
  gameId: string | undefined,
  page: string
) => {
  try {
    const { data } = await api.get(`/stats?game_ids[]=${gameId}&page=${page}`);
    console.log(data.data);
    return data;
  } catch (error) {
    throw new Error('Error fetching game stats');
  }
};

export const fetchGameStats = async ({
  gameId,
  setGameStats,
  setHighStats,
  setLoading,
  setError,
}: FetchGameStatsTypes) => {
  try {
    let currentPage = 1;
    let totalPages = 1;
    let gameStats: StatsTypes[] = [];
    while (currentPage <= totalPages) {
      const gameStatsResponse = await getGameStats(
        gameId,
        currentPage.toString()
      );

      gameStats = [...gameStats, ...gameStatsResponse.data];
      totalPages = gameStatsResponse.meta.total_pages;
      currentPage++;
    }
    setGameStats(gameStats);
    setHighStats({
      pts: getHighestStatPlayer(gameStats, 'pts') as HighStatsTypes,
      reb: getHighestStatPlayer(gameStats, 'reb') as HighStatsTypes,
      ast: getHighestStatPlayer(gameStats, 'ast') as HighStatsTypes,
    });
    setLoading(false);
  } catch (error) {
    console.error(error);
    setError('Error fetching player stats. Please try again.');
  }
};

// GAMES

export const getTeamGames = async (
  teamId: string | undefined,
  season: string,
  page: string
) => {
  try {
    const { data } = await api.get(
      `/games?team_ids[]=${teamId}&seasons[]=${season}&page=${page}`
    );
    return data;
  } catch (error) {
    throw new Error('Error fetching team games');
  }
};

export const fetchTeamGames = async ({
  teamId,
  season,
  setTeamGames,
  setSelectedGames,
  setLoading,
  setError,
}: FetchTeamGamesTypes) => {
  setLoading(true);
  try {
    let currentPage = 1;
    let totalPages = 1;
    const teamGames: AllTeamGameTypes = {
      upcoming: [],
      previous: [],
    };
    while (currentPage <= totalPages) {
      const teamGamesResponse = await getTeamGames(
        teamId,
        season,
        currentPage.toString()
      );
      teamGamesResponse.data.forEach((game: TeamGameTypes) => {
        if (game.home_team_score === 0 && game.visitor_team_score === 0) {
          teamGames.upcoming.push(game);
        } else {
          teamGames.previous.push(game);
        }
      });
      totalPages = teamGamesResponse.meta.total_pages;
      currentPage++;
    }

    teamGames.upcoming.sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    teamGames.previous.sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    setTeamGames(teamGames);
    setSelectedGames(teamGames.previous);
    setLoading(false);
  } catch (error) {
    console.error(error);
    setError('Error fetching team games. Please try again.');
  }
};
