import { Router } from 'express';

import AuthUserService from '../services/AuthUserService';

const sessionsRouter: Router = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authUser = new AuthUserService();

    const { user, token } = await authUser.execute({
      email,
      password,
    });

    const userWithoutPassword = {
      ...user,
      password: null,
    };

    return res.json({
      user: userWithoutPassword,
      token,
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
