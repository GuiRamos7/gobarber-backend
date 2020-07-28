import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticationUserService from '@modules/users/services/AuthenticationUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticationUser = container.resolve(AuthenticationUserService);

  const { user, token } = await authenticationUser.execute({
    email,
    password,
  });

  delete user.password;
  return res.json({ user, token });
});

export default sessionsRouter;
