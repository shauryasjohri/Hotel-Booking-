import { asyncHandler } from '../utils/asyncHandler.js';
import { success } from '../utils/apiResponse.js';
import { paymentService } from '../services/paymentService.js';

export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { booking_id } = req.body;
  const result = await paymentService.createPaymentIntent(booking_id, req.user.id);
  success(res, result);
});

export const handleWebhook = async (req, res) => {
  const signature = req.headers['stripe-signature'];
  let event;

  try {
    event = paymentService.constructWebhookEvent(req.body, signature);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await paymentService.handlePaymentSucceeded(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await paymentService.handlePaymentFailed(event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    res.json({ received: true });
  } catch (err) {
    console.error('Webhook handler error:', err);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
};
