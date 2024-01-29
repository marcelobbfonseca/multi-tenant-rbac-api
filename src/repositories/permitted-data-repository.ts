import { PermittedData } from "../adapters/sequelize-models";


export const getPermittedData = async (permissionId: number, resource: string): Promise<PermittedData | null> =>  {
    
    const permittedData = await PermittedData.findOne(
        {where: {
            permission_id: permissionId,
            tableName: resource,
        }});
    
    return permittedData;
}
