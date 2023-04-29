const JWT_SECRET = 'some-secret-key';
const urlRegEx = /^(ftp|http|https):\/\/[^ "]+$/;

const allowedCors = [
  'http://alveek.nomoredomains.monster',
  'https://alveek.nomoredomains.monster',
  'localhost:3000',
];

module.exports = {
  urlRegEx,
  JWT_SECRET,
  allowedCors,
};
