import { Sequelize } from 'sequelize';
import { initModels } from './sequelize-models';

class SequelizePGDB {
    private static instance: Sequelize;

    private constructor() { }

    public static getInstance(): Sequelize {
        if (!SequelizePGDB.instance) {
            SequelizePGDB.createInstance();
        }
        return SequelizePGDB.instance;
    }
    public static async init(): Promise<void> {
        SequelizePGDB.createInstance();
        await SequelizePGDB.connect();
    }
    public static createInstance(): void {
        if (process.env['NODE_ENV'] === 'test'){
            SequelizePGDB.instance = new Sequelize('inklusiva_test', 'postgres', '123456', {
                host: 'localhost',
                dialect: 'postgres',
                port: 5433,
                logging: (...msg) => {},
            });
            return;
        }

        SequelizePGDB.instance = new Sequelize('inklusiva', 'postgres', '123456', {
            host: 'localhost',
            dialect: 'postgres',
            logging: (...msg) => {},
        });
    }

    public static async connect(): Promise<void> {
        await SequelizePGDB.instance.authenticate();
        console.log('Connection has been established successfully.');
        await SequelizePGDB.initModels();
        await SequelizePGDB.instance.sync();
        console.log('Tables synced successfully.');
    }

    public static async disconnect(): Promise<void> {
        SequelizePGDB.instance.close();
    }
    public static async initModels(): Promise<void> {
        initModels(SequelizePGDB.instance);
    }
}

export default SequelizePGDB;
