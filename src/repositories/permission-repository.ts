import { Permission, PermittedData } from "../adapters/sequelize-models"

type createRolePermissionsFunction = (roleName: string, roleId: number) => Promise<Permission[]>
type createPermissionFunction = (roleId: number, name: string, permittedDataNames: string[]) => Promise<{ permission: Permission, permittedDatas: PermittedData[] }>
interface permissionsTypes {
    READER: string;
    EDITOR: string;
    ADMIN: string;
}


export const defaultPermissionTypes: permissionsTypes = {
    READER: 'reader',
    EDITOR: 'editor',
    ADMIN: 'admin',
}
interface defaultPrivileges {
    [key: string]: string[];
    reader: string[];
    editor: string[];
    admin: string[];
}


const privileges: defaultPrivileges = {
    reader: ['read'],
    editor: ['read', 'create'],
    admin : ['read', 'update', 'create', 'delete']
};

export const createRolePermissions: createRolePermissionsFunction = async (roleName, roleId) => {
    const permissions: Permission[] = [];
    
    if (roleName in privileges) {
        privileges[roleName].forEach(async (permissionName) => {
            const permission = await Permission.create({
                role_id: roleId,
                name: permissionName
            });
            permissions.push(permission)
        });
    } 
    
    return permissions;
}

export const getRolePermissions = (roleId: number) => {
    
    const permissions = Permission.findAll({
        where: {
            role_id: roleId,
        }
    });

    return permissions;
}

export const createPermission: createPermissionFunction = async (roleId, name, permittedDataNames) => {

    const permission = await Permission.create({
        role_id: roleId,
        name: name,
    });
    const permittedDatas: PermittedData[] = [];
    permittedDataNames.forEach(async (dataName) => {
        const permittedData = await PermittedData.create({tableName: dataName, permission_id: permission.id});
        permittedDatas.push(permittedData);
    });

    return { permission, permittedDatas };
}
    