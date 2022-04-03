const Joi = require('joi');

const validateSchema = (schema, data) => {
  let validationError;

  for (let i = 0; i < data.length; i += 1) {
    const { error } = schema.validate(data[i]);

    if (error) {
      validationError = error;
      break;
    }
  }

  return validationError;
};

const validateExistence = (req, _res, next) => {
  const products = [...req.body];

  const schema = Joi.object({
    productId: Joi.required()
      .messages({ 'any.required': '"productId" is required' }),
    quantity: Joi.required()
      .messages({ 'any.required': '"quantity" is required' }),
  });

  const joiError = validateSchema(schema, products);

  if (joiError) {
    const error = { type: 'isRequired', message: joiError.details[0].message };
    return next(error);
  }

  next();
};

const validateValue = (req, _res, next) => {
  const products = [...req.body];

  const schema = Joi.object({
    productId: Joi.number().integer(),
    quantity: Joi.number().integer().min(1)
      .messages({
        'number.min': '"quantity" must be greater than or equal to 1',
      }),
  });

  const joiError = validateSchema(schema, products);

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
