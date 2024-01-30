import initApp from '../src/app';
import request from 'supertest';
import { Express } from 'express';
import SequelizePGDB from '../src/adapters/sequelize-pgdb';
import { Sequelize } from 'sequelize';
import { signJWTAccessToken } from '../src/services/jwt-services';
import { User } from '../src/adapters/sequelize-models';

describe('Routes /api/v1/tenants', () => {
   let app: Express;
   let sequelize: Sequelize;
   let accessToken: string;

    beforeAll(async () => {
      app = await initApp;
    });

    beforeEach(async () => {
      await SequelizePGDB.init();
      sequelize = SequelizePGDB.getInstance();
      await sequelize.sync({ force: true });
      const { id, email, name } = await User.create({
        superuser: true,
        name: 'superadmin',
        email: 'email@email',
        password: 'secret123',
      });
      accessToken = signJWTAccessToken(email, id, 0, '', 0);
    });

    test('should list existing tenants and return 200 OK',async () => {
        const res = await request(app)
            .get('/api/v1/tenants')
            .set('Accept', 'application/json')
            .set('Authorization', `bearer ${accessToken}`);
        
        expect(res.status).toBe(200);
    })
    test('should create a new tenant and return 201 CREATED',async () => {
        const res = await request(app)
            .post('/api/v1/tenants')
            .set('Accept', 'application/json')
            .set('Authorization', `bearer ${accessToken}`)
            .send({name:'ifood',description:''});

        expect(res.status).toBe(201);
        expect(res.body).toBeDefined();
        expect(res.body.tenant.name).toBe('ifood');
    });
    afterEach(() => {
      SequelizePGDB.disconnect();
    });
});