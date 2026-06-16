import React, { useState } from 'react';
import api from '../services/api';

function CompraTicket({ eventoId, token }) {
  const [mensaje, setMensaje] = useState('');
  const [tipo, setTipo] = useState('');
  const [loading, setLoading] = useState(false);

  const comprar = async () => {
    setLoading(true);
    setMensaje('');
    try {
      await api.post('/tickets/comprar', { evento_id: eventoId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMensaje('¡Ticket comprado con éxito! 🎉');
      setTipo('success');
    } catch (err) {
      setMensaje(err.response?.data?.error || 'Error al comprar el ticket');
      setTipo('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={comprar} className="btn-success" disabled={loading}>
        {loading ? '...' : '🎫 Comprar'}
      </button>
      {mensaje && (
        <div className={tipo === 'success' ? 'success-message' : 'error-message'} style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
          {mensaje}
        </div>
      )}
    </div>
  );
}

export default CompraTicket;
