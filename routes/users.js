const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const validator = require('validator');

const UnauthorizedError = require('../errors/UnauthorizedError');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new UnauthorizedError('Неправильный формат ссылки');
  }
  return value;
};

const {
  findUsers, findUserById, patchUser, patchUserAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/users', findUsers);

// router.post('/users', login);

router.get('/users/me', getCurrentUser);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), findUserById);

// router.post('/users', createUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), patchUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateURL).required(),
  }),
}), patchUserAvatar);

module.exports = router;
