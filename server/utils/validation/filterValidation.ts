import Joi from 'joi';

const filterValidation = Joi.object({
  minPrice: Joi.number().integer().required(),
  maxPrice: Joi.number().positive().required(),
  page: Joi.number().integer().positive(),
});

export default filterValidation;
