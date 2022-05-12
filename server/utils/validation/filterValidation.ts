import Joi from 'joi';

const filterValidation = Joi.object({
  minPrice: Joi.number().positive(),
  maxPrice: Joi.number().positive(),
  page: Joi.number().integer().positive(),
});

export default filterValidation;
