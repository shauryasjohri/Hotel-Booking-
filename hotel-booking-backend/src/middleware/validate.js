import { validationResult } from 'express-validator';

/**
 * Centralized validation middleware.
 * Runs after express-validator chain, returns 400 if validation fails.
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map((e) => ({ field: e.path, message: e.msg }));
    return res.status(400).json({ success: false, message: 'Validation failed', errors: messages });
  }

  next();
};
