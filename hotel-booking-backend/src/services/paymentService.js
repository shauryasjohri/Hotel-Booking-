import Stripe from 'stripe';
import { config } from '../config/index.js';
import { supabase } from '../config/supabase.js';

const stripe = new Stripe(config.stripe.secretKey);

export const paymentService = {
  async createPaymentIntent(bookingId, userId) {
    const { data: booking, error } = await supabase
      .from('bookings')
      .select('*, room:rooms(price_per_night)')
      .eq('id', bookingId)
      .eq('user_id', userId)
      .eq('status', 'pending')
      .eq('payment_status', 'unpaid')
      .single();

    if (error || !booking) {
      const err = new Error('Booking not found or not eligible for payment');
      err.statusCode = 404;
      throw err;
    }

    const amount = Math.round(Number(booking.total_price) * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: { booking_id: bookingId, user_id: userId },
      automatic_payment_methods: { enabled: true },
    });

    await supabase
      .from('bookings')
      .update({ stripe_payment_intent_id: paymentIntent.id })
      .eq('id', bookingId);

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  },

  constructWebhookEvent(body, signature) {
    return stripe.webhooks.constructEvent(body, signature, config.stripe.webhookSecret);
  },

  async handlePaymentSucceeded(paymentIntent) {
    const { id, metadata, charges } = paymentIntent;
    const bookingId = metadata?.booking_id;
    const chargeId = charges?.data?.[0]?.id;
    const amount = paymentIntent.amount / 100;
    const currency = paymentIntent.currency;

    if (!bookingId) {
      console.warn('Payment intent missing booking_id in metadata:', id);
      return;
    }

    const { data: booking } = await supabase
      .from('bookings')
      .select('id, status')
      .eq('id', bookingId)
      .single();

    if (!booking) return;
    if (booking.status === 'confirmed') {
      console.log('Booking already confirmed, skipping:', bookingId);
      return;
    }

    await supabase.from('bookings').update({ status: 'confirmed', payment_status: 'paid' }).eq('id', bookingId);

    await supabase.from('transactions').insert({
      booking_id: bookingId,
      stripe_payment_intent_id: id,
      stripe_charge_id: chargeId,
      amount,
      currency,
      status: 'succeeded',
    });
  },

  async handlePaymentFailed(paymentIntent) {
    console.log('Payment failed:', paymentIntent.id, paymentIntent.last_payment_error?.message);
  },
};
