import Joi from 'joi';

const gymImageSchema = Joi.object({
  images: Joi.array().min(1).max(5).items(Joi.string())
    .required(),
});

export default gymImageSchema;
