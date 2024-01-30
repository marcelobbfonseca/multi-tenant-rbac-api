import { Permission, PermittedData, Role } from "../adapters/sequelize-models"
import { defaultPermissionTypes } from "./permission-repository";

type getRoleByUserAndTenantFunction =  (userId: number, tenantId: number) => Promise<Role | null>
type createUserRoleFunction = (userId: number, tenantId: number, name?: string) => Promise<Role>

export const getRoleByUserAndTenantIds: getRoleByUserAndTenantFunction = async (userId, tenantId) => {
    
    const role = await Role.findOne({
        where: {
            user_id: userId,
            tenant_id: tenantId
        }
    });

    return role;
}

export const createUserRole: createUserRoleFunction = (userId, tenantId, name=defaultPermissionTypes.READER) => {
    
    const role = Role.create({
        user_id: userId,
        tenant_id: tenantId,
        name: name,
    });

    return role;
}

export const getRoleById = async (id: number): Promise<Role | null>  => {
    
    const role = Role.findByPk(id);

    return role;
}

export const getTenantRoles = async (tenantId: number): Promise<Role[]> => {

    const roles = await Role.findAll({
        where: {
            tenant_id: tenantId
        },
        // include: [Permission]
    });
    roles.forEach( async (role) => {

        const permissions = await Permission.findAll({
            where: {
                role_id: role.id
            },
            include: PermittedData
        });
        //@ts-ignore
        role.permissions = permissions;
    });

    return roles; 
}