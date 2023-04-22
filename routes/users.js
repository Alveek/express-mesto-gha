const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  editProfile,
  updateAvatar,
  getMe,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getMe);
usersRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object({
      userId: Joi.string().hex().length(24).message('Некорректный id'),
    }),
  }),
  getUserById
);

usersRouter.patch('/me', editProfile);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
