const usersRouter = require("express").Router();
const { createUser } = require("../controllers/users");

usersRouter.post("/", createUser);

module.exports = usersRouter;
