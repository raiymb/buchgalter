import Joi from 'joi';

export const lessonValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().allow('').optional(),
  videoUrl: Joi.string().uri().optional(),
  lessonType: Joi.string().valid('lecture', 'video', 'practical').required(),
  module: Joi.string().required(), // Assuming this is a reference ID
  orderIndex: Joi.number().required(),
  submissionUrl: Joi.string().uri().optional(),
  submissionStatus: Joi.string().valid('submitted', 'graded', 'not-submitted').optional(),
  grade: Joi.number().min(0).max(100).optional(),
  isGraded: Joi.boolean().optional(),
});