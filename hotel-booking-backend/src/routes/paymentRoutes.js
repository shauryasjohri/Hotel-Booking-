import { Router } from 'express';
import { protectRoute } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createIntentValidator } from '../validators/paymentValidators.js';
import { createPaymentIntent } from '../controllers/paymentController.js';

const router = Router();

router.post('/create-intent', protectRoute, createIntentValidator, validate, createPaymentIntent);

export default router;
