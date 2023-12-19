import { useEffect, useState } from 'react';
import { getTeams } from '../utils/api';
import { TeamsTypes } from '../utils/types';

export default function TeamsList() {
  const [teams, setTeams] = useState<TeamsTypes[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsResponse = await getTeams();
        setTeams(teamsResponse);
      } catch (error) {
        setError('Error fetching teams. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {error && <div>{error}</div>}
      {/* {JSON.stringify(teams, null, 2)} */}
      <ol>
        {teams.map((team) => (
          <li key={team.id}>{team.full_name}</li>
        ))}
      </ol>
    </div>
  );
}
