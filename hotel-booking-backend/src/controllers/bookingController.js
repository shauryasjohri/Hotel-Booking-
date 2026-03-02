import { asyncHandler } from '../utils/asyncHandler.js';
import { success, created } from '../utils/apiResponse.js';
import { bookingService } from '../services/bookingService.js';

export const createBooking = asyncHandler(async (req, res) => {
  const payload = {
    hotel_id: req.body.hotel_id,
    room_id: req.body.room_id,
    check_in: req.body.check_in,
    check_out: req.body.check_out,
    guests: req.body.guests ?? 1,
  };
  const booking = await bookingService.create(req.user.id, payload);
  created(res, booking);
});

export const getBookingById = asyncHandler(async (req, res) => {
  const isAdmin = req.user?.role === 'admin';
  const booking = await bookingService.findById(req.params.id, req.user.id, isAdmin);
  success(res, booking);
});

export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await bookingService.findByUser(req.user.id);
  success(res, bookings);
});
