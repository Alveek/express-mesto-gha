const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ERROR, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../utils/constants');
const errors = require('../errors');

const checkUser = (user, res) => {
  if (!user) {
    throw new errors.NotFound('Нет пользователя с таким id');
  }
  return res.send(user);
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Неправильные почта или пароль'));
        }
        const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
          expiresIn: '7d',
        });
        return res.send({ token });
      });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const getMe = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((err) => console.log(err));
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res
        .status(ERROR_DEFAULT)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    })
      .then((newUser) => {
        res.status(201).send({
          email: newUser.email,
          name: newUser.name,
          about: newUser.about,
          avatar: newUser.avatar,
        });
      })
      .catch((error) => {
        if (error.code === 11000) {
          next(
            new errors.Conflict(
              'Пользователь с таким имейл уже зарегистрирвован'
            )
          );
        }

        // if (error.name === 'ValidationError') {
        //   return res.status(ERROR).send({
        //     message: 'Переданы некорректные данные при создании пользователя',
        //   });
        // }
        // return res
        //   .status(ERROR_DEFAULT)
        //   .send({ message: 'На сервере произошла ошибка' });
      });
  });
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => checkUser(user, res))
    .catch((error) => {
      //   if (error.name === 'CastError') {
      //     return res.status(ERROR).send({ message: 'Некорректный _id' });
      //   }
      //   return res
      //     .status(ERROR_DEFAULT)
      //     .send({ message: 'На сервере произошла ошибка' });
      next(error);
    });
};

const editProfile = (req, res) => {
  const owner = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    owner,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => checkUser(user, res))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(ERROR).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
        });
      }
      return res
        .status(ERROR_DEFAULT)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

const updateAvatar = (req, res) => {
  const owner = req.user._id;
  const avatar = req.body;

  User.findByIdAndUpdate(owner, avatar, { new: true, runValidators: true })
    .then((user) => checkUser(user, res))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(ERROR).send({
          message: 'Переданы некорректные данные при обновлении аватара.',
        });
      }
      return res
        .status(ERROR_DEFAULT)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  login,
  getUsers,
  createUser,
  getUserById,
  editProfile,
  updateAvatar,
  getMe,
};
