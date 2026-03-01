import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Star } from "lucide-react";

type Hotel = {
  id: number;
  name: string;
  price: number;
  rating: number;
};

type Props = {
  hotel: Hotel;
};

const HotelCard = ({ hotel }: Props) => {
  return (
    <Card className="group overflow-hidden rounded-2xl border-border/60 bg-card shadow-lg shadow-black/5 transition-smooth hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-xl hover:shadow-black/10">
      <div className="aspect-4/3 bg-muted/50" />
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
            {hotel.name}
          </h3>
          <Badge
            variant="secondary"
            className="shrink-0 gap-1 rounded-lg font-medium"
          >
            <Star className="h-3.5 w-3.5 fill-current" />
            {hotel.rating}
          </Badge>
        </div>
        <p className="mt-3 text-2xl font-bold tracking-tight text-foreground">
          ₹{hotel.price}
          <span className="ml-1 text-sm font-normal text-muted-foreground">
            / night
          </span>
        </p>
      </CardContent>
      <CardFooter className="border-t border-border/40 p-5 pt-0">
        <Button
          asChild
          variant="outline"
          className="w-full rounded-xl transition-smooth hover:scale-[1.02]"
        >
          <Link to={`/hotel/${hotel.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HotelCard;
