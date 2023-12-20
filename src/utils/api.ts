import axios from 'axios';
import { FetchTeamsTypes, fetchPlayersTypes } from './types';

const APIKEY = 'f50a47a7ddmsh482e257a603d514p106077jsn56e5e9623fd3';

const api = axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
    'X-RapidAPI-Key': APIKEY,
  },
});

export const getTeams = async () => {
  try {
    const { data } = await api.get('/teams');
    console.log(data);
    return data.data;
  } catch (error) {
    throw new Error('Error fetching teams');
  }
};

export const getAllPlayers = async (page: number) => {
  try {
    const { data } = await api.get('/players', {
      params: {
        page,
      },
    });
    console.log(data.data);
    return data;
  } catch (error) {
    throw new Error('Error fetching players');
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

export const fetchPlayers = async ({
  setPlayers,
  setLoading,
  setError,
}: fetchPlayersTypes) => {
  try {
    let currentPage = 1;
    let totalPages = 1;
    while (currentPage <= totalPages) {
      const playersResponse = await getAllPlayers(currentPage);
      setPlayers((prevState) => [...prevState, ...playersResponse.data]);
      totalPages = playersResponse.meta.total_pages;
      currentPage++;
    }
    setLoading((prevState) => ({ ...prevState, players: false }));
  } catch (error) {
    console.error(error);
    setError((prevState) => ({
      ...prevState,
      players: 'Error fetching players. Please try again.',
    }));
  }
};
