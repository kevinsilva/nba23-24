import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <Link to="/" aria-label="Home">
        <h1>NBA by Bridge In</h1>
      </Link>
    </header>
  );
}
