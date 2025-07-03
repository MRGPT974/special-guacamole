const request = require('supertest');
const app = require('../backend/server');

describe('Auth flows', () => {
  test('register user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ nom: 'Test', prenom: 'User', email: 'user@example.com', password: 'password', role: 'PARENT' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  test('login admin', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@example.com', password: 'adminpass' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('admin stats', async () => {
    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@example.com', password: 'adminpass' });
    const token = login.body.token;
    const res = await request(app)
      .get('/api/admin/stats')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('totalUsers');
  });
});
