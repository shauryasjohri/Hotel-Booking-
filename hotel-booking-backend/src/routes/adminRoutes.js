import { Router } from 'express';
import { body, param } from 'express-validator';
import { protectRoute } from '../middleware/auth.js';
import { restrictTo } from '../middleware/rbac.js';
import { validate } from '../middleware/validate.js';
import { approveHotel, getPendingHotels, updateUserRole } from '../controllers/adminController.js';

const router = Router();

router.use(protectRoute);
router.use(restrictTo(['admin']));

router.get('/hotels/pending', getPendingHotels);
router.patch('/hotels/:id/approve', param('id').isUUID(), validate, approveHotel);
router.patch('/users/:id/role', param('id').isUUID(), body('role').isIn(['guest', 'owner', 'admin']), validate, updateUserRole);

export default router;
