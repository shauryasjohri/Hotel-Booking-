import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";

const BookingSummary = () => {
  return (
    <Card className="overflow-hidden rounded-2xl border-border/60 shadow-xl shadow-black/5 transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="pb-3">
        <h2 className="text-lg font-semibold text-foreground">
          Booking Summary
        </h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <p className="flex justify-between text-foreground">
            <span className="text-muted-foreground">Hotel</span>
            <span className="font-medium">Grand Palace</span>
          </p>
          <p className="flex justify-between text-foreground">
            <span className="text-muted-foreground">Room</span>
            <span className="font-medium">Deluxe Room</span>
          </p>
          <p className="flex justify-between text-foreground">
            <span className="text-muted-foreground">Nights</span>
            <span className="font-medium">2</span>
          </p>
        </div>
        <Separator className="bg-border/60" />
        <p className="flex justify-between text-lg font-bold text-foreground">
          <span>Total</span>
          <span>₹9,000</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;
