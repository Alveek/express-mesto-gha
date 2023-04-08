const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так...' }));
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
        return res.status(404).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
      }
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.deleteOne({ _id: cardId })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

const likeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } },
    { new: true, runValidators: true },
  )
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные для постановки/снятии лайка.',
        });
      }

      if (error.name === 'CastError') {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки' });
      }

      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

const dislikeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } },
    { new: true, runValidators: true },
  )
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные для постановки/снятии лайка.',
        });
      }
      if (error.name === 'CastError') {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки' });
      }
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
