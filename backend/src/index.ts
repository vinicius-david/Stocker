import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/stock', (req: Request, res: Response) => {
  res.send('TypeScript + Node server!');
});

app.listen('3333', () => {
  console.log('Server is running on port 3333...');
});
