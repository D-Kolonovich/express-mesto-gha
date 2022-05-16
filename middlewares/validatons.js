const { Joi, celebrate } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
// const validator = require('validator');

const validateObjId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});

module.exports = {
  validateObjId,
};
