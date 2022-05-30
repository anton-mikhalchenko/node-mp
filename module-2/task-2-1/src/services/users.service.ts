import { User } from "../models/user.model";

export default class UsersService {
    private _users: Array<User> = [];y
    private _userIdCounter = 0;

    get users(): Array<User> {
        return this._users;
    }

    addUser(user: User): void {
        ++this._userIdCounter;
        user.id = this._userIdCounter.toString();
        user.isDeleted = false;
        this._users.push(user);
    }

    getUserById(id: string): User {
        for (let user of this._users) {
            if (user.id === id) {
                return user;
            }
        }
    }

    getUsersList(login = 'a', limit = 5): Array<User> {
        const result: Array<User> = [];

        for (let user of this._users) {
            if (limit &&result.length === limit) {
                break;
            }
    
            if (user.login.indexOf(login) !== -1) {
                result.push(user);
            }
        }
    
        result.sort((userA, userB) => {
            if (userA.login < userB.login) {
                return -1;
            }
    
            if (userA.login > userB.login) {
                return 1;
            }
            return 0;
        })

        return result;
    }

    updateUser(id: string, updates: Partial<User>): User {
        for (let user of this._users) {
            if (user.id === id) {
                user = Object.assign(user, updates);
                return user;
            }
        }
    }

    softDeleteUser(id: string): User {
        for (let user of this._users) {
            if (user.id === id) {
                user.isDeleted = true;
                return user;
            }
        }
    }

}
