import { Repository, In } from "typeorm";
import { SavedRecordRes } from "../common/types/SavedRecordRes";
import Group from "../models/Group.model";
import User from "../models/User.model";
import { AppDataSource } from "./data-source";

class GroupsRepository {
    private _groupsRepository: Repository<Group> = AppDataSource.getRepository(Group);

    getById(id: number): Promise<Group> {
        return this._groupsRepository.findOne({
            where: [
                { id }
            ]
        });
    }

    getAll(): Promise<Array<Group>> {
        return this._groupsRepository.find();
    }

    async create(group: Group): Promise<SavedRecordRes> {
        const createdGroup = await this._groupsRepository.save(group);
        return { id: createdGroup.id };
    }

    update(groupId: number, group: Group): Promise<Group> {
        return this._groupsRepository.save({
            id: groupId,
            ...group
        });
    }

    remove(id: number): Promise<any> {
        return this._groupsRepository.delete(id);
    }

    async addUsersToGroup(usersIds: Array<number>, groupId: number): Promise<any> {
        const usrRepo = AppDataSource.getRepository(User);
        const grRepo = AppDataSource.getRepository(Group);

        const users = await usrRepo.find({
            where: {
                id: In(usersIds)
            }
        })

        const group = await grRepo.findOne({
            where: {
                id: groupId
            }
        })

        for (const user of users) {
            user.groups = [group];
        }
        return usrRepo.save(users);
    }

    getGroupMembers(groupId: number): Promise<any> {
        const usrRep = AppDataSource.getRepository(User);
        return usrRep
            .createQueryBuilder('user')
            .leftJoin('user.groups', 'group')
            .where('group.id = :id', { id: groupId })
            .getMany()
    }
}

export default GroupsRepository;
