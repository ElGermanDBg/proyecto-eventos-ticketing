import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CompraTicket from './CompraTicket';

function EventosList({ token }) {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await api.get('/eventos');
        setEventos(response.data);
      } catch (err) {
        console.error('Error fetching eventos', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEventos();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Cargando eventos...</p>
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeUp 0.5s ease' }}>
      <div className="section-header">
        <h2>🎭 Eventos Disponibles</h2>
        <p>Descubre los mejores eventos y reserva tus entradas</p>
      </div>

      {eventos.length === 0 ? (
        <div className="empty-state">
          <div className="emoji">📭</div>
          <p>No hay eventos disponibles en este momento</p>
        </div>
      ) : (
        <div className="eventos-grid">
          {eventos.map(evento => (
            <div key={evento.id} className="evento-card">
              <div className="evento-card-header">
                <h3>{evento.nombre}</h3>
              </div>
              <div className="evento-card-body">
                <p className="descripcion">{evento.descripcion}</p>
                <div className="evento-detail">
                  <span className="icon">📅</span>
                  <span className="label">Fecha:</span>
                  <span className="value">{new Date(evento.fecha).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="evento-detail">
                  <span className="icon">📍</span>
                  <span className="label">Lugar:</span>
                  <span className="value">{evento.lugar}</span>
                </div>
                <div className="evento-detail">
                  <span className="icon">👥</span>
                  <span className="label">Capacidad:</span>
                  <span className="value">{evento.capacidad} personas</span>
                </div>
              </div>
              <div className="evento-card-footer">
                <span className="evento-precio">${Number(evento.precio).toFixed(2)}</span>
                {token ? (
                  <CompraTicket eventoId={evento.id} token={token} />
                ) : (
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Inicia sesión para comprar</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventosList;
