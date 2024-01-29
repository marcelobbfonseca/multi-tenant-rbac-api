import { TenantEntity } from "../entities/tenant-entity";
import { Role, Tenant, User } from "../adapters/sequelize-models";

export type getTenantsFunction = () => Promise<Tenant[]>;
export type getTenantByIdFunction = (id: number) => Promise<Tenant | null>;
export type createTenantFunction = (tenant: TenantEntity) => Promise<Tenant>;
export type updateTenantFunction = (tenant: TenantEntity) => Promise<boolean>;
export type deleteTenantFunction = (id: number) => Promise<boolean>;
export type getTenantByNameFunction = (name: string) => Promise<Tenant | null>;


export const getTenants: getTenantsFunction = async () => {

    const tenants = await Tenant.findAll();
    
    return tenants;
}

export const getTenantById: getTenantByIdFunction = async (id) => {

    const tenant = await Tenant.findByPk(id);
    
    return tenant;
}

export const getTenantByName: getTenantByNameFunction = async (name) => {

    const tenant = await Tenant.findOne({where: {name}});
    
    return tenant; 
}

export const createTenant: createTenantFunction = async (tenant) => {

    const { name, description } = tenant;

    const newTenant = await Tenant.create({name, description});
    
    return newTenant;
}

export const updateTenant: updateTenantFunction = async (tenant) => {

    const { id, name, description } = tenant;

    const updates = await Tenant.update({name, description}, {where: {id}});
    
    if(updates) return true;

    return false;
}

export const deleteTenant: deleteTenantFunction = async (id) => {

    const deleted = await Tenant.destroy({where: {id}});
    
    if (deleted) return true;
    
    return false;
}
    
export const getTenantByUserId = (userId: number): Promise<Tenant | null> => {

    const tenant = Tenant.findOne({
        include: {
            model: Role,
            where: {
            userId: userId
            }
        }
    });

    return tenant;
}