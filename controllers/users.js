const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так...' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      }
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(404)
          .send({ message: 'Пользователь по указанному _id не найден' });
      }
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

const editProfile = (req, res) => {
  const owner = req.user._id;
  const data = req.body;

  User.findOneAndUpdate(owner, data, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
        });
      }
      if (error.name === 'CastError') {
        return res
          .status(404)
          .send({ message: 'Пользователь по указанному _id не найден' });
      }
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

const updateAvatar = (req, res) => {
  const owner = req.user._id;
  const avatar = req.body;

  User.findOneAndUpdate(owner, avatar, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при обновлении аватара.',
        });
      }
      if (error.name === 'CastError') {
        return res
          .status(404)
          .send({ message: 'Пользователь по указанному _id не найден' });
      }
      return res.status(500).send({ message: 'Что-то пошло не так...' });
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  editProfile,
  updateAvatar,
};
