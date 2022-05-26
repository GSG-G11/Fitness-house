import Joi from 'joi';

const filterValidation = Joi.object({
  minPrice: Joi.number().integer(),
  maxPrice: Joi.number().positive().integer(),
  page: Joi.number().integer().positive(),
});

export default filterValidation;
