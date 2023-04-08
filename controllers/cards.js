const Card = require("../models/card");

const getCards = (req, res) => {
  Card.find({})
    .populate("owner")
    .populate("likes")
    .then((cards) => {
      res.send(cards);
    })
    .catch((error) => res.send(error));
};

const createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

const getCard = (req, res) => {
  const { id } = req.params;

  Card.findById(id)
    .populate("owner")
    .populate("likes")
    .then((card) => {
      res.send(card);
    })
    .catch((error) => res.send(error));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.deleteOne({ _id: cardId })
    .then((card) => res.send(card))
    .catch((error) => res.send(error));
};

const likeCard = (req, res) => {
  const owner = req.user._id;
  const cardId = req.params.cardId;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } },
    { new: true, runValidators: true }
  )
    .then((card) => res.send(card))
    .catch((error) => res.send(error));
};

const dislikeCard = (req, res) => {
  const owner = req.user._id;
  const cardId = req.params.cardId;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } },
    { new: true, runValidators: true }
  )
    .then((card) => res.send(card))
    .catch((error) => res.send(error));
};

module.exports = {
  getCards,
  createCard,
  getCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
