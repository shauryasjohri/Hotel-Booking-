import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";

const Rooms = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBookNow = () => {
    navigate(`/hotel/${id}/booking`);
  };

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Rooms</h2>
      <Separator className="bg-border/60" />
      <Card className="overflow-hidden rounded-2xl border-border/60 shadow-lg shadow-black/5 transition-all duration-300 hover:shadow-xl hover:shadow-black/10">
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground">Deluxe Room</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            2 Guests · 1 Bed
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t border-border/40 p-5">
          <p className="text-xl font-bold text-foreground">
            ₹4,500
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              / night
            </span>
          </p>
          <Button
            onClick={handleBookNow}
            className="rounded-xl transition-transform hover:scale-[1.02]"
          >
            Book Now
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Rooms;
