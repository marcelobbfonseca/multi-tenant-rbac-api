import { RequestHandler } from "express";
import { getTenantByName } from "../repositories/tenant-repository";
import { createUserRole, getTenantRoles } from "../repositories/role-repository";
import { canAccessUseCase } from "../useCases/access-use-case";

export const getRoles: RequestHandler = async (req, res, next) => {
    // @ts-ignore
    const { authenticatedUser } = req;
    const { tenantName } = req.params;
    console.log('aloo 0');
    const canAccess = await canAccessUseCase(authenticatedUser, 'roles', 'read', tenantName);
    console.log('aloo 1');
    
    if (!canAccess) {
        res.status(403).json({message: 'Forbiden.'});
        return;
    }
    const tenant = await getTenantByName(tenantName);
    console.log('aloo 2');
    if(!tenant){
        res.status(404).json({ message: "Tenant not found" });
        return;
    } 

    // get associated permissions
    // get associated permittedData
    const roles = await getTenantRoles(tenant.id);
    console.log('aloo 3');
    
    return res.status(200).json({ roles });

} 


export const assignRole: RequestHandler = async (req, res, next) => {
    // @ts-ignore
    const { authenticatedUser } = req;
    
    const { userId, roleName } = req.body;
    
    const { tenantName } = req.params;
    
    const canAccess = await canAccessUseCase(authenticatedUser, 'roles', 'create', tenantName);
    if (!canAccess) return res.status(403).json({message: 'Forbiden.'});

    const role = await createUserRole(userId, authenticatedUser.tenantId, roleName);

    res.status(201).json({message: 'Role created!', role });

}
