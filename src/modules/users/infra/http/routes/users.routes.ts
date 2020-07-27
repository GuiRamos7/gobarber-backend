import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/uploadConfig';

import CreateUserService from '@modules/users/services/CreateUserService';
import UptadeUserAvatarService from '@modules/users/services/UptadeUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const createUser = new CreateUserService();
  const user = await createUser.execute({ name, email, password });

  delete user.password;

  return res.send(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const {
      user: { id },
      file: { filename },
    } = req;

    const updateUserAvatar = new UptadeUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: id,
      avatarFilename: filename,
    });
    delete user.password;

    return res.json(user);
  },
);

export default usersRouter;
