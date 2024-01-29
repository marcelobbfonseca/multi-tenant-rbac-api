import { RequestHandler } from "express";
import { requestToTenantMapper } from "../mapper/req-to-tenant-mapper";
import { createTenant, getTenantById, getTenants as getTenantsRepository, updateTenant as updateTenantRepository, deleteTenant as deleteTenantRepository } from "../repositories/tenant-repository";
import { tenantModelToTenantMapper } from "../mapper/tenant-model-to-tenant.mapper";
import { TenantParams } from "../entities/tenant-entity";
import { createTenantAdminUsecase } from "../useCases/create-tenant-admin-use-case";



export const createTenants: RequestHandler = async (req, res) => {

    const tenant = requestToTenantMapper(req.body);

    const tenantModel = await createTenant(tenant);

    const admin = await createTenantAdminUsecase(tenantModel.id, tenantModel.name);
    
    const createdTenant = tenantModelToTenantMapper(tenantModel);

    res.status(201).json({ message: 'Tenant created!', tenant: createdTenant, admin });
};

export const getTenants: RequestHandler = async (req, res) => {
    
    const tenants = getTenantsRepository();

    res.status(200).json({ tenants });
};

export const getTenant: RequestHandler = async (req, res) => {
    
    const { id } = req.params;

    const tenant = await getTenantById(Number(id));

    res.status(200).json({ tenant });
};

export const updateTenant: RequestHandler = async (req, res) => {
    
    const { id } = req.params;

    const params: TenantParams = { id, ...req.body };

    const tenant = requestToTenantMapper(params);

    const updated = await updateTenantRepository(tenant);

    if (updated) res.status(200).json({ message: 'tenant updated.' });
    else res.status(500).json({error: 'unable to update!'});
};

export const deleteTenant: RequestHandler = async (req, res) => {

    const { id } = req.params;

    const deleted = await deleteTenantRepository(Number(id));

    if (deleted) res.status(200).json({ message: 'tenant deleted successfully' });
    else res.status(500).json({error: 'unable to delete!'});
}

