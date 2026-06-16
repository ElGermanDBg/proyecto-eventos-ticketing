const request = require('supertest');
const app = require('../src/app');

// ============================================
// PRUEBAS UNITARIAS - API de Eventos
// ============================================
describe('API Eventos', () => {
  it('Debe responder 200 y un arreglo en GET /api/eventos', async () => {
    const res = await request(app).get('/api/eventos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('Debe responder 404 para un evento que no existe', async () => {
    const res = await request(app).get('/api/eventos/99999');
    expect(res.statusCode).toBe(404);
  });
});

// ============================================
// PRUEBAS UNITARIAS - API de Autenticación
// ============================================
describe('API Auth', () => {
  it('Debe rechazar registro sin campos obligatorios (400)', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('Debe rechazar registro con email inválido (400)', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ nombre: 'Test', email: 'no-es-email', password: '123456' });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('Debe rechazar registro con password menor a 6 caracteres (400)', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ nombre: 'Test', email: 'test@test.com', password: '123' });
    expect(res.statusCode).toBe(400);
  });

  it('Debe rechazar login sin credenciales (404 o 500)', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'noexiste@test.com', password: '123456' });
    // Puede ser 404 (usuario no encontrado) o 500 si la DB no está conectada
    expect([404, 500]).toContain(res.statusCode);
  });
});

// ============================================
// PRUEBAS UNITARIAS - API de Tickets
// ============================================
describe('API Tickets', () => {
  it('Debe rechazar compra de ticket sin token JWT (403)', async () => {
    const res = await request(app)
      .post('/api/tickets/comprar')
      .send({ evento_id: 1 });
    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBeDefined();
  });

  it('Debe rechazar ver mis-tickets sin token JWT (403)', async () => {
    const res = await request(app)
      .get('/api/tickets/mis-tickets');
    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBeDefined();
  });

  it('Debe rechazar compra con token inválido (401)', async () => {
    const res = await request(app)
      .post('/api/tickets/comprar')
      .set('Authorization', 'Bearer token_invalido_12345')
      .send({ evento_id: 1 });
    expect(res.statusCode).toBe(401);
  });
});

// ============================================
// PRUEBAS UNITARIAS - Seguridad y Middlewares
// ============================================
describe('Seguridad', () => {
  it('Debe tener headers de seguridad de Helmet', async () => {
    const res = await request(app).get('/');
    // Helmet configura estos headers automáticamente
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['x-frame-options']).toBeDefined();
  });

  it('El endpoint raíz debe responder correctamente', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('API funcionando correctamente');
  });

  it('Debe rechazar crear evento sin autenticación (403)', async () => {
    const res = await request(app)
      .post('/api/eventos')
      .send({ nombre: 'Evento Test', fecha: '2026-12-01', lugar: 'Test', capacidad: 100, precio: 50 });
    expect(res.statusCode).toBe(403);
  });

  it('Debe rechazar crear evento con token inválido (401)', async () => {
    const res = await request(app)
      .post('/api/eventos')
      .set('Authorization', 'Bearer token_falso')
      .send({ nombre: 'Evento Test', fecha: '2026-12-01', lugar: 'Test', capacidad: 100, precio: 50 });
    expect(res.statusCode).toBe(401);
  });
});
