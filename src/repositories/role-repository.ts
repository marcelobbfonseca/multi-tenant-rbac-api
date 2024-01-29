import { Role } from "../adapters/sequelize-models"

type getRoleByUserAndTenantFunction =  (userId: number, tenantId: number) => Promise<Role | null>

export const getRoleByUserAndTenantIds: getRoleByUserAndTenantFunction = async (userId, tenantId) => {
    
    const role = await Role.findOne({
        where: {
            user_id: userId,
            tenant_id: tenantId
        }
    });

    return role;
}

export const createUserRole = (userId: number, tenantId: number, name='Reader'): Promise<Role> => {
    
    const role = Role.create({
        user_id: userId,
        tenant_id: tenantId,
        name: name
    });

    return role;
}