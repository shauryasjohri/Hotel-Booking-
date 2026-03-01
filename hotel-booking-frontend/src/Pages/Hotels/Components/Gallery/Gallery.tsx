const Gallery = () => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 sm:gap-3">
      <div className="overflow-hidden rounded-2xl sm:col-span-2 sm:row-span-2">
        <img
          className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105 sm:h-[360px]"
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
          alt="Hotel main"
        />
      </div>
      <div className="overflow-hidden rounded-2xl">
        <img
          className="h-40 w-full object-cover transition-transform duration-300 hover:scale-105 sm:h-[176px]"
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
          alt="Hotel view"
        />
      </div>
      <div className="overflow-hidden rounded-2xl">
        <img
          className="h-40 w-full object-cover transition-transform duration-300 hover:scale-105 sm:h-[176px]"
          src="https://images.unsplash.com/photo-1560448075-bb4f5e7f91c5"
          alt="Hotel room"
        />
      </div>
      <div className="overflow-hidden rounded-2xl sm:col-span-2">
        <img
          className="h-40 w-full object-cover transition-transform duration-300 hover:scale-105 sm:h-[176px]"
          src="https://images.unsplash.com/photo-1501117716987-c8e1ecb210d7"
          alt="Hotel amenity"
        />
      </div>
    </div>
  );
};

export default Gallery;
