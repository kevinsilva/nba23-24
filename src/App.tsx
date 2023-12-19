import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/main';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
