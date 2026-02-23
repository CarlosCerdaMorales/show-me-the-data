import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import FirstComparison from './pages/FirstComparison';
import Proto from './pages/Proto';
import TestTemporalSeries from './pages/TestTemporalSeries'; // <--- NUEVO IMPORT

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ 
          padding: '20px', backgroundColor: '#333', marginBottom: '30px',
          display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap'
        }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>🏠 Inicio</Link>
          
          <div style={{ display: 'flex', gap: '15px', borderLeft: '1px solid #555', paddingLeft: '15px' }}>
            <Link to="/comparativa" style={{ color: '#aaa', textDecoration: 'none' }}>Test: Comparativa</Link>
            <Link to="/test-serie-temporal" style={{ color: '#aaa', textDecoration: 'none' }}>Test: Serie Temporal</Link>
          </div>

          <div style={{ borderLeft: '1px solid #555', paddingLeft: '15px' }}>
            <Link to="/prototipo" style={{ color: '#4CAF50', fontWeight: 'bold', textDecoration: 'none' }}>PROTOTIPO REAL</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comparativa" element={<FirstComparison />} />
          <Route path="/test-serie-temporal" element={<TestTemporalSeries />} />
          <Route path="/prototipo" element={<Proto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;