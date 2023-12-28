import { useDataContext } from '../context/dataContext';
import { Link } from 'react-router-dom';
import Spinner from './spinner';
import ErrorMsg from './errorMsg';

export default function TeamsList() {
  const { teams, loading, error } = useDataContext();

  return (
    <div className="">
      {loading.teams && <Spinner />}
      {error.teams && <ErrorMsg text={error.teams} />}
      {!loading.teams && !error.teams && (
        <ol>
          {teams.map((team) => (
            <li key={team.id} className="my-4">
              <Link
                to={`/teams/${team.id}/roster`}
                className="font-sans uppercase font-black text-8xl text-zinc-800"
              >
                {team.full_name}
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
