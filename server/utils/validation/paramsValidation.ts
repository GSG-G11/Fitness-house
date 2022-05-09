import Joi from 'joi';

const paramsValidation = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export default paramsValidation;
