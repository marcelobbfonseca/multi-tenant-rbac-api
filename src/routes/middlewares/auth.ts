import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { TokenPayloadInterface } from '../../services/jwt-services';

export const auth: RequestHandler = (req, res, next) => {
    
    const jwtSecret = process.env.JWT_SECRET || 'dev_key_kx92js82ys8279shagq12ba';

    try{
        const token = req.headers.authorization?.split(' ')[1]; 

        if(!token) return res.status(401).json({error: 'No token provided.'});

        const decoded = <TokenPayloadInterface>jwt.verify(token, jwtSecret);

        // @ts-ignore
        req.authenticatedUser = decoded;

        next();

    }catch(err){
      return res.status(401).json({error: err, message: 'Invalid token.'});
    }
};