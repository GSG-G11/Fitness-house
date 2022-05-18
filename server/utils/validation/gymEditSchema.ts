import Joi from 'joi';

const gymRegisterSchema = Joi.object({
  gymId: Joi.number().required(),
  gymName: Joi.string().required(),
  logo: Joi.string().required(),
  phone: Joi.string().required(),
  city: Joi.string().required(),
  description: Joi.string(),
  typeGender: Joi.string().required(),
  monthlyPrice: Joi.number().required(),
  sixMonthPrice: Joi.number().required(),
  fulltime: Joi.boolean().required(),
  features: Joi.array().items(Joi.string()),
});

export default gymRegisterSchema;
