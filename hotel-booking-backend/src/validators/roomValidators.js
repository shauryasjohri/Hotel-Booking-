import { body, param } from 'express-validator';

const hotelIdParam = param('hotelId').isUUID().withMessage('Invalid hotel ID');
const roomIdParam = param('roomId').isUUID().withMessage('Invalid room ID');

export const createRoomValidator = [
  hotelIdParam,
  body('room_type').trim().notEmpty().withMessage('Room type is required'),
  body('price_per_night').isFloat({ min: 0 }).withMessage('Price must be positive'),
  body('capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
  body('total_rooms').isInt({ min: 1 }).withMessage('Total rooms must be at least 1'),
  body('amenities').optional().isArray(),
];

export const updateRoomValidator = [
  hotelIdParam,
  roomIdParam,
  body('room_type').optional().trim().notEmpty(),
  body('price_per_night').optional().isFloat({ min: 0 }),
  body('capacity').optional().isInt({ min: 1 }),
  body('total_rooms').optional().isInt({ min: 1 }),
  body('amenities').optional().isArray(),
];

export const roomIdsValidator = [hotelIdParam];

export const roomIdValidator = [hotelIdParam, roomIdParam];
