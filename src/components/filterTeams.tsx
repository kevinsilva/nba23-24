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
    <>
      <select value={teamId} onChange={handleSelectChange}>
        {teams.map((team) => (
          <option value={team.id?.toString()} key={team.id}>
            {team.full_name}
          </option>
        ))}
      </select>
    </>
  );
}
