import { body, param } from 'express-validator';

export const createHotelValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('description').optional().trim(),
  body('amenities').optional().isArray().withMessage('Amenities must be array'),
  body('images').optional().isArray().withMessage('Images must be array'),
];

export const updateHotelValidator = [
  param('id').isUUID().withMessage('Invalid hotel ID'),
  body('name').optional().trim().notEmpty(),
  body('location').optional().trim().notEmpty(),
  body('description').optional().trim(),
  body('amenities').optional().isArray(),
  body('images').optional().isArray(),
];

export const hotelIdValidator = [
  param('id').isUUID().withMessage('Invalid hotel ID'),
];
