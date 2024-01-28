import userRouter from './users';
import tenantRouter from './tenants';

import { Router } from 'express';

const apiRoutes = Router(); 

apiRoutes.use('/users', userRouter);
apiRoutes.use('/tenants', tenantRouter);

export default apiRoutes;
