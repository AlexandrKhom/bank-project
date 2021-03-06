import * as Joi from 'joi';

export const schemaValidConfig = Joi.object({
  PORT: Joi.number().default(3000),
  POSTGRES_DATABASE: Joi.string().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5432).required(),
  POSTGRES_USER: Joi.string().required(),
});
