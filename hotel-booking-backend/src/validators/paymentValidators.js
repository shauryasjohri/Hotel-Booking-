import { body } from 'express-validator';

export const createIntentValidator = [
  body('booking_id').isUUID().withMessage('Invalid booking ID'),
];
