import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config.json';


export const auth = (req: Request, res: Response, next: NextFunction) => {
    const requestToken = req.get('Authorization');

    if (requestToken) {
        jwt.verify(requestToken, config.jwtSecret, (err, decoded) => {
            if (err) {
                return res.status(403).json({ msg: 'Invalid token' });
            }
            next();
        })
    } else {
        return res.status(401).json({ msg: 'Unauthorized' })
    }
};
