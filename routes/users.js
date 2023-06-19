const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUserByIdValidation,
  editProfileValidation,
  updateAvatarValidation,
} = require('../validation');

const {
  getUsers,
  getUserById,
  editProfile,
  updateAvatar,
  getMe,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getMe);
usersRouter.get('/:userId', celebrate(getUserByIdValidation), getUserById);
usersRouter.patch('/me', celebrate(editProfileValidation), editProfile);
usersRouter.patch(
  '/me/avatar',
  celebrate(updateAvatarValidation),
  updateAvatar
);

module.exports = usersRouter;
