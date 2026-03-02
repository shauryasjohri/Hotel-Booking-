import { supabase } from '../config/supabase.js';

export const hotelService = {
  async create(ownerId, data) {
    const { data: hotel, error } = await supabase
      .from('hotels')
      .insert({
        ...data,
        owner_id: ownerId,
      })
      .select()
      .single();

    if (error) throw error;
    return hotel;
  },

  async findAll(filters = {}) {
    let query = supabase.from('hotels').select('*, rooms(*)');

    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }
    if (filters.approved !== undefined) {
      query = query.eq('is_approved', filters.approved);
    }
    if (filters.owner_id) {
      query = query.eq('owner_id', filters.owner_id);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async findById(id) {
    const { data, error } = await supabase
      .from('hotels')
      .select('*, rooms(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async update(id, ownerId, updates, isAdmin = false) {
    let query = supabase.from('hotels').update(updates).eq('id', id);
    if (!isAdmin) query = query.eq('owner_id', ownerId);
    const { data, error } = await query.select().single();

    if (error) throw error;
    if (!data) throw new Error('Hotel not found or access denied');
    return data;
  },

  async delete(id, ownerId, isAdmin = false) {
    let query = supabase.from('hotels').delete().eq('id', id);
    if (!isAdmin) query = query.eq('owner_id', ownerId);
    const { error } = await query;

    if (error) throw error;
  },

  async isOwner(hotelId, userId) {
    const { data, error } = await supabase
      .from('hotels')
      .select('id')
      .eq('id', hotelId)
      .eq('owner_id', userId)
      .single();

    if (error || !data) return false;
    return true;
  },
};
