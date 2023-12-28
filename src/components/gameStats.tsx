import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDataContext } from '../context/dataContext';
import { fetchGameStats } from '../utils/api';
import { StatsTypes, AllHighKeyStatsTypes } from '../utils/types';
import {
  initialHighStatsState,
  getTeamNameById,
  statsLabels,
} from '../utils/utilitary';
import ErrorMsg from './errorMsg';
import Spinner from './spinner';
import { motion } from 'framer-motion';

export default function GameStats() {
  const { gameId } = useParams<{ gameId: string }>();
  const { teams } = useDataContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [gameStats, setGameStats] = useState<StatsTypes[]>([]);
  const [highStats, setHighStats] = useState<AllHighKeyStatsTypes>(
    initialHighStatsState
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchGameStats({
          gameId,
          setGameStats,
          setHighStats,
          setLoading,
          setError,
        });
      } catch (error) {
        console.error(error);
        setError('Error fetching game stats. Please try again');
      }
    };
    fetchData();
  }, [gameId]);

  return (
    <>
      {loading && <Spinner />}
      {error && <ErrorMsg text={error} />}
      {!error && gameStats.length > 0 && (
        <motion.ol
          className="flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeIn', delay: 0.2 }}
        >
          {Object.keys(highStats).map((key) => (
            <li key={key} className="flex flex-col">
              <span className="uppercase font-light text-xl mb-2 text-zinc-900">
                {statsLabels[key]}
              </span>
              <span className="font-bold text-6xl mb-2 last:mb-0">
                {highStats[key].player}{' '}
                <span className="font-light text-zinc-500">
                  {highStats[key].value}
                </span>
              </span>

              <span className="text-4xl font-medium mb-16 text-zinc-400">
                {getTeamNameById(teams, highStats[key].teamId)}
              </span>
            </li>
          ))}
        </motion.ol>
      )}
    </>
  );
}
