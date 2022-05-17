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
  findCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { validateObjId } = require('../middlewares/validatons');

router.get('/cards', findCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
}), createCard);

router.delete('/cards/:cardId', validateObjId, deleteCardById);

router.put('/cards/:cardId/likes', validateObjId, likeCard);

router.delete('/cards/:cardId/likes', validateObjId, dislikeCard);

module.exports = router;
