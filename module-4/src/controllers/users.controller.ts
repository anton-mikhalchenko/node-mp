import { Router, Request, Response } from 'express';
import User from '../models/User.model';
import UsersService from '../services/users.service';
import { validateReqBody } from '../services/validation.service';
import { SavedRecordRes } from '../common/types/SavedRecordRes';

const usersRouter = Router();
const usersService = new UsersService();

usersRouter.get('/list', async (req: Request, res: Response) => {
    const { login, limit } = req.query;
    const usersList: Array<User> | void = await usersService.getUsersList(login as string, Number(limit))
        .catch(err => {
            res.send(404).json(err);
        });

    res.status(200).json(usersList);
});

usersRouter.get('/:id', async (req: Request, res: Response) => {
    const foundUser: User | void = await usersService.getUserById(Number(req.params.id))
        .catch(err => {
            res.send(404).json(err);
        });

    if (foundUser) {
        if (foundUser.isDeleted) {
            res.status(202).json({ msg: 'User was deleted' });
        } else {
            res.status(200).json(foundUser);
        }
    } else {
        res.status(404).json({ err: `User with id ${req.params.id} not found` });
    }
});

usersRouter.post('/', validateReqBody(), async (req: Request, res: Response, next) => {
    const createdUserRes: SavedRecordRes | void = await usersService.saveUser(req.body)
        .catch(err => {
            res.send(404).json(err);
        });

    res.status(201).json(createdUserRes);
});

usersRouter.post('/add', async (req: Request, res: Response) => {
    
});

usersRouter.put('/:id', validateReqBody(), async (req: Request, res: Response) => {
    const updatedUser: User | void = await usersService.updateUser(Number(req.params.id), req.body)
        .catch(err => {
            res.send(404).json(err);
        });

    res.status(200).json(updatedUser);
});

usersRouter.delete('/:id', async (req: Request, res: Response) => {
    const deletedUser: User | void = await usersService.softDelete(Number(req.params.id))
        .catch(err => {
            res.send(404).json(err);
        });

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
