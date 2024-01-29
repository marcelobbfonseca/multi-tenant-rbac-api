import { Permission } from "../adapters/sequelize-models"

type createRolePermissionsFunction = (roleName: string, roleId: number) => Promise<Permission[]>

const ROLES = ['Reader', 'Editor', 'Admin'];

interface defaultPrivileges {
    [key: string]: string[];
}


const privileges: defaultPrivileges = {
    reader: ['read'],
    editor: ['read', 'create'],
    admin : ['read', 'update', 'create', 'delete']
};

export const createRolePermissions: createRolePermissionsFunction = async (roleName, roleId) => {
    const permissions: Permission[] = [];
    
    if (roleName in privileges) {
        privileges[roleName].forEach(async (privilege) => {
            const permission = await Permission.create({
                role_id: roleId,
                privilege: privilege
            });
            permissions.push(permission)
        });
    }
    
    return permissions;
}