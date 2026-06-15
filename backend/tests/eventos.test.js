const request = require('supertest');
const app = require('../src/app');

describe('API Eventos', () => {
  it('Debe responder 200 y un arreglo en GET /api/eventos', async () => {
    const res = await request(app).get('/api/eventos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
