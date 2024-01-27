import { DataTypes, Sequelize, Model } from "sequelize";



export class User extends Model {
    declare id: number;
    declare email: string;
    declare name: string;
    declare password: string;
    declare superuser: boolean;
}

export const initModels = (sequelize: Sequelize) => {

    User.init({
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        name: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        superuser: { type: DataTypes.BOOLEAN, defaultValue: false },
    }, 
    {
        sequelize,
        modelName: 'User'
    });

}