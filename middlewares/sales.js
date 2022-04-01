const Joi = require('joi');

const validateExistence = (req, res, next) => {
  const { productId, quantity } = req.body;

  const { error } = Joi.object({
    productId: Joi.string().required()
      .messages({
        'any.required': 'productId is required',
      }),
    quantity: Joi.number().integer().required()
      .messages({
        'any.required': 'quantity is required',
      }),
  }).validate({ productId, quantity });

  if (error) {
    const { message } = error.details[0];

    return res.status(400).json({ message });
  }

  next();
};

const validateLength = (req, res, next) => {
  const { quantity } = req.body;

  const { error } = Joi.object({
    quantity: Joi.number().integer().min(1)
      .messages({
        'number.min': 'quantity must be greater than or equal to 1',
      }),
  }).validate({ quantity });

  if (error) {
    const { message } = error.details[0];

    return res.status(422).json({ message });
  }

  next();
};

module.exports = {
  validateExistence,
  validateLength,
};
