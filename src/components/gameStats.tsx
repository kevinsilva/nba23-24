import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameStats } from '../utils/api';
import { StatsTypes } from '../utils/types';

export default function GameStats() {
  const { gameId } = useParams<{ gameId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [gameStats, setGameStats] = useState<StatsTypes[]>([]);
  const [highStats, setHighStats] = useState({
    pts: {
      player: '',
      value: 0,
      teamId: 0,
    },
    reb: {
      player: '',
      value: 0,
      teamId: 0,
    },
    ast: {
      player: '',
      value: 0,
      teamId: 0,
    },
  });

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
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {gameStats.length > 0 && (
        <ol>
          <li>
            High Points {highStats.pts.player} {highStats.pts.value}{' '}
            {highStats.pts.teamId}
          </li>
          <li>
            High Rebounds {highStats.reb.player} {highStats.reb.value}{' '}
            {highStats.reb.teamId}
          </li>
          <li>
            High Assists {highStats.ast.player} {highStats.ast.value}{' '}
            {highStats.ast.teamId}
          </li>
        </ol>
      )}
    </>
  );
}
