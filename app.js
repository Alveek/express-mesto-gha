const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const authRouter = require('./routes/auth');
const router = require('./routes');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authRouter);

app.use(auth);
app.use(router);

app.use(errors());

app.use((req, res) => {
  res.status(404).send({
    message: 'Запрошен несуществующий роут',
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });

  next();
});

app.listen(PORT, () => {
  console.log(`start server on port ${PORT}`);
});
