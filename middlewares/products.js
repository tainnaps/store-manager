const Joi = require('joi');

/*
  Utilizei o link abaixo como apoio para validação de dados usando o Joi.
  link: https://trybecourse.slack.com/archives/C02B4PPBERE/p1648768884552919
*/

const validateExistence = (req, _res, next) => {
  const { name, quantity } = req.body;

  const { error: joiError } = Joi.object({
    name: Joi.string().required()
      .messages({
        'any.required': '"name" is required',
      }),
    quantity: Joi.number().integer().required()
      .messages({
        'any.required': '"quantity" is required',
      }),
  }).validate({ name, quantity });

  if (joiError) {
    const error = { type: 'isRequired', message: joiError.details[0].message };

    return next(error);
  }

  next();
};

const validateValue = (req, _res, next) => {
  const { name, quantity } = req.body;

  const { error: joiError } = Joi.object({
    name: Joi.string().min(5)
      .messages({
        'string.min': '"name" length must be at least 5 characters long',
      }),
    quantity: Joi.number().integer().min(1)
      .messages({
        'number.min': '"quantity" must be greater than or equal to 1',
      }),
  }).validate({ name, quantity });

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
