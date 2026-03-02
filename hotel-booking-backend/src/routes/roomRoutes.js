import { Router } from 'express';
import { protectRoute } from '../middleware/auth.js';
import { restrictTo } from '../middleware/rbac.js';
import { validate } from '../middleware/validate.js';
import {
  createRoomValidator,
  updateRoomValidator,
  roomIdsValidator,
  roomIdValidator,
} from '../validators/roomValidators.js';
import {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} from '../controllers/roomController.js';

const router = Router({ mergeParams: true });

router.get('/', roomIdsValidator, validate, getRooms);
router.get('/:roomId', roomIdValidator, validate, getRoomById);

router.use(protectRoute);
router.use(restrictTo(['owner', 'admin']));

router.post('/', createRoomValidator, validate, createRoom);
router.patch('/:roomId', updateRoomValidator, validate, updateRoom);
router.delete('/:roomId', roomIdValidator, validate, deleteRoom);

export default router;
