const router = require('express').Router();
const validator = require('validator');

const { celebrate, Joi } = require('celebrate');
const {
  findUsers, findUserById, createUser, patchUser, patchUserAvatar, login,
} = require('../controllers/users');

router.get('/users', findUsers);

router.post('/users', login);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), findUserById);

router.post('/users', createUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), patchUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "link" должно быть валидным url-адресом');
    }),
  }),
}), patchUserAvatar);

module.exports = router;
