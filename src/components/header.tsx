import { Link } from 'react-router-dom';
import nbaLogo from '../assets/nba_logo.png';
import Navigation from './navigation';

export default function Header() {
  return (
    <header className="flex items-center justify-between mt-4 mb-24 sm:mb-16">
      <div className="flex flex-col sm:flex-row sm:items-center relative">
        <Link to="/" aria-label="Home" className="flex items-center gap-1">
          <img
            src={nbaLogo}
            alt="NBA Logo"
            className="h-[3rem] relative left-[.2rem]"
          />
          <span className="font-black">NBA</span>
        </Link>
        <span className="ml-2 font-light text-zinc-500 tracking-wide absolute top-[3.5rem] left-[.5rem] sm:relative sm:top-0 sm:left-0">
          | 2023-2024
        </span>
      </div>
      <div>
        <Navigation />
      </div>
    </header>
  );
}
