import { Link } from 'react-router-dom';
import nbaLogo from '../assets/nba_logo.png';
import bridgeInLogo from '../assets/bi_logo.png';
import Navigation from './navigation';

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-16">
      <div className="flex items-center">
        <Link to="/" aria-label="Home" className="flex items-center gap-1">
          <img
            src={nbaLogo}
            alt="NBA Logo"
            className="h-[3rem] relative left-[.2rem]"
          />
          <span className="font-light"> by</span>
          <img
            src={bridgeInLogo}
            alt="Bridge In Logo"
            className="max-h-[1rem]"
          />
        </Link>
        <span className="ml-2 font-light text-zinc-500 tracking-wide">
          | 2023-2024
        </span>
      </div>
      <div>
        <Navigation />
      </div>
    </header>
  );
}
