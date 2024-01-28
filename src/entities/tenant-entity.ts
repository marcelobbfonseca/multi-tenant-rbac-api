
export interface TenantParams {
    id?: number;
    name: string;
    description: string;
};


export class TenantEntity {
    public id?: number;
    public name: string;
    public description: string;

    constructor(userParams : TenantParams) {
        const { id, name, description } = userParams;
        this.id = id;
        this.name = name;
        this.description = description;
    }
};
