const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const urlRegEx =
  /^((http|https):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },

  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },

  avatar: {
    type: String,
    validate: {
      validator: (v) => urlRegEx.test(v),
      message: 'This is not a valid link!',
    },
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

module.exports = mongoose.model('user', userSchema);
