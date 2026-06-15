import React, { useState } from 'react';
import api from '../services/api';

function CompraTicket({ eventoId, token }) {
  const [mensaje, setMensaje] = useState('');

  const comprar = async () => {
    try {
      const response = await api.post('/tickets/comprar', { evento_id: eventoId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensaje('¡Ticket comprado con éxito!');
    } catch (err) {
      setMensaje(err.response?.data?.error || 'Error al comprar el ticket');
    }
  };

  return (
    <div>
      <button onClick={comprar}>Comprar Ticket</button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default CompraTicket;
