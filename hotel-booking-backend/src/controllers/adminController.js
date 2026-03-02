import { asyncHandler } from '../utils/asyncHandler.js';
import { success } from '../utils/apiResponse.js';
import { supabase } from '../config/supabase.js';

export const approveHotel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('hotels').update({ is_approved: true }).eq('id', id).select().single();

  if (error) throw error;
  if (!data) {
    const err = new Error('Hotel not found');
    err.statusCode = 404;
    throw err;
  }
  success(res, data);
});

export const getPendingHotels = asyncHandler(async (req, res) => {
  const { data, error } = await supabase.from('hotels').select('*').eq('is_approved', false);

  if (error) throw error;
  success(res, data || []);
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['guest', 'owner', 'admin'].includes(role)) {
    const err = new Error('Invalid role');
    err.statusCode = 400;
    throw err;
  }

  const { data, error } = await supabase.from('users').update({ role }).eq('id', id).select().single();

  if (error) throw error;
  if (!data) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }
  success(res, data);
});
