import fs  from 'fs';
import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

export const authorize: RequestHandler = (req, res, next) => {
    
    const jwtSecret = process.env.JWT_SECRET || 'dev_key_kx92js82ys8279shagq12ba';

    try{
        const token = req.headers.authorization?.split(' ')[1]; 
        // console.log(token);

        if(!token){
            return res.status(401).json({error: 'No token provided.'});
        }
        let decoded = jwt.verify(token, jwtSecret)
        
        console.log(decoded);
        next();

    }catch(err){
      return res.status(401).json({error: err, message: 'Invalid token.'});
    }
};