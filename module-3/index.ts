import express, { Express } from 'express';
import usersRouter from './src/controllers/users.controller';
import { AppDataSource } from './src/data-access/data-source';

const app: Express = express();

AppDataSource.initialize().then(() => {
    app.use(express.json());
    app.use('/users', usersRouter);

    app.listen(3000, () => console.log('Server is running!'));
}).catch(err => console.log(err));
