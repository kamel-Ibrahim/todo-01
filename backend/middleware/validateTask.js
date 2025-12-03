const { body, validationResult } = require('express-validator');
exports.createTaskValidationRules = [
  body('title')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Title is required'),

  body('description')
    .optional()
    .isString()
    .trim(),

  body('category')
    .optional()
    .isString()
    .trim(),

  body('dueAt')
    .optional()
    .isISO8601()
    .withMessage('dueAt must be a valid ISO date'),

  body('subtasks')
    .optional()
    .isArray()
    .withMessage('subtasks must be an array'),

  body('subtasks.*.text')
    .optional()
    .isString()
    .trim(),

  body('subtasks.*.done')
    .optional()
    .isBoolean(),
];

exports.updateTaskValidationRules = [
  body('title')
    .optional()
    .isString()
    .trim(),

  body('description')
    .optional()
    .isString()
    .trim(),

  body('category')
    .optional()
    .isString()
    .trim(),

  body('dueAt')
    .optional()
    .isISO8601()
    .withMessage('dueAt must be a valid ISO date'),

  body('subtasks')
    .optional()
    .isArray()
    .withMessage('subtasks must be an array'),

  body('subtasks.*.text')
    .optional()
    .isString()
    .trim(),

  body('subtasks.*.done')
    .optional()
    .isBoolean(),

  body('done')
    .optional()
    .isBoolean(),

  body('archived')
    .optional()
    .isBoolean(),
];

exports.validateTask = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
