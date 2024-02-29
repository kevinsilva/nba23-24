import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPlayerStats } from '../utils/api';
import { useDataContext } from '../context/dataContext';
import { StatsTypes } from '../utils/types';
import FilterPlayers from './filterPlayers';
import { gamesPerPage, season } from '../utils/utilitary';
import ErrorMsg from './errorMsg';
import Spinner from './spinner';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { motion } from 'framer-motion';

export default function PlayerStats() {
  const { playerId } = useParams<{ playerId: string }>();
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
          season,
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
      {loading && <Spinner />}
      {error && <ErrorMsg text={error} />}
      {playerStats.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeIn', delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <FilterPlayers
              teamId={playerStats[0].player.team_id ?? 1}
              playerId={playerId ?? '1'}
              playerName={
                `${playerStats[0]?.player?.first_name} ${playerStats[0]?.player?.last_name}` ??
                'name'
              }
            />
            <div className="flex justify-end mb-8 text-zinc-600 font-light">
              <button
                onClick={handlePreviousPage}
                className="text-xl hover:text-zinc-900 dark:text-zinc-50 dark:hover:text-zinc-400"
              >
                <IoIosArrowBack />
              </button>
              <span className="text-zinc-800 dark:text-zinc-100">
                {currentPage} of {lastPage} {lastPage > 1 ? 'Pages' : 'Page'}
              </span>
              <button
                onClick={handleNextPage}
                className="text-xl hover:text-zinc-900 dark:text-zinc-50 dark:hover:text-zinc-400"
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-11/12 justify-center mx-auto">
              <thead>
                <tr className="uppercase text-zinc-500 text-xs h-10 text-left">
                  <th className="font-light pr-4">Game</th>
                  <th className="font-light pr-4">Score</th>
                  <th className="font-light pr-4">MIN</th>
                  <th className="font-light pr-4">PTS</th>
                  <th className="font-light pr-4">REB</th>
                  <th className="font-light pr-4">AST</th>
                  <th className="font-light pr-4">BLK</th>
                  <th className="font-light pr-4">STL</th>
                  <th className="font-light pr-4">FGM</th>
                  <th className="font-light pr-4">FG3M</th>
                  <th className="font-light pr-4">FGA</th>
                </tr>
              </thead>
              <tbody className="font-semibold">
                {playerStats
                  .slice(
                    (currentPage - 1) * gamesPerPage,
                    currentPage * gamesPerPage
                  )
                  .map((data) => (
                    <tr
                      key={data.id}
                      className="border-y-[1px] border-zinc-400 h-24 w-3/4 text-lg sm:text-xl font-light"
                    >
                      <td className="text-xl sm:text-3xl font-bold mr-4 whitespace-no-wrap min-w-[25rem]">
                        {
                          teams.filter(
                            (team) => team.id === data.game.home_team_id
                          )[0].name
                        }{' '}
                        vs{' '}
                        {
                          teams.filter(
                            (team) => team.id === data.game.visitor_team_id
                          )[0].name
                        }
                      </td>

                      <td className="pr-4 min-w-[6rem]">
                        {data.game.home_team_score}-
                        {data.game.visitor_team_score}
                      </td>
                      <td className="pr-4">{data.min}</td>
                      <td className="pr-4">{data.pts}</td>
                      <td className="pr-4">{data.reb}</td>
                      <td className="pr-4">{data.ast}</td>
                      <td className="pr-4">{data.blk}</td>
                      <td className="pr-4">{data.stl}</td>
                      <td className="pr-4">{data.fgm}</td>
                      <td className="pr-4">{data.fg3m}</td>
                      <td className="pr-4">{data.fga}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      )}
    </>
  );
}
