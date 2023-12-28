import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="font-sans">
      <ul className="flex justify-end gap-4 uppercase text-sm font-semibold text-zinc-500">
        <li className="hover:text-zinc-700">
          <Link to="/" aria-label="Teams" className="focus:text-zinc-700">
            Teams
          </Link>
        </li>
        <li className="hover:text-zinc-700">
          <Link
            to="/teams/1/roster"
            aria-label="Roster"
            className="focus:text-zinc-700"
          >
            Roster
          </Link>
        </li>
        <li className="hover:text-zinc-700">
          <Link
            to="/teams/1/games"
            aria-label="Games"
            className="focus:text-zinc-700"
          >
            Games
          </Link>
        </li>
      </ul>
    </nav>
  );
}
