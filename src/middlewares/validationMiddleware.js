const Joi = require('joi');

module.exports = {
  addStatusValidation: (req, res, next) => {
    const statusSchema = Joi.object({ favorite: Joi.boolean().required() });
    const statusValidationResult = statusSchema.validate(req.body);
    if (statusValidationResult.error) {
      return res.status(400).json({
        status: 'Validation error',
        message: statusValidationResult.error.details,
      });
    }
    next();
  },
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      }),
      phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
      favorite: Joi.boolean().default(false),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        status: 'Validation error',
        message: validationResult.error.details,
      });
    }

    next();
  },
};
