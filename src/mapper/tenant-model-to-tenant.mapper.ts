import { Tenant } from "../adapters/sequelize-models"
import { TenantEntity } from "../entities/tenant-entity"

export const tenantModelToTenantMapper = (tenantModel: Tenant): TenantEntity => {
    
    const  { id, name, description } = tenantModel
    
    const tenantEntity = new TenantEntity({ id, name, description});

    return tenantEntity;
}
