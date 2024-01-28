import express from 'express';

import apiRoutes from './routes/index';
import SequelizePGDB from './adapters/sequelize-pgdb';
import { json } from 'body-parser';


SequelizePGDB.createInstance();
SequelizePGDB.connect();

const app = express();

app.use(json());

app.use('/v1', apiRoutes);

app.use('/healthcheck', (req, res, next) =>{
    res.status(200).send({ healthcheck: 'ok'})
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).send({ error: err.message });
});

app.listen(3000);

export default app;