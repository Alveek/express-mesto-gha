const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

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
        .message('Имя должно быть от 2 до 30 символов'),
      link: Joi.string().uri().message('Невалидный url'),
    }),
  }),
  createCard
);
cardsRouter.delete(
  '/:cardId',
  authDelete,
  celebrate({
    params: Joi.object({
      userId: Joi.string().hex().length(24).message('Некорректный id'),
    }),
  }),
  deleteCard
);
cardsRouter.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object({
      userId: Joi.string().hex().length(24).message('Некорректный id'),
    }),
  }),
  likeCard
);
cardsRouter.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object({
      userId: Joi.string().hex().length(24).message('Некорректный id'),
    }),
  }),
  dislikeCard
);

module.exports = cardsRouter;
