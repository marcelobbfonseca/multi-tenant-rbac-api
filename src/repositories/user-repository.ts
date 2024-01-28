import SequelizePGDB from "../adapters/sequelize-pgdb";
import { UserEntity } from "../entities/user-entity";
import { User } from "../adapters/sequelize-models";

// create reference
const sequelize = SequelizePGDB.getInstance();

export type getUsersFunction = () => Promise<User[]>;
export type getUserByIdFunction = (id: number) => Promise<User | null>;
export type createUserFunction = (user: UserEntity) => Promise<User>;
export type updateUserFunction = (user: UserEntity) => Promise<boolean>;
export type deleteUserFunction = (id: number) => Promise<boolean>;

export const getUsers: getUsersFunction = async () => {
    const users = await User.findAll();
    return users;
}

export const getUserById: getUserByIdFunction = async (id) => {
    const user = await User.findByPk(id);
    return user;
}

export const createUser: createUserFunction = async (user) => {
    const { email, password, name, superuser } = user;
    const newUser = await User.create({email, password, name, superuser});
    return newUser;
}

export const updateUser: updateUserFunction = async (user) => {
    const { id, email, password, name, superuser } = user;
    const updates = await User.update({email, password, name, superuser}, {where: {id}});
    if(updates) return true;
    return false;
}

export const deleteUser: deleteUserFunction = async (id) => {
    const deleted = await User.destroy({where: {id}});
    if(deleted) return true;
    return false;
}
