import { useDataContext } from '../context/dataContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function FilterTeams({ teamId }: { teamId: string }) {
  const { teams } = useDataContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTeamId = event.target.value;
    const currentPath = location.pathname;
    const newPath = currentPath.replace(teamId, selectedTeamId);
    navigate(newPath);
  };

  return (
    <div className="flex mb-8">
      <select
        value={teamId}
        onChange={handleSelectChange}
        className="bg-zinc-50 text-lg font-black p-2 border-l-[1px] border-transparent focus:border-l-[1px] focus:border-zinc-400 focus:outline-none cursor-pointer hover:opacity-80 dark:bg-zinc-900 dark:text-zinc-50"
      >
        {teams.map((team) => (
          <option value={team.id?.toString()} key={team.id}>
            {team.full_name}
          </option>
        ))}
      </select>
    </div>
  );
}
