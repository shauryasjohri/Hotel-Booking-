import type { Booking } from "../../../../Context/type";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../Components/ui/card";
import { Badge } from "../../../../Components/ui/badge";

const BookingCard = ({ booking }: { booking: Booking }) => {
  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "default";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">{booking.hotel}</CardTitle>
        <Badge variant={getStatusVariant(booking.status)}>
          {booking.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-sm">
          <span className="font-medium text-foreground">Dates:</span>
          <p className="text-muted-foreground">{booking.dates}</p>
        </div>
        <div className="text-sm">
          <span className="font-medium text-foreground">Guests:</span>
          <p className="text-muted-foreground">{booking.guests}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
