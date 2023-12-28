import { useNavigate, useLocation } from 'react-router-dom';
import { useDataContext } from '../context/dataContext';
import { getPlayerId } from '../utils/api';
export default function FilterPlayers({
  playerId,
  teamId,
  playerName,
}: {
  playerId: string;
  teamId: number;
  playerName: string;
}) {
  const { players } = useDataContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedPlayerIdResponse = await getPlayerId(event.target.value);
    const selectedPlayerId = selectedPlayerIdResponse.data[0].id;
    const currentPath = location.pathname;
    const newPath = currentPath.replace(playerId, selectedPlayerId);
    navigate(newPath);
  };

  return (
    <div className="flex mb-8">
      <select
        value={playerName}
        onChange={handleSelectChange}
        className="bg-zinc-50 text-lg font-black p-2 border-l-[1px] border-transparent focus:border-l-[1px] focus:border-zinc-400 focus:outline-none"
      >
        {players
          .filter((roster) => roster.id == teamId)[0]
          .list.map((player) => (
            <option value={player[0]} key={player[0]}>
              {player[0]}
            </option>
          ))}
      </select>
    </div>
  );
}
