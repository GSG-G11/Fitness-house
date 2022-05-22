import Joi from 'joi';

const gymRegisterSchema = Joi.object({
  gymName: Joi.string().required(),
  logo: Joi.string().required(),
  email: Joi.string()
    .max(250)
    .min(4)
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().max(25).min(8).required(),
  phone: Joi.string().required(),
  city: Joi.string().required(),
  description: Joi.string().allow(''),
  typeGender: Joi.string().required(),
  monthlyPrice: Joi.number().required(),
  sixMonthPrice: Joi.number().required(),
  fulltime: Joi.boolean().required(),
  features: Joi.array().items(Joi.string()),
});

export default gymRegisterSchema;
