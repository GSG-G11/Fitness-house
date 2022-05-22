import Joi from 'joi';

const addSubscriptionSchema = Joi.object({
  gymId: Joi.number().required(),
  username: Joi.string().min(2).max(30).required(),
  userPhone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  type: Joi.string().valid('month', 'sixMonth').required(),
  status: Joi.boolean().required(),
});

export default addSubscriptionSchema;
