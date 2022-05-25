import express, { Express } from 'express';
import usersRouter from './src/controllers/users.controller';

const app: Express = express();

app.use(express.json());
app.use('/users', usersRouter);

app.listen(3000, () => console.log('Server is running!'));
