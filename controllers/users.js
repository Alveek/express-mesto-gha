const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((error) => res.status(500).send(error));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.send(user))
    .catch((error) => res.send(error));
};

const editProfile = (req, res) => {
  const owner = req.user._id;
  const data = req.body;

  User.findOneAndUpdate(owner, data, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((error) => res.send(error));
};

const updateAvatar = (req, res) => {
  const owner = req.user._id;
  const avatar = req.body;

  User.findOneAndUpdate(owner, avatar, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((error) => res.send(error));
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  editProfile,
  updateAvatar,
};
