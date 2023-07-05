const authRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const { signinValidation, signupValidation } = require('../validation');

authRouter.post('/signin', celebrate(signinValidation), login);
authRouter.post('/signup', celebrate(signupValidation), createUser);

module.exports = authRouter;
