import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" aria-label="Teams">
            Teams
          </Link>
        </li>
        <li>
          <Link to="/teams/1/roster" aria-label="Roster">
            Roster
          </Link>
        </li>
        <li>
          <Link to="/teams/1/games" aria-label="Games">
            Games
          </Link>
        </li>
      </ul>
    </nav>
  );
}
