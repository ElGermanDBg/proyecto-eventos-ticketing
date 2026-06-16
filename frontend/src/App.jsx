import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import EventosList from './components/EventosList';
import Dashboard from './components/Dashboard';
import './App.css';

// Componente Navbar separado para poder usar useNavigate
function Navbar({ token, rol, logout }) {
  const location = useLocation();

  return (
    <header className="App-header">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1>🎪 EventosApp</h1>
      </Link>
      <nav>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Eventos</Link>
        {rol === 'admin' && (
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
        )}
        {!token ? (
          <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Iniciar Sesión</Link>
        ) : (
          <button onClick={logout} className="logout-btn">Cerrar Sesión</button>
        )}
      </nav>
    </header>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [rol, setRol] = useState(localStorage.getItem('rol') || '');

  const logout = () => {
    setToken('');
    setRol('');
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
  };

  return (
    <Router>
      <div className="App">
        <Navbar token={token} rol={rol} logout={logout} />

        <main>
          <Routes>
            <Route path="/" element={<EventosList token={token} />} />
            <Route path="/dashboard" element={
              rol === 'admin' ? <Dashboard token={token} /> : <div className="empty-state"><div className="emoji">🔒</div><p>Acceso denegado</p></div>
            } />
            <Route path="/login" element={
              token ? <EventosList token={token} /> : <Login setToken={setToken} setRol={setRol} />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
