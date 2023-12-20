import { useDataContext } from '../context/dataContext';
import { Link } from 'react-router-dom';

export default function TeamsList() {
  const { teams, loading, error } = useDataContext();

  return (
    <div>
      {error.teams && <div>{error.teams}</div>}
      {loading.teams && <div>Loading...</div>}
      <ol>
        {teams.map((team) => (
          <li key={team.id}>
            <Link to={`/teams/${team.id}/roster`}>{team.full_name}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
