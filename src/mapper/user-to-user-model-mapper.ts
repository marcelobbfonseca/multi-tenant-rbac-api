import { User } from "../adapters/sequelize-models"
import { UserEntity } from "../entities/user-entity"

export const userToUserModelMapper = (user: UserEntity): User => {
    
    const  { id, name, email, superuser } = user
    
    const userModel = User.build({ id, name, email, superuser});

    return userModel;
}
