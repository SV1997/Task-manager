// middleware/validator.js
const { validationResult } = require('express-validator');

/**
 * Validation Middleware
 * Checks for validation errors from express-validator
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path || err.param,
        message: err.msg,
        value: err.value
      }))
    });
  }
  
  next();
};

module.exports = { validate };
