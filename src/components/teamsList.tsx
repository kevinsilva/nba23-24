import { useDataContext } from '../context/dataContext';
import { Link } from 'react-router-dom';
import Spinner from './spinner';
import ErrorMsg from './errorMsg';
import { motion } from 'framer-motion';
import {
  teamsContainerAnimation,
  teamsItemAnimation,
} from '../utils/utilitary';

export default function TeamsList() {
  const { teams, loading, error } = useDataContext();

  return (
    <div>
      {loading.teams && <Spinner />}
      {error.teams && <ErrorMsg text={error.teams} />}
      {!loading.teams && !error.teams && (
        <motion.ol
          variants={teamsContainerAnimation}
          initial="hidden"
          animate="show"
        >
          {teams.map((team) => (
            <motion.li
              key={team.id}
              className="my-6 md:my-8"
              variants={teamsItemAnimation}
            >
              <Link
                to={`/teams/${team.id}/roster`}
                className="font-sans uppercase font-black text-4xl md:text-6xl lg:text-8xl text-zinc-800 hover:opacity-80"
              >
                {team.full_name}
              </Link>
            </motion.li>
          ))}
        </motion.ol>
      )}
    </div>
  );
}
