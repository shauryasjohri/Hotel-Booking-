import { supabase } from '../config/supabase.js';

export const roomService = {
  async create(hotelId, ownerId, data, isAdmin = false) {
    if (!isAdmin) {
      const isOwner = await this.isHotelOwner(hotelId, ownerId);
      if (!isOwner) throw new Error('Forbidden - not hotel owner');
    }

    const { data: room, error } = await supabase
      .from('rooms')
      .insert({
        hotel_id: hotelId,
        ...data,
      })
      .select()
      .single();

    if (error) throw error;
    return room;
  },

  async findByHotel(hotelId) {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('hotel_id', hotelId)
      .order('price_per_night');

    if (error) throw error;
    return data;
  },

  async findById(roomId, hotelId) {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', roomId)
      .eq('hotel_id', hotelId)
      .single();

    if (error) throw error;
    return data;
  },

  async update(roomId, hotelId, ownerId, updates, isAdmin = false) {
    if (!isAdmin) {
      const isOwner = await this.isHotelOwner(hotelId, ownerId);
      if (!isOwner) throw new Error('Forbidden - not hotel owner');
    }

    const { data, error } = await supabase
      .from('rooms')
      .update(updates)
      .eq('id', roomId)
      .eq('hotel_id', hotelId)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Room not found');
    return data;
  },

  async delete(roomId, hotelId, ownerId, isAdmin = false) {
    if (!isAdmin) {
      const isOwner = await this.isHotelOwner(hotelId, ownerId);
      if (!isOwner) throw new Error('Forbidden - not hotel owner');
    }

    const { error } = await supabase
      .from('rooms')
      .delete()
      .eq('id', roomId)
      .eq('hotel_id', hotelId);

    if (error) throw error;
  },

  async isHotelOwner(hotelId, userId) {
    const { data } = await supabase
      .from('hotels')
      .select('id')
      .eq('id', hotelId)
      .eq('owner_id', userId)
      .single();

    return !!data;
  },
};
