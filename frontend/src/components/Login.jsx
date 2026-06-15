import React, { useState } from 'react';
import api from '../services/api';

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
