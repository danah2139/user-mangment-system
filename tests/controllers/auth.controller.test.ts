import '../setup'; // Ensure this is at the top
import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/app';
import sequelize from '../../src/models';

let token: string;

describe('Auth Endpoints', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('message', 'User created successfully');
      expect(res.body.user).to.include({
        name: 'John Doe',
        email: 'john@example.com',
      });
    });
  });

  describe('POST /api/auth/login', () => {
    it('should log in an existing user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john@example.com',
          password: 'password123',
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'Login successful');
      expect(res.body).to.have.property('token');
      token = res.body.token; // Save token for later use
    });
  });
});