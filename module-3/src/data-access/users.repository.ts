import { Like, Repository } from 'typeorm';
import User from '../models/User.model';
import { SavedRecordRes } from '../utils/SavedRecordRes';
import { AppDataSource } from './data-source';


class UsersRepository {
    private _usersRepository: Repository<User> = AppDataSource.getRepository(User);

    getUserById(id: number): Promise<User> {
        return this._usersRepository.findOne({
            where: [
                { id }
            ]
        });
    }

    getUsersList(login: string, limit: number): Promise<Array<User>> {
        return this._usersRepository.find({
            where: [{
                login: Like(`%${login}%`)
            }],
            order: {
                login: 'ASC'
            },
            take: limit
        });
    }

    async saveUser(user: User): Promise<SavedRecordRes> {
        const savedUser = await this._usersRepository.save(user);
        return { id: savedUser.id };
    }

    updateUser(userId: number, updates: Partial<User>): Promise<User> {
        return this._usersRepository.save({
            id: userId,
            ...updates
        });
    }

    async softDelete(userId: number): Promise<User> {
        const user: User = await this.getUserById(userId);
        user.isDeleted = true;
        
        return this._usersRepository.save({
            ...user
        });
    }
}

export default UsersRepository;
