import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUserByEmail } from '../../repositories/user-repository';
import { getRoleByUserAndTenantIds } from '../../repositories/role-repository';

export const signInUseCase = async (email: string, password: string, tenantId: number): Promise<string | boolean> => {

    const user = await getUserByEmail(email);

    if(!user) return false;

    const role = await getRoleByUserAndTenantIds(user.id, tenantId);

    if(!role) return false;

    bcrypt.compare(password, user.password, (err, success) => {
      if(success) {
        return signJWTtoken(email, user.id, role.id, role.name);
      } 
    });

    return false;

}

const signJWTtoken = (email: string, userId: number, roleId: number, roleName: string): string => {
    const cert = process.env.JWT_SECRET || 'dev_key_kx92js82ys8279shagq12ba';

    const token = jwt.sign({
        email: email,
        id: userId,
        roleId
    }, 
    cert, 
    { 
        expiresIn: '1h',
        algorithm: 'HS256',
        issuer: roleName,
    });

    return token;
}