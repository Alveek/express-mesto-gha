const cardsRouter = require('express').Router();
const { celebrate } = require('celebrate');
const authDeleteCard = require('../middlewares/authDeleteCard');

const {
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
} = require('../validatioin');

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', celebrate(createCardValidation), createCard);

cardsRouter.delete(
  '/:cardId',
  celebrate(deleteCardValidation),
  authDeleteCard,
  deleteCard
);

cardsRouter.put('/:cardId/likes', celebrate(likeCardValidation), likeCard);
cardsRouter.delete(
  '/:cardId/likes',
  celebrate(likeCardValidation),
  dislikeCard
);

module.exports = cardsRouter;
