const BadRequest = require('./bad-request-err');
const NotFound = require('./not-found-err');
const Unauthorized = require('./unauthorized-err');
const Conflict = require('./conflict-err');
const Forbidden = require('./forbidden-err');

module.exports = {
  BadRequest,
  NotFound,
  Unauthorized,
  Conflict,
  Forbidden,
};
