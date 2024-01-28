import initApp from '../src/app';
import request from 'supertest';
import { Express } from 'express';

jest.mock('../src/adapters/sequelize-pgdb', () => ({
  init: jest.fn(),
  connect: jest.fn(),
}));

describe('GET /healthcheck', () => {
   let app: Express;

    test('should return 200 OK', async () => {
        app = await initApp;
        const req = await request(app).get('/healthcheck');
        expect(req.status).toBe(200);
    })
});