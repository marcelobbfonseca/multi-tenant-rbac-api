import { UserParams } from "../entities/user-entity"
import { requestToUserMapper } from "../mapper/req-to-user-mapper";
import { createUser } from "../repositories/user-repository";
import { createUserRole } from "../repositories/role-repository";
import { defaultPermissionTypes } from "../repositories/permission-repository";
import { generateRandomString } from "../services/strings-service";


export const createTenantAdminUsecase = async (tenantId: number,tenantName: string) => {
   
    const randomText = generateRandomString(6);
   
    const email = `admin-${randomText}@${tenantName.replace(/\s/g, '')}.com`;
   
    const admin: UserParams = {
        name: 'admin',
        email,
        password: generateRandomString(8),
        superuser: false,
    }

    const adminEntity = requestToUserMapper(admin);

    const adminModel = await createUser(adminEntity);

    await createUserRole(adminModel.id, tenantId, defaultPermissionTypes.ADMIN);

    return adminEntity;
}