import express from 'express';
import { Express } from 'express';
import apiRoutes from './routes/index';
import { errorHandler } from './routes/errorHandler';
import SequelizePGDB from './adapters/sequelize-pgdb';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';


async function main(): Promise<Express> {
    await SequelizePGDB.init();

    const app = express();
    app.use(cookieParser());
    app.use(json());

    app.use('/api/v1', apiRoutes);

    app.use('/healthcheck', (req, res, next) =>{
        res.status(200).send({ healthcheck: 'ok'})
    });

    app.use(errorHandler);

    if (process.env['NODE_ENV'] !== 'test') {
        app.listen(3000, ()=>console.log('server is running in port 3000'));
    }

    return app;
}

export default main();