import { Router, Request, Response } from 'express';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

const usersRouter: Router = Router();
const usersRepository = new UsersRepository();

usersRouter.get('/', (req: Request, res: Response) => {
  const users = usersRepository.list();

  return res.json(users);
});

usersRouter.post('/', (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService(usersRepository);

    const user = createUser.execute({ name, email, password });

    return res.json(user);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

export default usersRouter;
