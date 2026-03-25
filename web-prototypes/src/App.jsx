import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import FirstComparison from './pages/FirstComparison';
import Proto from './pages/Proto';
import TestTemporalSeries from './pages/TestTemporalSeries';
import UserManual from './pages/UserManual';

function App() {
  return (
    <Router>
      <div className="App" style={{ fontFamily: '"Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', paddingBottom: '40px' }}>
        <nav style={{ 
          backgroundColor: '#ffffff', 
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          padding: '16px 32px', 
          marginBottom: '40px',
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: '30px', 
          flexWrap: 'wrap'
        }}>
          <NavLink to="/" style={{ color: '#111827', textDecoration: 'none', fontWeight: '500', fontSize: '15px' }}>Inicio</NavLink>
          
          <div style={{ display: 'flex', gap: '20px', borderLeft: '1px solid #e5e7eb', paddingLeft: '20px' }}>
            <NavLink to="/comparativa" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>Test: Comparativa</NavLink>
            <NavLink to="/test-serie-temporal" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>Test: Serie Temporal</NavLink>
          </div>

          <div style={{ borderLeft: '1px solid #e5e7eb', paddingLeft: '20px' }}>
            <NavLink to="/prototipo" style={{ color: '#4f46e5', fontWeight: '600', textDecoration: 'none', fontSize: '15px', padding: '8px 16px', backgroundColor: '#eef2ff', borderRadius: '6px' }}>PROTOTIPO REAL</NavLink>
          </div>

          <div style={{ display: 'flex', gap: '20px', borderLeft: '1px solid #e5e7eb', paddingLeft: '20px' }}>
            <NavLink to="/manual" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>Manual de Usuario</NavLink>
          </div>
        </nav>

        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/comparativa" element={<FirstComparison />} />
            <Route path="/test-serie-temporal" element={<TestTemporalSeries />} />
            <Route path="/prototipo" element={<Proto />} />
            <Route path="/manual" element={<UserManual />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;