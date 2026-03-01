import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";

const hotels = [
  { id: 1, name: "Grand Palace", price: 120 },
  { id: 2, name: "Ocean View Resort", price: 180 },
  { id: 3, name: "City Lights Hotel", price: 90 },
];

const FeaturedHotels = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Featured Hotels
        </h2>
        <p className="mt-1 text-muted-foreground">
          Handpicked stays for your next trip
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel) => (
          <Card
            key={hotel.id}
            className="overflow-hidden rounded-2xl border-border/60 bg-card shadow-lg shadow-black/5 transition-smooth hover:scale-[1.02] hover:shadow-xl hover:shadow-black/10"
          >
            <div className="aspect-4/3 bg-muted/50" />
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground">{hotel.name}</h3>
                <Badge variant="secondary" className="shrink-0 rounded-lg">
                  From ₹{hotel.price}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                per night
              </p>
            </CardContent>
            <CardFooter className="border-t border-border/40 p-5 pt-0">
              <Button
                variant="outline"
                className="w-full rounded-xl transition-smooth hover:scale-[1.02]"
                onClick={() => navigate(`/hotel/${hotel.id}`)}
              >
                View details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedHotels;
