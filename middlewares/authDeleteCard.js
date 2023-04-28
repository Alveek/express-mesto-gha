const Card = require('../models/card');
const customError = require('../errors');

module.exports = (req, res, next) => {
  Card.findById({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        next(new customError.NotFound('Карточки с указанным id не существует'));
      }
      if (card.owner.toHexString() !== req.user._id) {
        next(
          new customError.Forbidden('У вас нет прав на удаление чужой карточки')
        );
      }
      return next();
    })
    .catch(next);
};
