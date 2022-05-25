import { Router, Request, Response } from 'express';
import { User } from '../models/user.model';
import UsersService from '../services/users.service';

const usersRouter = Router();
const usersService = new UsersService();

usersRouter.get('/list', (req: Request, res: Response) => {
    const { login, limit } = req.query;
    res.status(200).json(usersService.getUsersList(login as string, Number(limit)));
});

usersRouter.get('/:id', (req: Request, res: Response) => {
    res.status(200).json(usersService.getUserById(req.params.id));
});

usersRouter.post('/create', (req: Request, res: Response) => {
    const user: User = req.body;
    usersService.addUser(user);
    res.status(200).json({ id: user.id });
});

usersRouter.put('/:id', (req: Request, res: Response) => {
    res.status(200).json(usersService.updateUser(req.params.id, req.body));
});

usersRouter.delete('/:id', (req: Request, res: Response) => {
    res.status(200).json(usersService.softDeleteUser(req.params.id));
});


export default usersRouter;
