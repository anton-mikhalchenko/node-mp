import { SavedRecordRes } from "../common/types/SavedRecordRes";
import GroupsRepository from "../data-access/groups.repository";
import Group from "../models/Group.model";

class GroupsService {
    private _groupsRepository = new GroupsRepository();

    getById(id: number): Promise<Group> {
        return this._groupsRepository.getById(id);
    }

    getAll(): Promise<Array<Group>> {
        return this._groupsRepository.getAll();
    }

    create(group: Group): Promise<SavedRecordRes> {
        return this._groupsRepository.create(group);
    }

    update(groupId: number, group: Group): Promise<Group> {
        return this._groupsRepository.update(groupId, group);
    }

    remove(id: number): Promise<any> {
        return this._groupsRepository.remove(id);
    }

    addUsersToGroup(usersIds: Array<number>, groupId: number): Promise<any> {
        return this._groupsRepository.addUsersToGroup(usersIds, groupId);
    }

    getGroupMembers(groupId: number): Promise<any> {
        return this._groupsRepository.getGroupMembers(groupId);
    }
}

export default GroupsService;
