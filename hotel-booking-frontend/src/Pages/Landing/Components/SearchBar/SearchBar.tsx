import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";

const SearchBar = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    navigate(
      `/search?location=${location}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
  };

  return (
    <div className="relative z-10 mx-auto -mt-8 max-w-4xl px-4 sm:px-6">
      <Card className="overflow-hidden rounded-2xl border-border/50 bg-background/80 shadow-xl shadow-black/5 backdrop-blur-xl dark:bg-background/90">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-3">
            <div className="flex-1 space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Location
              </label>
              <Input
                placeholder="Where are you going?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-xl border-border/60 bg-background/50"
              />
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Check-in
              </label>
              <Input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="rounded-xl border-border/60 bg-background/50"
              />
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Check-out
              </label>
              <Input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="rounded-xl border-border/60 bg-background/50"
              />
            </div>
            <div className="w-full space-y-2 sm:w-28">
              <label className="text-xs font-medium text-muted-foreground">
                Guests
              </label>
              <Input
                type="number"
                min={1}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="rounded-xl border-border/60 bg-background/50"
              />
            </div>
            <Button
              onClick={handleSearch}
              size="lg"
              className="shrink-0 rounded-xl px-6 shadow-md"
            >
              Search
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchBar;
