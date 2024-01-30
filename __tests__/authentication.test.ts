import initApp from '../src/app';
import request from 'supertest';
import { Express } from 'express';
import SequelizePGDB from '../src/adapters/sequelize-pgdb';
import { Role, Tenant, User } from '../src/adapters/sequelize-models';
import { Sequelize } from 'sequelize';

describe('API auth access', () => {
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


    test('should signin and return 200 OK with accessToken', async () => {
        const tenant = await Tenant.create({ name: 'Company', description: 'foo bar' });
        const user = await User.create({ name: 'superadmin', email: 'email@email', password: 'secret123' });
        await Role.create({ user_id: user.id, tenant_id: tenant.id, name: 'admin' });

        const res = await request(app)
            .post('/api/v1/sign-in')
            .send({ tenantName: tenant.name, email: user.email, password: 'secret123' });

        expect(res.body.accessToken).toBeDefined();
        expect(res.status).toBe(200);
    });

    test('should signup and return 200 OK', async () => {
        const tenant = await Tenant.create({ name: 'Company', description: 'foo bar' });
        const res = await request(app)
            .post('/api/v1/sign-up')
            .send({ tenantName: tenant.name, name: 'gulb', email: 'email@email', password: 'secret123', confirmPassword: 'secret123' })

        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Sign up successfully.');
    });

    afterEach(() => {
      SequelizePGDB.disconnect();
    });
});