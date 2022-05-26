/* eslint-disable no-useless-escape */
const Joi = require('joi');

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().max(25).min(8).required(),
  confirmPassword: Joi.ref('password'),
});

export default resetPasswordSchema;
