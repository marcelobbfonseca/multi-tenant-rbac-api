import { Router } from "express";
import { createTenants, deleteTenant, getTenant, getTenants, updateTenant } from "../controllers/tenant-controller";


const router = Router();

router.get('/', getTenants);

router.post('/', createTenants);

router.get('/:id', getTenant);

router.put('/:id', updateTenant);

router.delete('/:id', deleteTenant);

export default router;