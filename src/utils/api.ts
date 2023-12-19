import axios from 'axios';

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
