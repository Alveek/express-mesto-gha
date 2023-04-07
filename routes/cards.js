const cardsRouter = require("express").Router();
const { createCard, getCard } = require("../controllers/cards");

cardsRouter.get("/:id", getCard);
cardsRouter.post("/", createCard);

module.exports = cardsRouter;
