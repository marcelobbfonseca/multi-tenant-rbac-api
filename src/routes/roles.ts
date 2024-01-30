import { Router } from "express";
import { getRoles, assignRole } from "../controllers/roles-controllers";
import { assignPermission } from "../controllers/permissions-controllers";

const router = Router();

router.get('/:tenantName', getRoles);

router.post('/:tenantName', assignRole);

router.post('/:roleId/permissions', assignPermission);


export default router;