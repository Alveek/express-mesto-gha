const Card = require("../models/card");

const createCard = (req, res) => {
  const { id } = req.user;
  const { link, owner } = req.body;

  Card.create({ link, owner: id })
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
    .orFail(() => {
      const error = new Error("card is not found");
      throw error;
    })
    .then((card) => {
      res.send(card);
    })
    .catch((error) => res.send(error));
};

module.exports = {
  createCard,
  getCard,
};
