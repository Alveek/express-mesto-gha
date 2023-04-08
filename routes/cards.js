const cardsRouter = require("express").Router();
const {
  createCard,
  getCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

cardsRouter.get("/", getCards);
cardsRouter.get("/:id", getCard);
cardsRouter.post("/", createCard);
cardsRouter.delete("/:cardId", deleteCard);
cardsRouter.put("/:cardId/likes", likeCard);
cardsRouter.delete("/:cardId/likes", dislikeCard);

module.exports = cardsRouter;
