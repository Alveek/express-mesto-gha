const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlRegEx } = require('../utils/utils');

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const authDelete = require('../middlewares/authDelete');

cardsRouter.get('/', getCards);
cardsRouter.post(
  '/',
  celebrate({
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
  }),
  createCard
);

cardsRouter.delete(
  '/:cardId',
  celebrate({
    params: Joi.object({
      cardId: Joi.string().hex().length(24).messages({
        'string.hex': 'Некорректный id',
      }),
    }),
  }),
  authDelete,
  deleteCard
);

cardsRouter.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object({
      cardId: Joi.string().hex().length(24).messages({
        'string.hex': 'Некорректный id',
      }),
    }),
  }),
  likeCard
);
cardsRouter.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object({
      cardId: Joi.string().hex().length(24).messages({
        'string.hex': 'Некорректный id',
      }),
    }),
  }),
  dislikeCard
);

module.exports = cardsRouter;

// params: Joi.object({
//   cardId: Joi.string().custom((value, helper) => {
//     if (!mongoose.Types.ObjectId.isValid(value)) {
//       return helper.message('Некорректный id');
//     }
//     return value;
//   }),
// }),
