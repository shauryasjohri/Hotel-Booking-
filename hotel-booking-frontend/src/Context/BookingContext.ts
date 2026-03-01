import { createContext } from "react";
import type { Booking } from "./type";

export type BookingContextType = {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
};

export const BookingContext = createContext<BookingContextType | undefined>(undefined);