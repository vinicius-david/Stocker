import { Router, Request, Response } from 'express';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

const usersRouter: Router = Router();

usersRouter.get('/', async (req: Request, res: Response) => {
  const usersRepository = UsersRepository;
  const users = await usersRepository.find();

  return res.json(users);
});

usersRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    return res.json({
      ...user,
      password: null,
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

export default usersRouter;
