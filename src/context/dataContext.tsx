import { useState, createContext, useContext, useEffect } from 'react';
import { fetchLocalPlayers, fetchTeams } from '../utils/api';
import {
  ChildrenTypes,
  ErrorTeamsAndPlayersTypes,
  LoadingTeamsAndPlayersTypes,
  LocalPlayersTypes,
  ReactContextTypes,
  TeamTypes,
} from '../utils/types';

const DataContext = createContext<ReactContextTypes | null>(null);

export default function DataContextProvider({ children }: ChildrenTypes) {
  const [players, setPlayers] = useState<LocalPlayersTypes[]>([]);
  const [teams, setTeams] = useState<TeamTypes[]>([]);
  const [loading, setLoading] = useState<LoadingTeamsAndPlayersTypes>({
    players: true,
    teams: true,
  });
  const [error, setError] = useState<ErrorTeamsAndPlayersTypes>({
    players: null,
    teams: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      await fetchTeams({ setTeams, setLoading, setError });
      fetchLocalPlayers({ setPlayers, setLoading, setError });
    };
    fetchData();
  }, []);

  const value = {
    players,
    teams,
    loading,
    error,
    setError,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

/* eslint-disable react-refresh/only-export-components */
export function useDataContext() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataContextProvider');
  }
  return context;
}
