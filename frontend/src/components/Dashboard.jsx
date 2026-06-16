import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Dashboard({ token }) {
  const [eventos, setEventos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '', descripcion: '', fecha: '', lugar: '', capacidad: '', precio: ''
  });
  const [mensaje, setMensaje] = useState('');

  const fetchEventos = async () => {
    try {
      const response = await api.get('/eventos');
      setEventos(response.data);
    } catch (err) {
      console.error('Error al cargar eventos', err);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/eventos', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({ nombre: '', descripcion: '', fecha: '', lugar: '', capacidad: '', precio: '' });
      setMensaje('Evento creado exitosamente ✅');
      setTimeout(() => setMensaje(''), 3000);
      fetchEventos();
    } catch (err) {
      setMensaje('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este evento?')) return;
    try {
      await api.delete(`/eventos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEventos();
    } catch (err) {
      alert('Error al eliminar evento');
    }
  };

  return (
    <div className="dashboard-container">
      <h2>⚙️ Dashboard Administrativo</h2>

      <div className="create-evento-form">
        <h3>➕ Crear Nuevo Evento</h3>
        {mensaje && <div className="success-message" style={{ marginBottom: '1rem' }}>{mensaje}</div>}
        <form onSubmit={handleCreate}>
          <div className="form-grid">
            <div className="form-group">
              <label>Nombre del evento</label>
              <input type="text" name="nombre" placeholder="Nombre del evento" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Lugar</label>
              <input type="text" name="lugar" placeholder="Lugar del evento" value={formData.lugar} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Fecha y hora</label>
              <input type="datetime-local" name="fecha" value={formData.fecha} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Capacidad</label>
              <input type="number" name="capacidad" placeholder="Ej: 500" value={formData.capacidad} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Precio ($)</label>
              <input type="number" step="0.01" name="precio" placeholder="Ej: 85.00" value={formData.precio} onChange={handleChange} required />
            </div>
            <div className="form-group full-width">
              <label>Descripción</label>
              <input type="text" name="descripcion" placeholder="Descripción del evento" value={formData.descripcion} onChange={handleChange} required />
            </div>
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Crear Evento</button>
        </form>
      </div>

      <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>📋 Lista de Eventos</h3>
      {eventos.length === 0 ? (
        <div className="empty-state">
          <div className="emoji">📭</div>
          <p>No hay eventos creados</p>
        </div>
      ) : (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Lugar</th>
              <th>Capacidad</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map(evento => (
              <tr key={evento.id}>
                <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{evento.nombre}</td>
                <td>{new Date(evento.fecha).toLocaleDateString('es-MX')}</td>
                <td>{evento.lugar}</td>
                <td>{evento.capacidad}</td>
                <td style={{ color: 'var(--accent-secondary)', fontWeight: 600 }}>${Number(evento.precio).toFixed(2)}</td>
                <td>
                  <button onClick={() => handleDelete(evento.id)} className="btn-danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
