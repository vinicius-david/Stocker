import { Router, Request, Response } from 'express';

import UserRepository from '../repositories/UsersRepository';

const usersRouter: Router = Router();
const userRepository = new UserRepository();

usersRouter.get('/', (req: Request, res: Response) => {
  const users = userRepository.list();

  return res.json(users);
});

usersRouter.post('/', (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const findExistingUser = userRepository.find({ name, email });

  if (findExistingUser) {
    return res.status(400).json({ error: 'Name or email already used.' });
  }

  const user = userRepository.create({ name, email, password });

  return res.json(user);
});

export default usersRouter;
