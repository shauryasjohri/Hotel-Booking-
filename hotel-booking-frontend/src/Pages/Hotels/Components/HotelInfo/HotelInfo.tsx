import { Separator } from "@/Components/ui/separator";
import { Badge } from "@/Components/ui/badge";
import { Star } from "lucide-react";

const HotelInfo = () => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Grand Palace Hotel
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="gap-1 rounded-lg font-medium">
            <Star className="h-3.5 w-3.5 fill-current" />
            4.6
          </Badge>
          <span className="text-sm text-muted-foreground">
            1,245 reviews
          </span>
        </div>
      </div>
      <Separator className="bg-border/60" />
      <p className="text-muted-foreground leading-relaxed">
        Located in the heart of the city, Grand Palace offers luxury rooms,
        world-class service, and premium amenities.
      </p>
    </div>
  );
};

export default HotelInfo;
