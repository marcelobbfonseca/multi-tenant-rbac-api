import { User } from "../adapters/sequelize-models"
import { UserEntity } from "../entities/user-entity"

export const userModelToUserMapper = (userModel: User): UserEntity => {
    
    const  { id, name, email, superuser } = userModel
    
    const userEntity = new UserEntity({ id, name, email, superuser});

    return userEntity;
}
