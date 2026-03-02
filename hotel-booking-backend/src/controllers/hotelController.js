import { asyncHandler } from '../utils/asyncHandler.js';
import { success, created } from '../utils/apiResponse.js';
import { hotelService } from '../services/hotelService.js';

export const createHotel = asyncHandler(async (req, res) => {
  const hotel = await hotelService.create(req.user.id, req.body);
  created(res, hotel);
});

export const getHotels = asyncHandler(async (req, res) => {
  const filters = {
    location: req.query.location,
    approved: req.query.approved === 'true' ? true : req.query.approved === 'false' ? false : req.user ? undefined : true,
    owner_id: req.user?.role === 'owner' ? req.user.id : req.query.owner_id,
  };
  const hotels = await hotelService.findAll(filters);
  success(res, hotels);
});

export const getHotelById = asyncHandler(async (req, res) => {
  const hotel = await hotelService.findById(req.params.id);
  success(res, hotel);
});

export const updateHotel = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === 'admin';
  const hotel = await hotelService.update(req.params.id, req.user.id, req.body, isAdmin);
  success(res, hotel);
});

export const deleteHotel = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === 'admin';
  await hotelService.delete(req.params.id, req.user.id, isAdmin);
  success(res, { message: 'Hotel deleted' });
});
