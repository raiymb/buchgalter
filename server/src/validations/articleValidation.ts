import Joi from 'joi';

export const articleValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(10).required(),
  author: Joi.string().required(), // Assuming this is a reference ID
  tags: Joi.array().items(Joi.string()),
  media: Joi.array().items(
    Joi.object({
      type: Joi.string().valid('image', 'video').required(),
      url: Joi.string().uri().required(),
    })
  ),
  relatedArticles: Joi.array().items(Joi.string()),
});