import { userToUserModelMapper } from "../../mapper/user-to-user-model-mapper";
import { getTenantByName, getTenantByUserId } from "../../repositories/tenant-repository";
import { getUserByEmail } from "../../repositories/user-repository";


export const userValidateTenantUseCase = async (tenantName: string, email: string): Promise<number> => {
    
    const user = await getUserByEmail(email);
    
    if (!user) return -1;

    const tenant = await getTenantByName(tenantName);

    if (!tenant) return -1;

    const tenantModel = await getTenantByUserId(user.id);

    if (tenantModel && tenantModel.id === tenant.id) return tenant.id;
    else return -1;
}