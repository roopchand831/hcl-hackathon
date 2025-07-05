import request from 'supertest';
import express from 'express';
import router from '../Routes/userRoute';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../models/userModel');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/', router);

describe('Auth Routes', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /register', () => {
    it('should register a new user and return token', async () => {
      const mockUser = {
        _id: '123',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
        save: jest.fn().mockResolvedValue({
          _id: '123',
          name: 'Test User',
          email: 'test@example.com',
          role: 'user'
        }),
      };

      User.mockImplementation(() => mockUser);
      bcrypt.genSalt.mockResolvedValue('salt');
      bcrypt.hash.mockResolvedValue('hashedpassword');
      jwt.sign.mockReturnValue('mocktoken');

      const response = await request(app)
        .post('/register')
        .send({
          name: 'Test User',
          username: 'testuser',
          email: 'test@example.com',
          password: 'password',
          role: 'user'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.name).toBe('Test User');
    });
  });

  describe('POST /signin', () => {
    it('should sign in a user with valid credentials', async () => {
      const mockUser = {
        _id: '123',
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
        role: 'user'
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mocktoken');

      const response = await request(app)
        .post('/signin')
        .send({ email: 'test@example.com', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should return 400 for invalid password', async () => {
      User.findOne.mockResolvedValue({ password: 'hashedpassword' });
      bcrypt.compare.mockResolvedValue(false);

      const response = await request(app)
        .post('/signin')
        .send({ email: 'test@example.com', password: 'wrongpass' });

      expect(response.status).toBe(400);
      expect(response.text).toBe('invalid username or password');
    });

    it('should return 400 for non-existent user', async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/signin')
        .send({ email: 'noexist@example.com', password: 'pass' });

      expect(response.status).toBe(400);
      expect(response.text).toBe('Invalid email or password');
    });
  });

  describe('GET /getInfo', () => {
    it('should return user info when token is valid', async () => {
      jwt.verify.mockReturnValue({ _id: '123', email: 'test@example.com' });

      const response = await request(app)
        .get('/getInfo')
        .set('Authorization', 'Bearer validtoken');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User info retrieved successfully');
      expect(response.body.user).toHaveProperty('_id');
    });

    it('should return 401 for missing token', async () => {
      const response = await request(app)
        .get('/getInfo');

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Access denied. No token provided.');
    });

    it('should return 401 for invalid token', async () => {
      jwt.verify.mockImplementation(() => { throw new Error('Invalid'); });

      const response = await request(app)
        .get('/getInfo')
        .set('Authorization', 'Bearer invalidtoken');

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid token.');
    });
  });
});
