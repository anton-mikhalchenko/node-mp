import express, { Express } from 'express';
import authRouter from './src/controllers/auth.controller';
import groupsRouter from './src/controllers/groups.controller';
import usersRouter from './src/controllers/users.controller';
import { AppDataSource } from './src/data-access/data-source';
import { auth } from './src/middlewares/auth.middleware';
import { handleError } from './src/middlewares/error-handler.middleware';
import { logRequestData } from './src/middlewares/request-logger.middleware';
import logger from './src/services/logger.service';
import cors from 'cors';

const app: Express = express();

AppDataSource.initialize().then(() => {
    app.use(express.json());
    app.use(cors());
    app.use(logRequestData);
    app.use('/auth', authRouter);
    app.use(auth);
    app.use('/users', usersRouter);
    app.use('/groups', groupsRouter);

    app.use(handleError);

    app.listen(3000, () => console.log('Server is running!'));
}).catch(err => console.log(err));

process.on('uncaughtException', (err) => {
    logger.error(err);
    process.exit(1);
});
