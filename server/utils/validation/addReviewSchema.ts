import Joi from 'joi';

const addReviewSchema = Joi.object({
  gymId: Joi.number().required(),
  description: Joi.string().min(2).max(1000).allow(''),
  userPhone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  username: Joi.string().min(2).max(50).required(),
  rate: Joi.number().min(0).max(5).required(),
});

export default addReviewSchema;
