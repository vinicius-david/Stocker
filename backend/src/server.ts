import 'reflect-metadata';

import express, { Express } from 'express';
import routes from './routes';

import './database';

const app: Express = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => {
  console.log('Server is running on port 3333...');
});
