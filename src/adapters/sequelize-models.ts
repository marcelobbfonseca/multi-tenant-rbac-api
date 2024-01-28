import { DataTypes, Sequelize, Model } from "sequelize";
import { hash } from "bcrypt";


export class User extends Model {
    declare id: number;
    declare email: string;
    declare name: string;
    declare password: string;
    declare superuser: boolean;
    declare created_at: Date;
    declare updated_at: Date;
}

export class Tenant extends Model {
    declare id: number;
    declare name: string;
    declare description: string;
    declare created_at: Date;
    declare updated_at: Date;
}

export class Role extends Model {
    declare id: number;
    declare name: string;
    declare tenant_id: number;
    declare user_id: number;
    declare created_at: Date;
    declare updated_at: Date;
}
export class Permission extends Model {
    declare id: number;
    declare name: string;
    declare role_id: number;
    declare created_at: Date;
    declare updated_at: Date;
}

export class PermittedData extends Model {
    declare id: number;
    declare tableName: string;
    declare attributeName: string;
    declare permission_id: number;
    declare created_at: Date;
    declare updated_at: Date;
}

export class Item extends Model {
    declare id: number;
    declare name: string;
    declare description: string;
    declare user_id: number;
    declare created_at: Date;
    declare updated_at: Date;
}

export const initModels = (sequelize: Sequelize) => {

    User.init({
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        name: { type: DataTypes.STRING, allowNull: false },
        password: { 
            type: 
            DataTypes.STRING,
            async set(value: string) {
                const pw = await hash(value, 10);
                this.setDataValue('password', pw);
            }
        },
        superuser: { type: DataTypes.BOOLEAN, defaultValue: false },
    }, 
    {
        sequelize,
        modelName: 'User'
    });

    Tenant.init({
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
    },
    {
        sequelize,
        modelName: 'Tenant'
    });

    Role.init({
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        tenant_id: { type: DataTypes.BIGINT, allowNull: false },
        user_id: { type: DataTypes.BIGINT, allowNull: false },
    },
    {
        sequelize,
        modelName: 'Role'
    });
    Permission.init({
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        role_id: { type: DataTypes.BIGINT, allowNull: false },
    },
    {
        sequelize,
        modelName: 'Permission'
    });

    PermittedData.init({
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        tableName: { type: DataTypes.STRING, allowNull: false },
        attributeName: { type: DataTypes.STRING, allowNull: false },
        permission_id: { type: DataTypes.BIGINT, allowNull: false },
    },
    {
        sequelize,
        modelName: 'PermittedData'
    });

    Item.init({
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        user_id: { type: DataTypes.BIGINT, allowNull: false },
    },
    {
        sequelize,
        modelName: 'Item'
    });

    User.hasMany(Role, { foreignKey: 'user_id' });
    
    Tenant.hasMany(Role, { foreignKey: 'tenant_id' });
    
    Permission.hasMany(PermittedData, { foreignKey: 'permission_id' });
    Permission.belongsTo(Role, { foreignKey: 'role_id' });

    PermittedData.belongsTo(Permission, { foreignKey: 'permission_id' });
    
    Item.belongsTo(User, { foreignKey: 'user_id' });
    
    Role.hasMany(Permission, { foreignKey: 'role_id' });
    Role.belongsTo(User, { foreignKey: 'user_id' });
    Role.belongsTo(Tenant, { foreignKey: 'tenant_id' });

}