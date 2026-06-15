import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CompraTicket from './CompraTicket';

function EventosList({ token }) {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await api.get('/eventos');
        setEventos(response.data);
      } catch (err) {
        console.error('Error fetching eventos', err);
      }
    };
    fetchEventos();
  }, []);

  return (
    <div>
      <h2>Eventos Disponibles</h2>
      <div className="eventos-grid">
        {eventos.map(evento => (
          <div key={evento.id} className="evento-card">
            <h3>{evento.nombre}</h3>
            <p>{evento.descripcion}</p>
            <p><strong>Fecha:</strong> {new Date(evento.fecha).toLocaleDateString()}</p>
            <p><strong>Lugar:</strong> {evento.lugar}</p>
            <p><strong>Precio:</strong> ${evento.precio}</p>
            {token && <CompraTicket eventoId={evento.id} token={token} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventosList;
