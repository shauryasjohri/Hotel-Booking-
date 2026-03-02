import { asyncHandler } from '../utils/asyncHandler.js';
import { success, created } from '../utils/apiResponse.js';
import { roomService } from '../services/roomService.js';

export const createRoom = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === 'admin';
  const room = await roomService.create(req.params.hotelId, req.user.id, req.body, isAdmin);
  created(res, room);
});

export const getRooms = asyncHandler(async (req, res) => {
  const rooms = await roomService.findByHotel(req.params.hotelId);
  success(res, rooms);
});

export const getRoomById = asyncHandler(async (req, res) => {
  const room = await roomService.findById(req.params.roomId, req.params.hotelId);
  success(res, room);
});

export const updateRoom = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === 'admin';
  const room = await roomService.update(req.params.roomId, req.params.hotelId, req.user.id, req.body, isAdmin);
  success(res, room);
});

export const deleteRoom = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === 'admin';
  await roomService.delete(req.params.roomId, req.params.hotelId, req.user.id, isAdmin);
  success(res, { message: 'Room deleted' });
});
