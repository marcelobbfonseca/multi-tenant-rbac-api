import { getRolePermissions } from "../repositories/permission-repository";
import { getPermittedData } from "../repositories/permitted-data-repository";
import { getRoleById } from "../repositories/role-repository";
import { getTenantById } from "../repositories/tenant-repository";
import { getUserById } from "../repositories/user-repository";
import { TokenPayloadInterface } from "../services/jwt-services"

export type actionType = 'create' | 'update' | 'read' | 'delete';
export type resourceType = 'user' | 'permission' | 'role' | 'tenant' | 'item';

type canAccessUseCaseFunction = (payload: TokenPayloadInterface, resource: string, action: actionType, tenantName: string) => Promise<boolean>

export const canAccessUseCase: canAccessUseCaseFunction = async (payload, resource, action, tenantName) => {

    const { email, id, iss, roleId, tenantId } = payload;
    const user = await getUserById(id);
    
    if (user?.superuser) return true;
    
    const role = await getRoleById(roleId);
    if(!role) return false;
    const tenant = await getTenantById(tenantId);
    // User must be in the same Tenant
    if(!tenant || (tenantName !== tenant.name)) return false;

    const permissions = await getRolePermissions(roleId);
    
    // find if role have permission
    const permission = permissions.find(p => p.name === action);
    if(!permission) return false;
    
    // find existing resource for this permission
    const permittedData =  await getPermittedData(permission.id, resource);
    if(!permittedData) return false;

    return true;
}