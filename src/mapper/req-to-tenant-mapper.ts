import { TenantEntity, TenantParams } from "../entities/tenant-entity";

export const requestToTenantMapper = (params: TenantParams): TenantEntity => {
    const { id, name, description }: TenantParams = params;
    return new TenantEntity({id, name, description});
}