import { Link } from 'react-router-dom';
import ThemeSwitch from './themeSwitch';

export default function Navigation() {
  return (
    <nav className="font-sans flex">
      <ul className="flex justify-end gap-4 uppercase text-sm font-semibold text-zinc-500 dark:text-zinc-400">
        <li className="hover:text-zinc-700 dark:hover:text-zinc-200">
          <Link
            to="/"
            aria-label="Teams"
            className="focus:text-zinc-700 dark:focus:text-zinc-200"
          >
            Teams
          </Link>
        </li>
        <li className="hover:text-zinc-700 dark:hover:text-zinc-200">
          <Link
            to="/teams/1/roster"
            aria-label="Roster"
            className="focus:text-zinc-700 dark:focus:text-zinc-200"
          >
            Roster
          </Link>
        </li>
        <li className="hover:text-zinc-700 dark:hover:text-zinc-200">
          <Link
            to="/teams/1/games"
            aria-label="Games"
            className="focus:text-zinc-700 dark:focus:text-zinc-200"
          >
            Games
          </Link>
        </li>
      </ul>
      <ThemeSwitch />
    </nav>
  );
}
