import userRouter from './users';
import { Router } from 'express';

const apiRoutes = Router(); 

apiRoutes.use('/users', userRouter);

export default apiRoutes;
