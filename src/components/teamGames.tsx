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

export default function TeamGames() {
  const { teamId } = useParams<{ teamId: string }>();
  const [teamGames, setTeamGames] = useState<AllTeamGameTypes>({
    upcoming: [],
    previous: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
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
          setLastPage,
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
    if (currentPage === lastPage) return;
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
    <div>
      {loading && <Spinner />}
      {error && <ErrorMsg text={error} />}
      {teamGames && (
        <>
          <div className="flex items-center justify-between">
            <FilterTeams teamId={teamId ?? '1'} />
            <div className="flex flex-col relative bottom-2 justify-center">
              <button
                onClick={handleSelectGames}
                className="px-2 py-3  border-2 border-zinc-800 text-zinc-800 text-sm font-semibold rounded-md"
              >
                {selectedGames.length > 0 &&
                selectedGames[0].id === teamGames.previous[0].id
                  ? 'Upcoming Games'
                  : 'Previous Games'}
              </button>
              <div className="flex justify-end mt-8 text-zinc-600 font-light">
                <button onClick={handlePreviousPage} className="text-xl">
                  <IoIosArrowBack />
                </button>
                <span className="text-zinc-800">
                  {currentPage} of{' '}
                  {Math.ceil(selectedGames.length / gamesPerPage)} Pages
                </span>
                <button onClick={handleNextPage} className="text-xl">
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
                    className="border-y-[1px] border-zinc-400 h-24 w-3/4 cursor-pointer"
                  >
                    <td>
                      <Link to={`/games/${game.id}/stats`}>
                        <span className="text-xl font-light mr-4">
                          {game.date &&
                            game.date.slice(5, 10).replace('-', '/')}
                        </span>
                        <span className="text-4xl font-bold">
                          {Number(teamId) === game.home_team.id
                            ? game.visitor_team.full_name
                            : game.home_team.full_name}
                        </span>
                      </Link>
                    </td>
                    <td className="text-4xl font-bold">
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
        </>
      )}
    </div>
  );
}
