import { Router, Request, Response } from 'express';
import UsersService from '../services/users.service';
import jwt from 'jsonwebtoken';
import config from '../config.json';

const authRouter = Router();
const usersService = new UsersService();

authRouter.post('/login', async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const user = await usersService.getByCredentials(login, password);

    if (user) {
        const tokenData = {
            id: user.id,
            login: user.login
        }
        const token = jwt.sign(tokenData, config.jwtSecret, { expiresIn: 1000 });        
        
        res.status(200).json({ token });
    } else {
        res.status(403).json({ msg: 'Wrong login or password or user does not exist' })
    }
})

export default authRouter;
