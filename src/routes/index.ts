import { Router } from 'express';
import userRouter from './users';
import tenantRouter from './tenants';
import { signInUser, signUpUser } from '../controllers/users-controllers';
import { auth } from './middlewares/auth';


const apiRoutes = Router(); 

apiRoutes.post('/sign-in', signInUser);

apiRoutes.post('/sign-up', signUpUser);

apiRoutes.use('/users',auth, userRouter);

apiRoutes.use('/tenants',auth, tenantRouter);

export default apiRoutes;
