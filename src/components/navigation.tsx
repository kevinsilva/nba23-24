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
          <Link to="/roster" aria-label="Roster">
            Roster
          </Link>
        </li>
        <li>
          <Link to="/games" aria-label="Games">
            Games
          </Link>
        </li>
        <li>
          <Link to="/stats" aria-label="Stats">
            Stats
          </Link>
        </li>
      </ul>
    </nav>
  );
}
