import { supabase } from '../config/supabase.js';

export const bookingService = {
  async create(userId, { hotel_id, room_id, check_in, check_out, guests = 1 }) {
    const checkIn = new Date(check_in);
    const checkOut = new Date(check_out);

    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .select('*, hotel:hotels(id)')
      .eq('id', room_id)
      .eq('hotel_id', hotel_id)
      .single();

    if (roomError || !room) {
      throw new Error('Room not found');
    }

    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalPrice = Number(room.price_per_night) * nights;

    const { data: bookingId, error } = await supabase.rpc('create_booking_atomic', {
      p_user_id: userId,
      p_hotel_id: hotel_id,
      p_room_id: room_id,
      p_check_in: check_in,
      p_check_out: check_out,
      p_guests: guests,
      p_total_price: totalPrice,
    });

    if (error) {
      if (error.message?.includes('No availability')) {
        const err = new Error('No availability for selected dates');
        err.statusCode = 409;
        throw err;
      }
      throw error;
    }

    const { data: booking } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single();

    return booking;
  },

  async findById(id, userId, isAdmin = false) {
    let query = supabase.from('bookings').select('*, room:rooms(*), hotel:hotels(*), user:users(id, name, email)').eq('id', id);

    if (!isAdmin) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query.single();

    if (error || !data) {
      const err = new Error('Booking not found');
      err.statusCode = 404;
      throw err;
    }
    return data;
  },

  async findByUser(userId) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, room:rooms(*), hotel:hotels(name, location)')
      .eq('user_id', userId)
      .order('check_in', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updatePaymentIntent(bookingId, stripePaymentIntentId) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ stripe_payment_intent_id: stripePaymentIntentId })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async confirmPayment(bookingId, stripePaymentIntentId, stripeChargeId, amount, currency) {
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .eq('stripe_payment_intent_id', stripePaymentIntentId)
      .eq('status', 'pending')
      .single();

    if (fetchError || !booking) {
      return null;
    }

    const { error: updateError } = await supabase
      .from('bookings')
      .update({ status: 'confirmed', payment_status: 'paid' })
      .eq('id', bookingId);

    if (updateError) throw updateError;

    await supabase.from('transactions').insert({
      booking_id: bookingId,
      stripe_payment_intent_id: stripePaymentIntentId,
      stripe_charge_id: stripeChargeId,
      amount,
      currency,
      status: 'succeeded',
    });

    return booking;
  },
};
