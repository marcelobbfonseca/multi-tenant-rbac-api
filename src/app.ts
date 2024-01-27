import express from 'express';

import apiRoutes from './routes/index';
import SequelizePGDB from './adapters/sequelize-pgdb';



SequelizePGDB.createInstance();
SequelizePGDB.connect();

const app = express();

app.use('/v1', apiRoutes);


app.use('/healthcheck', (req, res, next) =>{
    res.status(200).send({ healthcheck: 'ok'})
});

app.listen(3000);
