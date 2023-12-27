import { useParams, useNavigate } from 'react-router-dom';
import { useDataContext } from '../context/dataContext';
import { getPlayerId } from '../utils/api';
import FilterTeams from './filterTeams';

export default function TeamRoster() {
  const { teamId } = useParams<{ teamId: string | '1' }>();
  const { players, loading, error, setError } = useDataContext();
  const navigate = useNavigate();

  const filteredTeamPlayers = players.filter(
    (team) => team.id === parseInt(teamId || '1')
  )[0];

  const handleClick = async (name: string) => {
    try {
      const playerResponse = await getPlayerId(name);
      const playerId = playerResponse.data[0].id;
      if (playerId) navigate(`/players/${playerId}/stats`);
    } catch (error) {
      console.error(error);
      setError((prevState) => ({
        ...prevState,
        players: 'Error fetching playerId. Please try again',
      }));
    }
  };

  return (
    <div>
      <FilterTeams teamId={teamId ? teamId : '1'} />
      {error.players && <div>{error.players}</div>}
      {loading.players && <div>Loading...</div>}
      {filteredTeamPlayers && (
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeamPlayers.list.map(([name, position]) => (
              <tr key={name} onClick={() => handleClick(name)}>
                <td>{position}</td>
                <td>{name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
