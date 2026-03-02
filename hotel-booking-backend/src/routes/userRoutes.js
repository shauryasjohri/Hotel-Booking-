import { Router } from 'express';
import { protectRoute } from '../middleware/auth.js';
import { success } from '../utils/apiResponse.js';

const router = Router();

router.get('/me', protectRoute, (req, res) => {
  success(res, req.user);
});

export default router;
