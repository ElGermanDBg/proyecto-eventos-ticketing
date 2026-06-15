import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import EventosList from './components/EventosList';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Sistema de Eventos</h1>
          <nav>
            <Link to="/">Eventos</Link>
            {!token ? (
              <Link to="/login">Iniciar Sesión</Link>
            ) : (
              <button onClick={logout} className="logout-btn">Cerrar Sesión</button>
            )}
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<EventosList token={token} />} />
            <Route path="/login" element={
              token ? <EventosList token={token} /> : <Login setToken={setToken} />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
