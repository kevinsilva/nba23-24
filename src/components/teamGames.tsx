import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchTeamGames } from '../utils/api';
import { AllTeamGameTypes, TeamGameTypes } from '../utils/types';
import FilterTeams from './filterTeams';
import { gamesPerPage, season } from '../utils/utilitary';

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
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {teamGames && (
        <>
          <div>
            <FilterTeams teamId={teamId ?? '1'} />
            <button onClick={handleSelectGames}>
              {selectedGames.length > 0 &&
              selectedGames[0].id === teamGames.previous[0].id
                ? 'upcoming'
                : 'previous'}
            </button>
            <button onClick={handlePreviousPage}>Previous Page</button>
            <span>
              {currentPage} of {Math.ceil(selectedGames.length / gamesPerPage)}
            </span>
            <button onClick={handleNextPage}>Next Page</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Game</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {selectedGames
                .slice(
                  (currentPage - 1) * gamesPerPage,
                  currentPage * gamesPerPage
                )
                .map((game) => (
                  <tr key={game.id}>
                    <td>
                      <Link to={`/games/${game.id}/stats`}>
                        {game.date && game.date.slice(5, 10).replace('-', '/')}{' '}
                        {Number(teamId) === game.home_team.id
                          ? game.visitor_team.full_name
                          : game.home_team.full_name}
                      </Link>
                    </td>
                    <td>
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
