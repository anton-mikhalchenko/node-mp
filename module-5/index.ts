import express, { Express } from 'express';
import groupsRouter from './src/controllers/groups.controller';
import usersRouter from './src/controllers/users.controller';
import { AppDataSource } from './src/data-access/data-source';
import { handleError } from './src/middlewares/error-handler.middleware';
import { logRequestData } from './src/middlewares/request-logger.middleware';
import logger from './src/services/logger.service';

const app: Express = express();

AppDataSource.initialize().then(() => {
    app.use(express.json());
    app.use(logRequestData);
    app.use('/users', usersRouter);
    app.use('/groups', groupsRouter);

    app.use(handleError);

    app.listen(3000, () => console.log('Server is running!'));
}).catch(err => console.log(err));

process.on('uncaughtException', (err) => {
    logger.error(err);
    process.exit(1);
});
