import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPlayerStats } from '../utils/api';
import { useDataContext } from '../context/dataContext';
import { StatsTypes } from '../utils/types';
import FilterPlayers from './filterPlayers';

const gamesPerPage = 25;

export default function PlayerStats() {
  const { playerId } = useParams<{ playerId: string | undefined }>();
  const { teams } = useDataContext();
  const [playerStats, setPlayerStats] = useState<StatsTypes[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPlayerStats({
          playerId,
          season: '2023',
          setPlayerStats,
          setLastPage,
          setLoading,
          setError,
        });
      } catch (error) {
        console.error(error);
        setError('Error fetching player stats. Please try again');
      }
    };
    fetchData();
  }, [playerId]);

  const handleNextPage = () => {
    if (currentPage === lastPage) return;
    setCurrentPage((prevState) => prevState + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prevState) => prevState - 1);
  };

  return (
    <>
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {playerStats.length > 0 && (
        <>
          <div>
            {/* {JSON.stringify(playerStats[0]['player'], null, 2)} */}
            <FilterPlayers
              teamId={playerStats[0].player.team_id ?? 1}
              playerId={playerId ?? '1'}
              playerName={
                `${playerStats[0]?.player?.first_name} ${playerStats[0]?.player?.last_name}` ??
                'name'
              }
            />
            <button onClick={handlePreviousPage}>Previous Page</button>
            <span>
              {currentPage} of {lastPage}
            </span>
            <button onClick={handleNextPage}>Next Page</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Game</th>
                <th>Score</th>
                <th>A</th>
                <th>MIN</th>
                <th>PTS</th>
                <th>REB</th>
                <th>AST</th>
                <th>BLK</th>
                <th>STL</th>
                <th>FGM</th>
                <th>FG3M</th>
                <th>FGA</th>
              </tr>
            </thead>
            <tbody>
              {playerStats
                .slice(
                  (currentPage - 1) * gamesPerPage,
                  currentPage * gamesPerPage
                )
                .map((data) => (
                  <tr key={data.id}>
                    <td>
                      {
                        teams.filter(
                          (team) => team.id === data.game.home_team_id
                        )[0].full_name
                      }{' '}
                      vs{' '}
                      {
                        teams.filter(
                          (team) => team.id === data.game.visitor_team_id
                        )[0].full_name
                      }
                    </td>
                    <td>
                      {data.game.home_team_score}-{data.game.visitor_team_score}
                    </td>
                    <td>{data.game.date}</td>
                    <td>{data.min}</td>
                    <td>{data.pts}</td>
                    <td>{data.reb}</td>
                    <td>{data.ast}</td>
                    <td>{data.blk}</td>
                    <td>{data.stl}</td>
                    <td>{data.fgm}</td>
                    <td>{data.fg3m}</td>
                    <td>{data.fga}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
