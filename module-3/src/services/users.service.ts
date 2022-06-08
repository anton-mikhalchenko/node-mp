import User from "../models/User.model";
import UsersRepository from "../data-access/users.repository";
import { SavedRecordRes } from "../utils/SavedRecordRes";

export default class UsersService {
    private _users: Array<User> = [];
    private _usersRepository = new UsersRepository();

    saveUser(user: User): Promise<SavedRecordRes> {
        return this._usersRepository.saveUser(user);
    }

    getUserById(id: number): Promise<User> {
        return this._usersRepository.getUserById(id);
    }

    getUsersList(login = 'a', limit = 5): Promise<Array<User>> {
        return this._usersRepository.getUsersList(login, limit);
    }

    updateUser(userId: number, updates: Partial<User>): Promise<User> {
        return this._usersRepository.updateUser(userId, updates);
    }

    softDelete(userId: number): Promise<User> {
        return this._usersRepository.softDelete(userId);
    }

}
