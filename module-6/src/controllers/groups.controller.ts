import { Router, Request, Response } from "express";
import { SavedRecordRes } from "../common/types/SavedRecordRes";
import GroupsService from "../services/groups.service";

const groupsRouter = Router();
const groupsService = new GroupsService()

groupsRouter.get('/', async (req: Request, res: Response) => {
    const groups = await groupsService.getAll();
    res.status(200).json(groups);
});

groupsRouter.get('/:id', async (req: Request, res: Response) => {
    const group = await groupsService.getById(Number(req.params.id));
    res.status(200).json(group);
});

groupsRouter.post('/', async (req: Request, res: Response) => {
    const groupId: SavedRecordRes = await groupsService.create(req.body);
    res.status(201).json(groupId);
});

groupsRouter.post('/add-users', async (req: Request, res: Response) => {
    const { usersIds, groupId } = req.body;
    const result = await groupsService.addUsersToGroup(usersIds, groupId);
    res.status(200).json(result);
});

groupsRouter.get('/members/:groupId', async (req: Request, res: Response) => {
    const result = await groupsService.getGroupMembers(Number(req.params.groupId));
    res.status(200).json(result);
})

groupsRouter.put('/:id', async (req: Request, res: Response) => {
    const result = await groupsService.update(Number(req.params.id), req.body);
    res.status(200).json(result);
});

groupsRouter.delete('/:id', async (req: Request, res: Response) => {
    const result = await groupsService.remove(Number(req.params.id));
    res.status(200).json(result);
})

export default groupsRouter;
