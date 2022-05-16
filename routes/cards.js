const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
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
    link: Joi.string().required().regex(/^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/),
  }),
}), createCard);

router.delete('/cards/:cardId', validateObjId, deleteCardById);

router.put('/cards/:cardId/likes', validateObjId, likeCard);

router.delete('/cards/:cardId/likes', validateObjId, dislikeCard);

module.exports = router;
