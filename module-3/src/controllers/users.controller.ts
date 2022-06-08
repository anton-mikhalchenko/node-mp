import { Router, Request, Response } from 'express';
import User from '../models/User.model';
import UsersService from '../services/users.service';
import { validateReqBody } from '../services/validation.service';
import { SavedRecordRes } from '../utils/SavedRecordRes';

const usersRouter = Router();
const usersService = new UsersService();

usersRouter.get('/list', async (req: Request, res: Response) => {
    const { login, limit } = req.query;
    const usersList: Array<User> = await usersService.getUsersList(login as string, Number(limit));
    res.status(200).json(usersList);
});

usersRouter.get('/:id', async (req: Request, res: Response) => {
    const foundUser = await usersService.getUserById(Number(req.params.id));
    if (foundUser) {
        res.status(200).json(foundUser);
    } else {
        res.status(404).json({ err: `User with id ${req.params.id} not found` });
    }
});

usersRouter.post('/', validateReqBody(), async (req: Request, res: Response, next) => {
    const createdUserRes: SavedRecordRes = await usersService.saveUser(req.body);
    res.status(201).json(createdUserRes);
});

usersRouter.patch('/:id', validateReqBody(), async (req: Request, res: Response) => {
    const updatedUser: User = await usersService.updateUser(Number(req.params.id), req.body);
    res.status(200).json(updatedUser);
});

usersRouter.delete('/:id', async (req: Request, res: Response) => {
    const deletedUser = await usersService.softDelete(Number(req.params.id));
    if (deletedUser) {
        res.status(200).json(deletedUser);
    } else {
        res.status(404).json({ err: `User with id ${req.params.id} not found` });
    }
});

usersRouter.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        res.status(400).json({
            type: err.type,
            message: err.error.toString()
          });
    } else {
        next(err);
    }
  });


export default usersRouter;
