const User = require("../models/user");

const createUser = (req, res) => {
  const { name, email } = req.body;
  User.create({ name, email })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

module.exports = {
  createUser,
};
