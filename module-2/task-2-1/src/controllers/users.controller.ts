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
    const foundUser = usersService.getUserById(req.params.id);
    if (foundUser) {
        res.status(200).json(foundUser);
    } else {
        res.status(404).json({ err: `User with id ${req.params.id} not found` });
    }
});

usersRouter.post('/', (req: Request, res: Response) => {
    const user: User = req.body;
    usersService.addUser(user);
    res.status(201).json({ id: user.id });
});

usersRouter.patch('/:id', (req: Request, res: Response) => {
    res.status(200).json(usersService.updateUser(req.params.id, req.body));
});

usersRouter.delete('/:id', (req: Request, res: Response) => {
    const deletedUser = usersService.softDeleteUser(req.params.id);
    if (deletedUser) {
        res.status(200).json(deletedUser);
    } else {
        res.status(404).json({ err: `User with id ${req.params.id} not found` });
    }
});


export default usersRouter;
