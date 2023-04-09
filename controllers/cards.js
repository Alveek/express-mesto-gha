const Card = require('../models/card');

const ERROR = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_DEFAULT = 500;

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => {
      res.send(cards);
    })
    .catch(() =>
      res.status(ERROR_DEFAULT).send({ message: 'На сервере произошла ошибка' })
    );
};

const createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(ERROR_NOT_FOUND).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
      } else {
        return res
          .status(ERROR_DEFAULT)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.deleteOne({ _id: cardId })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        return res
          .status(ERROR_DEFAULT)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const likeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } },
    { new: true, runValidators: true }
  )
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(ERROR).send({
          message: 'Переданы некорректные данные для постановки/снятии лайка.',
        });
      } else if (error.name === 'CastError') {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Передан несуществующий _id карточки' });
      } else {
        return res
          .status(ERROR_DEFAULT)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const dislikeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } },
    { new: true, runValidators: true }
  )
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(ERROR).send({
          message: 'Переданы некорректные данные для постановки/снятии лайка.',
        });
      } else if (error.name === 'CastError') {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Передан несуществующий _id карточки' });
      } else {
        return res
          .status(ERROR_DEFAULT)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
