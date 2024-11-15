import Joi from 'joi';

export const moduleValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  courseId: Joi.string().required(), // Assuming this is a reference ID
  orderIndex: Joi.number().required(),
  lessons: Joi.array().items(Joi.string()),
  prerequisites: Joi.array().items(Joi.string()),
});