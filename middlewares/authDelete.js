const Card = require('../models/card');

module.exports = (req, res, next) => {
  Card.findById({ _id: req.params.cardId })
    .then((card) => {
      if (card.owner.toHexString() !== req.user._id) {
        return Promise.reject();
      }
      next();
    })
    .catch((err) =>
      res.status(403).send({ message: 'Это не твоя фотка, вали отсюда' })
    );
};
