import initApp from '../src/app';
import request from 'supertest';
import { Express } from 'express';
import SequelizePGDB from '../src/adapters/sequelize-pgdb';
import { Role, Tenant, User } from '../src/adapters/sequelize-models';
import { Sequelize } from 'sequelize';
import { signJWTAccessToken } from '../src/services/jwt-services';

describe('API auth access', () => {
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
    });


    test('should signin and return 200 OK', async () => {
        const tenant = await Tenant.create({ name: 'Company', description: 'foo bar' });
        const user = await User.create({ name: 'superadmin', email: 'email@email', password: 'secret123'});
    //   accessToken = signJWTAccessToken(email, id, 0, '', 0);
        const role = await Role.create({user_id: user.id, tenant_id: tenant.id, name: 'admin'}); 
        
        const res = await request(app)
            .post('/api/v1/sign-in')
            .send({ tenantName: tenant.name, email: user.email, password: 'secret123' });

        console.info(res.body);
        expect(res.status).toBe(200);
    });
});