import { Router } from 'express';

import ListUsersService from '../services/ListUsersService';
import FindUserService from '../services/FindUserService';
import CreateUserService from '../services/CreateUserService';
import AddOrRemoveStockService from '../services/AddOrRemoveStockService';
import UpdateUserService from '../services/UpdateUserService';

const usersRouter: Router = Router();

usersRouter.get('/', async (req, res) => {
  try {
    const listUsers = new ListUsersService();

    const users = await listUsers.execute();

    return res.json(users.map(user => ({ ...user, password: null })));
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

usersRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const findUser = new FindUserService();

    const user = await findUser.execute({ id });

    return res.json({
      ...user,
      password: null,
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

usersRouter.post('/', async (req, res) => {
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

usersRouter.patch('/stock/', async (req, res) => {
  try {
    const { userId, stockId } = req.body;

    const addOrRemoveStock = new AddOrRemoveStockService();

    const user = await addOrRemoveStock.execute({ userId, stockId });

    return res.json({
      ...user,
      password: null,
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

usersRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, email, password, newPassword,
    } = req.body;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({
      id, name, email, password, newPassword,
    });

    return res.json({
      ...user,
      password: null,
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

export default usersRouter;
