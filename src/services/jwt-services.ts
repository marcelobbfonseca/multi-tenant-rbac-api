import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

export interface TokenPayloadInterface extends JwtPayload {
    email: string;
    id: number;
    roleId: number;
}


export const signJWTAccessToken = (email: string, userId: number, roleId: number, roleName: string): string => {
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

export const signJWTRefreshToken = (email: string, userId: number, roleId: number, roleName: string) => {
    const cert = process.env.JWT_SECRET || 'dev_key_kx92js82ys8279shagq12ba';

    const token = jwt.sign({
        email,
        id: userId,
        roleId
    }, 
    cert, 
    { 
        expiresIn: '1y',
        algorithm: 'HS256',
        issuer: 'refresh',
    });

    return token;
};