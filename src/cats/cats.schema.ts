import Joi from 'joi';

export const createCatSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  age: Joi.number()
    .integer()
    .min(0)
    .max(99),
  breed: Joi.string(),
});
