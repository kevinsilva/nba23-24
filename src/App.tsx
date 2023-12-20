import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/mainContent';
import TeamRoster from './components/teamRoster';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/teams/:teamId/roster" element={<TeamRoster />} />
      </Routes>
    </Router>
  );
}

export default App;
