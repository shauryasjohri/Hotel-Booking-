-- Hotel Booking Schema - Tier 1
-- Run this in Supabase SQL Editor or via supabase migration

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User roles
CREATE TYPE user_role AS ENUM ('guest', 'owner', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('unpaid', 'paid', 'refunded');

-- users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id TEXT UNIQUE NOT NULL,
  name TEXT,
  email TEXT,
  role user_role NOT NULL DEFAULT 'guest',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_clerk_id ON users(clerk_id);

-- hotels
CREATE TABLE hotels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  amenities TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating NUMERIC(3,2) DEFAULT 0,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_hotels_location ON hotels(location);
CREATE INDEX idx_hotels_owner_id ON hotels(owner_id);

-- rooms
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  room_type TEXT NOT NULL,
  price_per_night NUMERIC(12,2) NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 1,
  total_rooms INTEGER NOT NULL DEFAULT 1,
  amenities TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_rooms_hotel_id ON rooms(hotel_id);

-- bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL DEFAULT 1,
  total_price NUMERIC(12,2) NOT NULL,
  status booking_status NOT NULL DEFAULT 'pending',
  payment_status payment_status NOT NULL DEFAULT 'unpaid',
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bookings_room_id ON bookings(room_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_dates ON bookings(check_in, check_out);

-- transactions
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT NOT NULL,
  stripe_charge_id TEXT,
  amount NUMERIC(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_transactions_stripe_pi ON transactions(stripe_payment_intent_id);

-- Atomic booking creation function (prevents overbooking)
CREATE OR REPLACE FUNCTION create_booking_atomic(
  p_user_id UUID,
  p_hotel_id UUID,
  p_room_id UUID,
  p_check_in DATE,
  p_check_out DATE,
  p_guests INTEGER,
  p_total_price NUMERIC
)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  v_room RECORD;
  v_overlapping INTEGER;
  v_booking_id UUID;
BEGIN
  -- Lock room row for update
  SELECT * INTO v_room
  FROM rooms
  WHERE id = p_room_id AND hotel_id = p_hotel_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Room not found';
  END IF;

  -- Count overlapping confirmed bookings
  SELECT COUNT(*) INTO v_overlapping
  FROM bookings
  WHERE room_id = p_room_id
    AND status = 'confirmed'
    AND check_in < p_check_out
    AND check_out > p_check_in;

  IF v_overlapping >= v_room.total_rooms THEN
    RAISE EXCEPTION 'No availability for selected dates';
  END IF;

  -- Insert booking
  INSERT INTO bookings (user_id, hotel_id, room_id, check_in, check_out, guests, total_price, status, payment_status)
  VALUES (p_user_id, p_hotel_id, p_room_id, p_check_in, p_check_out, COALESCE(p_guests, 1), p_total_price, 'pending', 'unpaid')
  RETURNING id INTO v_booking_id;

  RETURN v_booking_id;
END;
$$;
