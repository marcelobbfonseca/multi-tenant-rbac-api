import { Router } from 'express';
import userRouter from './users';
import tenantRouter from './tenants';
import { signInUser, signUpUser } from '../controllers/users-controllers';
import { authorize } from './middlewares/authorize';



const apiRoutes = Router(); 

apiRoutes.post('/sign-in', signInUser);

apiRoutes.post('/sign-up', signUpUser);

apiRoutes.use('/users',authorize, userRouter);

apiRoutes.use('/tenants',authorize, tenantRouter);

export default apiRoutes;
