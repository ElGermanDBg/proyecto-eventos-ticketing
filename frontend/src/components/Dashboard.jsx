import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Dashboard({ token }) {
  const [eventos, setEventos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '', descripcion: '', fecha: '', lugar: '', capacidad: '', precio: ''
  });

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
      fetchEventos();
    } catch (err) {
      alert('Error al crear evento: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este evento?')) return;
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
    <div className="dashboard-container" style={{ padding: '20px' }}>
      <h2>Dashboard Administrativo</h2>
      
      <div className="create-evento-form" style={{ marginBottom: '40px', background: '#f5f5f5', padding: '20px', borderRadius: '8px', color: '#333' }}>
        <h3>Crear Nuevo Evento</h3>
        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
          <input type="text" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} required />
          <input type="datetime-local" name="fecha" value={formData.fecha} onChange={handleChange} required />
          <input type="text" name="lugar" placeholder="Lugar" value={formData.lugar} onChange={handleChange} required />
          <input type="number" name="capacidad" placeholder="Capacidad" value={formData.capacidad} onChange={handleChange} required />
          <input type="number" step="0.01" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} required />
          <button type="submit" style={{ marginTop: '10px' }}>Crear Evento</button>
        </form>
      </div>

      <h3>Lista de Eventos</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
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
            <tr key={evento.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td>{evento.nombre}</td>
              <td>{new Date(evento.fecha).toLocaleDateString()}</td>
              <td>{evento.lugar}</td>
              <td>{evento.capacidad}</td>
              <td>${evento.precio}</td>
              <td>
                <button onClick={() => handleDelete(evento.id)} style={{ background: '#ff4d4f', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
