const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  link: {
    type: String,
    require: true,
    minLength: 2,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
});

module.exports = mongoose.model("card", cardSchema);
