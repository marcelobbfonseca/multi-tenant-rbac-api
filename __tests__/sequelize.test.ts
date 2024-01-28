import SequelizePGDB from "../src/adapters/sequelize-pgdb";
import { Sequelize } from "sequelize";




describe('SequelizePGDB', () => {
    let instance: Sequelize;

    beforeEach( async () => {
        SequelizePGDB.createInstance();
        instance = SequelizePGDB.getInstance();
    });
    
    test('should connect to the database and create instance', () => {
        expect(instance).toBeDefined();
    });

    test('should connect sync and initiate models', async () => {
        await SequelizePGDB.connect();
        const user = await instance.models.User;
        expect(user).toBeDefined();
    });

    afterEach( async () => {
        await instance.drop();
        await SequelizePGDB.disconnect();
    })
})