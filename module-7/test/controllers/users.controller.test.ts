import usersRouter from '../../src/controllers/users.controller';
import User from '../../src/models/User.model';
import request from 'supertest';
import express, { Express } from 'express';
import UsersService from '../../src/services/users.service';


const app: Express = express();
app.use(express.json());
app.use('/users', usersRouter);

const user: User = {
    id: 1,
    login: 'abc',
    password: '123',
    age: 45,
    isDeleted: false,
    groups: []
};

const userReq = {
    login: 'test',
    password: '123',
    age: 45
};

describe('Users Controller', () => {
    
    describe('GET /list', () => {
        const usersList = [user];

        it('Should return users list', () => {
            jest.spyOn(UsersService.prototype, 'getUsersList').mockImplementation(() => Promise.resolve(usersList));

            return request(app)
                    .get('/users/list')
                    .expect(200)
                    .expect(res => {    
                        expect(res.body[0].login).toBe(usersList[0].login);
                    })
        });
        it('Should return 404 error', () => {
            jest.spyOn(UsersService.prototype, 'getUsersList').mockImplementation(() => Promise.reject());

            return request(app)
                    .get('/users/list')
                    .expect(404);
        });
    });

    describe('GET /:id', () => {
        it('Should return user by id', () => {
            jest.spyOn(UsersService.prototype, 'getUserById').mockImplementation(() => Promise.resolve(user));

            return request(app)
                    .get('/users/1')
                    .expect(200)
                    .expect(res => {
                        expect(res.body.login).toBe(user.login);
                    });
        });
        it('Should return message with 202 status if user was deleted', () => {
            const fakeUser = {
                ...user,
                isDeleted: true
            };
            jest.spyOn(UsersService.prototype, 'getUserById').mockImplementation(() => Promise.resolve(fakeUser));

            return request(app)
                    .get('/users/1')
                    .expect(202)
                    .expect(res => {
                        expect(res.body.msg).toBe('User was deleted');
                    });
        });
        it('Should return \'User not found\' message with status 404', () => {
            jest.spyOn(UsersService.prototype, 'getUserById').mockImplementation(() => Promise.resolve(null));

            return request(app)
                    .get('/users/1')
                    .expect(404)
                    .expect(res => {
                        expect(res.body.msg).toBe('User with id 1 not found');
                    });
        });
    });

    describe('POST /', () => {
        it('Should return created user with status 201', () => {
            jest.spyOn(UsersService.prototype, 'saveUser').mockImplementation(() => Promise.resolve({ id: user.id }));

            return request(app)
                    .post('/users/')
                    .send(userReq)
                    .expect(201)
                    .expect(res => {
                        expect(res.body.id).toBe(user.id);
                    });
        });
        it('Should return 404 error if user cannot be saved', () => {
            jest.spyOn(UsersService.prototype, 'saveUser').mockImplementation(() => Promise.reject());

            return request(app)
                    .post('/users/')
                    .send(userReq)
                    .expect(404);
        });
    });

    describe('PUT /:id', () => {
        it('Should return updated user', () => {
            jest.spyOn(UsersService.prototype, 'updateUser')
                .mockImplementation((userId, updates) => {
                    return Promise.resolve(Object.assign({ id: userId }, updates) as User)
                });

            return request(app)
                    .put('/users/1')
                    .send(userReq)
                    .expect(200)
                    .then(res => {
                        expect(res.body.id).toBe(1);
                        expect(res.body.login).toBe('test');
                    });
        });
        it('Should return 404 error if user cannot be updated', () => {
            jest.spyOn(UsersService.prototype, 'updateUser').mockImplementation(() => Promise.reject());

            return request(app)
                    .put('/users/1')
                    .send(userReq)
                    .expect(404)
        });
    });

    describe('DELETE /:id', () => {
        it('Should return deleted user', () => {
            jest.spyOn(UsersService.prototype, 'softDelete').mockImplementation(() => Promise.resolve(user));

            return request(app)
                    .delete('/users/1')
                    .expect(200)
                    .expect(res => {
                        expect(res.body.login).toBe(user.login);
                    });
        });
        it('Should return 404 error if user cannot be deleted', () => {
            jest.spyOn(UsersService.prototype, 'softDelete').mockImplementation(() => Promise.reject(new Error('Error')));

            return request(app)
                    .delete('/users/123')
                    .expect(404);
        });
        it('Should return 404 error with message if user with such id not found', () => {
            jest.spyOn(UsersService.prototype, 'softDelete').mockImplementation(() => Promise.resolve(null));

            return request(app)
                    .delete('/users/1')
                    .expect(404)
                    .expect(res => {
                        expect(res.body.msg).toBe('User with id 1 not found');
                    });
        })
    });
});
