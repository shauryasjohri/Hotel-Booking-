import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { CheckCircle } from "lucide-react";

const SuccessCard = () => {
  return (
    <Card className="w-full max-w-md overflow-hidden rounded-2xl border-border/50 bg-card shadow-2xl shadow-black/10 transition-smooth hover:shadow-black/15">
      <CardHeader className="pb-2 pt-8 text-center">
        <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle className="size-14" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Booking Confirmed
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your reservation has been successfully completed.
        </p>
      </CardHeader>
      <CardContent className="space-y-4 px-8 pb-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Booking ID
          </span>
          <Badge
            variant="secondary"
            className="rounded-lg px-4 py-2 text-base font-mono font-semibold tracking-wide shadow-sm"
          >
            BK123456
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 border-t border-border/40 bg-muted/20 px-8 py-6 sm:flex-row">
        <Button asChild size="lg" className="w-full rounded-xl font-medium transition-smooth hover:scale-[1.02]">
          <Link to="/my-bookings">Go to My Bookings</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full rounded-xl font-medium transition-smooth hover:scale-[1.02]"
        >
          <Link to="/">Back to Home</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SuccessCard;
