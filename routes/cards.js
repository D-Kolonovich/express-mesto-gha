const router = require('express').Router();
const validator = require('validator');

const { celebrate, Joi } = require('celebrate');
const {
  findCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', findCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    kink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "link" должно быть валидным url-адресом');
    }),
  }),
}), createCard);

router.delete('/cards/:cardId', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteCardById);

router.put('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), dislikeCard);

module.exports = router;
