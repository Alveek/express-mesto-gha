const { Joi } = require('celebrate');
const { urlRegEx } = require('./utils/constants');

const signinValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Введена некорректная почта',
      'any.required': 'Почта не должна быть пустой',
    }),
    password: Joi.string().required().min(8).messages({
      'string.password': 'Пароль должен быть не менее 8 символов',
      'any.required': 'Пароль не должен быть пустым',
    }),
  }),
};

const signupValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Введена некорректная почта',
      'any.required': 'Почта не должна быть пустой',
    }),
    password: Joi.string().required().min(8).messages({
      'string.password': 'Пароль должен быть не менее 8 символов',
      'any.required': 'Пароль не должен быть пустым',
    }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле "имя" не должно быть меньше 2 символов',
      'string.max': 'Поле "имя" не должно быть больше 30 символов',
      'any.required': 'Поле "имя" не должно быть пустым',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле "род деятельности" не должно быть меньше 2 символов',
      'string.max': 'Поле "род деятельности" не должно быть больше 30 символов',
      'any.required': 'Поле "род деятельности" не должно быть пустым',
    }),
    avatar: Joi.string().regex(urlRegEx).message('Невалидная ссылка'),
  }),
};

const getUserByIdValidation = {
  params: Joi.object({
    userId: Joi.string().hex().length(24).message('Некорректный id'),
  }),
};

const editProfileValidation = {
  body: Joi.object({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле "имя" не должно быть меньше 2 символов',
      'string.max': 'Поле "имя" не должно быть больше 30 символов',
      'any.required': 'Поле "имя" не должно быть пустым',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле "род деятельности" не должно быть меньше 2 символов',
      'string.max': 'Поле "род деятельности" не должно быть больше 30 символов',
      'any.required': 'Поле "род деятельности" не должно быть пустым',
    }),
  }),
};

const updateAvatarValidation = {
  body: Joi.object({
    avatar: Joi.string().regex(urlRegEx).message('Невалидная ссылка'),
  }),
};

const createCardValidation = {
  body: Joi.object({
    name: Joi.string()
      .min(2)
      .max(30)
      .messages({
        'string.min': 'Название карточки не должно быть меньше 2 символов',
        'string.max': 'Название карточки не должно быть больше 30 символов',
        'any.required': 'Название карточки не должно быть пустым',
      })
      .required(),
    link: Joi.string()
      .regex(urlRegEx)
      .messages({
        'string.dataUri': 'Невалидная ссылка',
        'any.required': 'Название карточки не должно быть пустым',
      })
      .required(),
  }),
};

const deleteCardValidation = {
  params: Joi.object({
    cardId: Joi.string().hex().length(24).messages({
      'string.hex': 'Некорректный id',
    }),
  }),
};

const likeCardValidation = {
  params: Joi.object({
    cardId: Joi.string().hex().length(24).messages({
      'string.hex': 'Некорректный id',
    }),
  }),
};

module.exports = {
  getUserByIdValidation,
  editProfileValidation,
  updateAvatarValidation,
  signinValidation,
  signupValidation,
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
};
