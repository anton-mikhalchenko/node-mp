import User from "../models/User.model";
import UsersRepository from "../data-access/users.repository";
import { SavedRecordRes } from "../common/types/SavedRecordRes";

export default class UsersService {
    private _usersRepository = new UsersRepository();

    saveUser(user: User): Promise<SavedRecordRes> {
        user.isDeleted = false;
        return this._usersRepository.saveUser(user);
    }

    getUserById(id: number): Promise<User> {
        return this._usersRepository.getUserById(id);
    }

    getUsersList(login: string, limit: number): Promise<Array<User>> {
        login = login || 'a';
        limit = limit || 5;

        return this._usersRepository.getUsersList(login, limit);
    }

    updateUser(userId: number, updates: Partial<User>): Promise<User> {
        return this._usersRepository.updateUser(userId, updates);
    }

    softDelete(userId: number): Promise<User> {
        return this._usersRepository.softDelete(userId);
    }

}
