import { Router } from 'express';
import { protectRoute } from '../middleware/auth.js';
import { restrictTo } from '../middleware/rbac.js';
import { validate } from '../middleware/validate.js';
import {
  createHotelValidator,
  updateHotelValidator,
  hotelIdValidator,
} from '../validators/hotelValidators.js';
import {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} from '../controllers/hotelController.js';

const router = Router();

router.get('/', getHotels);
router.get('/:id', hotelIdValidator, validate, getHotelById);

router.use(protectRoute);

router.post('/', restrictTo(['owner', 'admin']), createHotelValidator, validate, createHotel);
router.patch('/:id', restrictTo(['owner', 'admin']), updateHotelValidator, validate, updateHotel);
router.delete('/:id', restrictTo(['owner', 'admin']), hotelIdValidator, validate, deleteHotel);

export default router;
