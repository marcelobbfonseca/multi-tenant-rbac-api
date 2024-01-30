import { RequestHandler } from "express";
import { getTenantByName } from "../repositories/tenant-repository";
import { createUserRole, getTenantRoles } from "../repositories/role-repository";
import { canAccessUseCase } from "../useCases/access-use-case";

export const getRoles: RequestHandler = async (req, res, next) => {
    // @ts-ignore
    const { authenticatedUser } = req;
    const { name } = req.params;
    
    const canAccess = await canAccessUseCase(authenticatedUser, 'roles', 'read', name);
    if (!canAccess) return; res.status(403).json({message: 'Forbiden.'});

    const tenant = await getTenantByName(name);
    if(!tenant) 
        return res.status(404).json({ message: "Tenant not found" });

    // get associated permissions
    // get associated permittedData
    const roles = await getTenantRoles(tenant.id);

    
    return res.status(200).json({ roles });

} 


export const assignRole: RequestHandler = async (req, res, next) => {
    // @ts-ignore
    const { authenticatedUser } = req;
    
    const { userId, roleName } = req.body;
    
    const { name } = req.params;
    
    const canAccess = await canAccessUseCase(authenticatedUser, 'roles', 'create', name);
    if (!canAccess) return res.status(403).json({message: 'Forbiden.'});

    const role = await createUserRole(userId, authenticatedUser.tenantId, roleName);

    res.status(201).json({message: 'Role created!', role });

}
