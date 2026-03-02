import { Router } from 'express';
import { protectRoute } from '../middleware/auth.js';
import { restrictTo } from '../middleware/rbac.js';
import { validate } from '../middleware/validate.js';
import { createBookingValidator, bookingIdValidator } from '../validators/bookingValidators.js';
import { createBooking, getBookingById, getMyBookings } from '../controllers/bookingController.js';

const router = Router();

router.use(protectRoute);
router.use(restrictTo(['guest', 'owner', 'admin']));

router.post('/', createBookingValidator, validate, createBooking);
router.get('/my', getMyBookings);
router.get('/:id', bookingIdValidator, validate, getBookingById);

export default router;
