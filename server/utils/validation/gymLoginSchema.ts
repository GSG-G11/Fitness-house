import Joi from 'joi';

const gymLoginSchema = Joi.object({
  email: Joi.string()
    .max(250)
    .min(4)
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().max(50).min(3).required(),
});

export default gymLoginSchema;
