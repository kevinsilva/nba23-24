import { useParams, useNavigate } from 'react-router-dom';
import { useDataContext } from '../context/dataContext';
import { getPlayerId } from '../utils/api';
import FilterTeams from './filterTeams';
import ErrorMsg from './errorMsg';
import Spinner from './spinner';
import { motion } from 'framer-motion';

export default function TeamRoster() {
  const { teamId } = useParams<{ teamId: string }>();
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
    <motion.section
      className="flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeIn', delay: 0.2 }}
    >
      <FilterTeams teamId={teamId ?? '1'} />
      {loading.players && <Spinner />}
      {error.players && <ErrorMsg text={error.players} />}
      {filteredTeamPlayers && (
        <table className="w-11/12 justify-center mx-auto">
          <thead>
            <tr className="uppercase text-zinc-500 text-xs h-10 text-left">
              <th className="font-light">Name</th>
              <th className="font-light">Position</th>
            </tr>
          </thead>
          <tbody className="font-semibold">
            {filteredTeamPlayers.list.map(([name, position]) => (
              <tr
                key={name}
                onClick={() => handleClick(name)}
                className="border-y-[1px] border-zinc-400 h-24 w-3/4 cursor-pointer"
              >
                <td className="text-4xl font-bold">{name}</td>
                <td className="font-light text-xl tracking-wide pl-2">
                  {position}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </motion.section>
  );
}
