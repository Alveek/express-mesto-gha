const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minLength: 2,
  },
  email: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("user", userSchema);
