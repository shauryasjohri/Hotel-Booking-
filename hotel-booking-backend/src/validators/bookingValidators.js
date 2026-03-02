import { body, param } from 'express-validator';

const isValidDate = (value) => {
  const date = new Date(value);
  return !isNaN(date.getTime());
};

export const createBookingValidator = [
  body('hotel_id').isUUID().withMessage('Invalid hotel ID'),
  body('room_id').isUUID().withMessage('Invalid room ID'),
  body('check_in')
    .notEmpty().withMessage('Check-in date is required')
    .custom(isValidDate).withMessage('Invalid check-in date'),
  body('check_out')
    .notEmpty().withMessage('Check-out date is required')
    .custom(isValidDate).withMessage('Invalid check-out date')
    .custom((checkOut, { req }) => {
      const checkIn = new Date(req.body.check_in);
      const out = new Date(checkOut);
      return out > checkIn;
    }).withMessage('Check-out must be after check-in'),
  body('guests').optional().isInt({ min: 1 }).withMessage('Guests must be at least 1'),
];

export const bookingIdValidator = [
  param('id').isUUID().withMessage('Invalid booking ID'),
];
