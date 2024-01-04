import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchTeamGames } from '../utils/api';
import { AllTeamGameTypes, TeamGameTypes } from '../utils/types';
import FilterTeams from './filterTeams';
import { gamesPerPage, season, checkIfTeamWon } from '../utils/utilitary';
import ErrorMsg from './errorMsg';
import Spinner from './spinner';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { motion } from 'framer-motion';

export default function TeamGames() {
  const { teamId } = useParams<{ teamId: string }>();
  const [teamGames, setTeamGames] = useState<AllTeamGameTypes>({
    upcoming: [],
    previous: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGames, setSelectedGames] = useState<TeamGameTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTeamGames({
          teamId,
          season,
          setTeamGames,
          setSelectedGames,
          setLoading,
          setError,
        });
      } catch (error) {
        console.error(error);
        setError('Error fetching team games. Please try again');
      }
    };
    fetchData();
  }, [teamId]);

  const handleNextPage = () => {
    if (currentPage === Math.ceil(selectedGames.length / gamesPerPage)) return;
    setCurrentPage((prevState) => prevState + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prevState) => prevState - 1);
  };

  const handleSelectGames = () => {
    if (selectedGames[0].id === teamGames.previous[0].id) {
      setSelectedGames(teamGames.upcoming);
    } else {
      setSelectedGames(teamGames.previous);
    }
  };

  return (
    <section>
      {loading && <Spinner />}
      {error && <ErrorMsg text={error} />}
      {teamGames.upcoming.length > 0 && teamGames.previous.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeIn', delay: 0.2 }}
        >
          <div className="flex items-center justify-between mt-10 sm:mt-0">
            <FilterTeams teamId={teamId ?? '1'} />
            <div className="flex flex-col relative bottom-2 justify-center">
              <button
                onClick={handleSelectGames}
                className="px-2 py-3  border-2 border-zinc-800 text-zinc-800 text-sm font-semibold rounded-md hover:bg-zinc-800 hover:text-zinc-100 dark:border-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900"
              >
                {selectedGames.length > 0 &&
                selectedGames[0].id === teamGames.previous[0].id
                  ? 'Upcoming Games'
                  : 'Previous Games'}
              </button>
              <div className="flex justify-end mt-8 text-zinc-600 font-light">
                <button
                  onClick={handlePreviousPage}
                  className="text-xl hover:text-zinc-900 dark:text-zinc-50 dark:hover:text-zinc-400"
                >
                  <IoIosArrowBack />
                </button>
                <span className="text-zinc-800 dark:text-zinc-50">
                  {currentPage} of{' '}
                  {Math.ceil(selectedGames.length / gamesPerPage)} Pages
                </span>
                <button
                  onClick={handleNextPage}
                  className="text-xl hover:text-zinc-900 dark:text-zinc-50 dark:hover:text-zinc-400"
                >
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          </div>
          <table className="w-11/12 justify-center mx-auto">
            <thead>
              <tr className="uppercase text-zinc-500 text-xs h-10 text-left">
                <th className="font-light">Game</th>
                <th className="font-light">Result</th>
              </tr>
            </thead>
            <tbody className="font-semibold">
              {selectedGames
                .slice(
                  (currentPage - 1) * gamesPerPage,
                  currentPage * gamesPerPage
                )
                .map((game) => (
                  <tr
                    key={game.id}
                    className="border-y-[1px] border-zinc-400 h-24 w-3/4 cursor-pointer hover:opacity-80"
                  >
                    <td>
                      <Link
                        to={
                          game.home_team_score
                            ? `/games/${game.id}/stats`
                            : `/teams/${teamId}/games`
                        }
                      >
                        <span className="text-xl font-light mr-4">
                          {game.date &&
                            game.date.slice(5, 10).replace('-', '/')}
                        </span>
                        <span className="text-xl sm:text-4xl font-bold">
                          {Number(teamId) === game.home_team.id
                            ? game.visitor_team.full_name
                            : game.home_team.full_name}
                        </span>
                      </Link>
                    </td>
                    <td className="text-lg sm:text-4xl font-bold">
                      {checkIfTeamWon(game, Number(teamId)) === null
                        ? ''
                        : checkIfTeamWon(game, Number(teamId))
                          ? 'W'
                          : 'L'}{' '}
                      {game.home_team_score}-{game.visitor_team_score}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </section>
  );
}
