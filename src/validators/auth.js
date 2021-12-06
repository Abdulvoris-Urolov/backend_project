const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("firstName kiriting"),
  check("lastName").notEmpty().withMessage("lastName kiriting"),
  check("userName").notEmpty().withMessage("userName kiriting"),
  check("email").notEmpty().withMessage("email kiriting"),
  check("password").notEmpty().withMessage("password kiriting"),
];

exports.validateSigninRequest = [
  check("email").notEmpty().withMessage("email kiriting"),
  check("password").notEmpty().withMessage("password kiriting"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
