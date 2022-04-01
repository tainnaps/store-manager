const Joi = require('joi');

const validateExistence = (req, res, next) => {
  const { name, quantity } = req.body;

  const { error } = Joi.object({
    name: Joi.string().required()
      .messages({
        'any.required': 'name is required',
      }),
    quantity: Joi.number().integer().required()
      .messages({
        'any.required': 'quantity is required',
      }),
  }).validate({ name, quantity });

  if (error) {
    const { message } = error.details[0];

    return res.status(400).json({ message });
  }

  next();
};

const validateLength = (req, res, next) => {
  const { name, quantity } = req.body;

  const { error } = Joi.object({
    name: Joi.string().min(5)
      .messages({
        'string.min': 'name length must be at least 5 characters long',
      }),
    quantity: Joi.number().integer().min(1)
      .messages({
        'number.min': 'quantity must be greater than or equal to 1',
      }),
  }).validate({ name, quantity });

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
