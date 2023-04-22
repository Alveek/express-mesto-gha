const authRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const { urlRegEx } = require('../utils/utils');

authRouter.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .email()
        .message('Введен некорректный email'),
      password: Joi.string()
        .required()
        .min(8)
        .message('Пароль должен быть не менее 8 символов'),
    }),
  }),
  login
);

authRouter.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .email()
        .message('Введен некорректный email'),
      password: Joi.string()
        .required()
        .min(8)
        .message('Пароль должен быть не менее 8 символов'),
      name: Joi.string()
        .min(2)
        .max(30)
        .message('Имя должно быть от 2 до 30 символов'),
      about: Joi.string()
        .min(2)
        .max(30)
        .message('Это поле должно быть от 2 до 30 символов'),
      avatar: Joi.string().regex(urlRegEx).message('Неверная ссылка'),
    }),
  }),
  createUser
);

module.exports = authRouter;
