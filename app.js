const express = require('express');
const mongoose = require('mongoose');

const { errors, celebrate, Joi } = require('celebrate');
const validator = require('validator');
const errorHandler = require('./errors/errorHandler');

const app = express();

const { PORT = 3000 } = process.env;

const UnauthorizedError = require('./errors/UnauthorizedError');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new UnauthorizedError('Неправильный формат ссылки');
  }
  return value;
};

const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const auth = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(express.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
  }),
}), createUser);

app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('/', (req, res, next) => {
  next(new NotFoundError('Путь не найден')); // res.status(404).send
});

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
