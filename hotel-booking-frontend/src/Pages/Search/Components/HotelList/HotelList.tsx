import HotelCard from "./HotelCard";

const hotels = [
  { id: 1, name: "Grand Palace", price: 120, rating: 4.5 },
  { id: 2, name: "Ocean View Resort", price: 200, rating: 4.8 },
  { id: 3, name: "City Lights Hotel", price: 90, rating: 4.2 },
];

const HotelList = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
};

export default HotelList;
