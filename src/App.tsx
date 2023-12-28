import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TeamRoster from './components/teamRoster';
import PlayerStats from './components/playerStats';
import TeamGames from './components/teamGames';
import GameStats from './components/gameStats';
import Footer from './components/footer';
import Header from './components/header';
import TeamsList from './components/teamsList';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<TeamsList />} />
        <Route path="/teams/:teamId/roster" element={<TeamRoster />} />
        <Route path="/players/:playerId/stats" element={<PlayerStats />} />
        <Route path="/teams/:teamId/games" element={<TeamGames />} />
        <Route path="/games/:gameId/stats" element={<GameStats />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
