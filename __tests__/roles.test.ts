import initApp from '../src/app';
import request from 'supertest';
import { Express } from 'express';
import SequelizePGDB from '../src/adapters/sequelize-pgdb';
import { Permission, PermittedData, Role, Tenant, User } from '../src/adapters/sequelize-models';
import { Sequelize } from 'sequelize';
import { signJWTAccessToken } from '../src/services/jwt-services';
 
describe('Role API routes', () => {
    let app: Express;
    let sequelize: Sequelize;
    let accessToken: string;
    let tenantName: string;
    let tenantId: number;

    beforeAll(async () => {
        app = await initApp;
    });

    beforeEach(async () => {
        await SequelizePGDB.init();
        sequelize = SequelizePGDB.getInstance();
        await sequelize.sync({ force: true });

        const tenant = await Tenant.create({ name: 'Company', description: 'foo bar' });
        const user = await User.create({ name: 'notsuperadmin', email: 'email@email', password: 'secret123' });
        const role = await Role.create({ user_id: user.id, tenant_id: tenant.id, name: 'admin' });
        const { id } = await Permission.create({ role_id: role.id, name: 'read'});
        const createPerm = await Permission.create({ role_id: role.id, name: 'create'});
        await PermittedData.create({ permission_id: id, tableName: 'roles', attributeName: '' });
        await PermittedData.create({ permission_id: createPerm.id, tableName: 'roles', attributeName: '' });
        accessToken = signJWTAccessToken(user.email, user.id, role.id, role.name, tenant.id);
        tenantName = tenant.name;
        tenantId = tenant.id;
    });

    test('should create a new role and return 201 CREATED', async () => {
        const newUser = await User.create({ name: 'commonuser', email: 'common@common', password: 'secret123' });
        
        const res = await request(app)
            .post(`/api/v1/roles/${tenantName}`)
            .send({ userId: newUser.id, roleName: 'custom' })
            .set('Authorization', `bearer ${accessToken}`);
        
        expect(res.status).toBe(201);
        expect(res.body).toBeDefined();
    });

    test('should list roles and return 200 OK', async () => {
        const res = await request(app)
            .get(`/api/v1/roles/${tenantName}`)
            .set('Authorization', `bearer ${accessToken}`);

        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
    });

    test('should assign role permissions and return 201 CREATED', async () => {
        const u = await User.create({ name: 'hello', email: 'hello@hello', password: 'secret123' });
        const r = await Role.create({ user_id: u.id, tenant_id: tenantId, name: 'custom' });
        
        const res = await request(app)
            .post(`/api/v1/roles/${r.id}/permissions`)
            .send({ name:'read', permittedDataNames: ['users', 'roles', 'items'] })
            .set('Authorization', `bearer ${accessToken}`);
        
        console.log({body: res.body});

        expect(res.status).toBe(201);
        expect(res.body).toBeDefined();

    });
});