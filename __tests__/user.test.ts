import initApp from '../src/app';
import request from 'supertest';
import { Express } from 'express';
import SequelizePGDB from '../src/adapters/sequelize-pgdb';
import { User } from '../src/adapters/sequelize-models';
import exp from 'constants';
import { Sequelize } from 'sequelize';


describe('GET /api/v1/users', () => {
   let app: Express;
   let sequelize: Sequelize;

    beforeAll(async () => {
      app = await initApp;
    });

    beforeEach(async () => {
      await SequelizePGDB.init();
      sequelize = SequelizePGDB.getInstance();
      await sequelize.sync({ force: true });
    });

    test('should create a new user and return 201 CREATED',async () => {
      const params = { name: 'John', email: 'johnsnow@castleblack.com', password: '12345' };
      const req = await request(app).post('/api/v1/users').send(params);
      expect(req.status).toBe(201);
      
    });

    test('should list users and return 200 OK', async () => {
        User.create({ name: 'John', email: 'johnsnow@castleblack.com', password: '12345' });
        const req = await request(app).get('/api/v1/users');
        expect(req.status).toBe(200);
        expect(req.body).toBeDefined();
        expect(req.body.users.length).toBe(1);
    });

    test('should find by id and return 200 OK', async () => {
        const user = await User.create({ name: 'MR Snow', email: 'MrSnow@castleblack.com', password: '12345' });

        const req = await request(app).get(`/api/v1/users/${user.id}`);
        expect(req.status).toBe(200);
        expect(req.body).toBeDefined();
        expect(req.body.user.name).toBe('MR Snow');
        expect(req.body.user.email).toBe('MrSnow@castleblack.com');
        expect(req.body.user.id).toBe(user.id);
    });

    test('should update user and return 200 OK', async () => {
        const user = await User.create({ name: 'MR Snow', email: 'MrSnow@castleblack.com', password: '12345' });
        const req = await request(app).put(`/api/v1/users/${user.id}`).send({ name: 'John Snow' });
        expect(req.status).toBe(200);
        const updatedUser = await User.findByPk(user.id);
        expect(updatedUser?.name).toBe('John Snow');
        expect(updatedUser?.email).toBe('MrSnow@castleblack.com');
    });

    test('should delete user and return 200 OK', async () => {
        const user = await User.create({ name: 'MR Snow', email: 'MrSnow@castleblack.com', password: '12345' });
        const req = await request(app).delete(`/api/v1/users/${user.id}`);
        expect(req.status).toBe(200);
        const deletedUser = await User.findByPk(user.id);
        expect(deletedUser).toBeNull();
        expect(req.body).toBeDefined();
        expect(req.body.message).toBe('User deleted successfully');
    });

    afterEach(() => {
      SequelizePGDB.disconnect();
    });
});