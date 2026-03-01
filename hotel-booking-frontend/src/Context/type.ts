export interface Booking {
  id: string;
  hotel: string;
  dates: string;
  guests: number;
  status: "Upcoming" | "Cancelled" | "Completed";
}