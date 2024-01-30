import bcrypt from 'bcrypt';
import { getUserByEmail } from '../repositories/user-repository';
import { getRoleByUserAndTenantIds } from '../repositories/role-repository';
import { signJWTAccessToken, signJWTRefreshToken } from '../services/jwt-services';

type SignInUseCase = (email: string, password: string, tenantId: number) => Promise<{ accessToken?: string; refreshToken?: string; }>;

export const signInUseCase: SignInUseCase = async (email: string, password: string, tenantId: number) => {

  const user = await getUserByEmail(email);

  if (!user) return { accessToken: undefined, refreshToken: undefined };

  const role = await getRoleByUserAndTenantIds(user.id, tenantId);

  if (!role) return { accessToken: undefined, refreshToken: undefined };

  console.log({ user })
  const success = await bcrypt.compare(password, user.password);

  if (success) {
    console.log('sucesso!');
    const accessToken = signJWTAccessToken(email, user.id, role.id, role.name, tenantId);
    const refreshToken = signJWTRefreshToken(user.id);
    return { accessToken, refreshToken };
  }
  else {
    return { accessToken: undefined, refreshToken: undefined };
  }

};
