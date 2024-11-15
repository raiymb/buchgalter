import Joi from 'joi';

export const courseCreationValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  instructor: Joi.string().required(), // Assuming this is a reference ID
  price: Joi.number().min(0).required(),
  visibility: Joi.string().valid('public', 'private').required(),
});

export const courseUpdateValidation = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(10),
  price: Joi.number().min(0),
  visibility: Joi.string().valid('public', 'private'),
});