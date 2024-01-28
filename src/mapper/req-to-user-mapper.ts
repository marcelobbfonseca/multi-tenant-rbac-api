import { UserEntity, UserParams } from "../entities/user-entity";

export const requestToUserMapper = (params: UserParams): UserEntity => {
    const { email, password, name, superuser, confirmPassword }: UserParams = params;
    const user = new UserEntity({ email, password, name, superuser, confirmPassword });
    return user;
}
