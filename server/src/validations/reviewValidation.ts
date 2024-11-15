import Joi from 'joi';

export const reviewValidation = Joi.object({
  course: Joi.string().required(), // Assuming this is a reference ID
  student: Joi.string().required(), // Assuming this is a reference ID
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().max(500).optional(),
});