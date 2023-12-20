import { useParams } from 'react-router-dom';
import { useDataContext } from '../context/dataContext';

export default function TeamRoster() {
  const { teamId } = useParams<{ teamId: string | undefined }>();
  const { players, loading, error } = useDataContext();

  const teamPlayers = players.filter(
    (player) => player.team.id === parseInt(teamId || '')
  );

  return (
    <div>
      {error.players && <div>{error.players}</div>}
      {loading.players && <div>Loading...</div>}
      <ol>
        {teamPlayers.map((player) => (
          <li key={player.id}>
            {player.first_name}
            {player.last_name}
          </li>
        ))}
      </ol>
    </div>
  );
}
