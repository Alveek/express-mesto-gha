const mongoose = require('mongoose');
const User = require('../models/user');

const ERROR = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_DEFAULT = 500;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res
        .status(ERROR_DEFAULT)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(ERROR).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      }
      return res
        .status(ERROR_DEFAULT)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  const isValidId = mongoose.Types.ObjectId.isValid(userId);

  User.findById(userId)
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(ERROR).send({
          message: 'Переданы некорректные данные при получении пользователя.',
        });
      }
      if (!isValidId) {
        return res.status(ERROR).send({ message: 'Некорректный _id' });
      }
      if (error.name === 'CastError') {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Пользователь по указанному _id не найден' });
      }
      return res
        .status(ERROR_DEFAULT)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

const editProfile = (req, res) => {
  const owner = req.user._id;
  const data = req.body;

  User.findOneAndUpdate(owner, data, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(ERROR).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
        });
      }
      if (error.name === 'CastError') {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Пользователь по указанному _id не найден' });
      }
      return res
        .status(ERROR_DEFAULT)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

const updateAvatar = (req, res) => {
  const owner = req.user._id;
  const avatar = req.body;

  User.findOneAndUpdate(owner, avatar, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(ERROR).send({
          message: 'Переданы некорректные данные при обновлении аватара.',
        });
      }
      if (error.name === 'CastError') {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: 'Пользователь по указанному _id не найден' });
      }
      return res
        .status(ERROR_DEFAULT)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  editProfile,
  updateAvatar,
};
