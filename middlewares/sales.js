const Joi = require('joi');

const validateExistence = (req, _res, next) => {
  const { productId, quantity } = req.body;

  const { error: joiError } = Joi.object({
    productId: Joi.string().required()
      .messages({
        'any.required': '"productId" is required',
      }),
    quantity: Joi.number().integer().required()
      .messages({
        'any.required': '"quantity" is required',
      }),
  }).validate({ productId, quantity });

  if (joiError) {
    const error = { type: 'isRequired', message: joiError.details[0].message };

    return next(error);
  }

  next();
};

const validateValue = (req, _res, next) => {
  const { quantity } = req.body;

  const { error: joiError } = Joi.object({
    quantity: Joi.number().integer().min(1)
      .messages({
        'number.min': '"quantity" must be greater than or equal to 1',
      }),
  }).validate({ quantity });

  if (joiError) {
    const error = { type: 'invalidValue', message: joiError.details[0].message };

    return next(error);
  }

  next();
};

module.exports = {
  validateExistence,
  validateValue,
};
