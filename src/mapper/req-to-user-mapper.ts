import { UserEntity, UserParams } from "../models/user-model";

export const requestToUserMapper = (params: UserParams): UserEntity => {
    const { email, password, name, superuser, confirmPassword }: UserParams = params;
    const user = new UserEntity({ email, password, name, superuser, confirmPassword });
    return user;
}
