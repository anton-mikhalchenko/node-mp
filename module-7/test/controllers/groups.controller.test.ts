import request from 'supertest';
import express, { Express } from 'express';
import groupsRouter from '../../src/controllers/groups.controller';
import GroupsService from '../../src/services/groups.service';
import Group from '../../src/models/Group.model';


const app: Express = express();
app.use('/groups', groupsRouter);

const group: Group = {
    id: 1,
    name: 'test group',
    users: [],
    permissions: []
};

describe('Groups Controller', () => {

    describe('GET /', () => {
        it('Should return all groups', () => {
            jest.spyOn(GroupsService.prototype, 'getAll').mockImplementation(() => Promise.resolve([group]));

            return request(app)
                    .get('/groups/')
                    .expect(200)
                    .expect(res => {
                        expect(res.body[0].name).toBe('test group');
                    })
        });
    });

    describe('GET /:id', () => {
        it('Should return group by id', () => {
            jest.spyOn(GroupsService.prototype, 'getById').mockImplementation(() => Promise.resolve(group));

            return request(app)
                    .get('/groups/1')
                    .expect(200)
                    .expect(res => {
                        expect(res.body.name).toBe('test group');
                    })
        });
    });

    describe('POST /', () => {
        it('Should return new group id', () => {
            jest.spyOn(GroupsService.prototype, 'create').mockImplementation(() => Promise.resolve({ id: 1 }));

            return request(app)
                    .post('/groups/')
                    .send(group)
                    .expect(201)
                    .expect(res => {
                        expect(res.body.id).toBe(1);
                    })
        });
    });
});
