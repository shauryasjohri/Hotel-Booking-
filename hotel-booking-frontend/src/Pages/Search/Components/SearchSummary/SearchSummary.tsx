import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/Components/ui/card";

const SearchSummary = () => {
  const [params] = useSearchParams();

  const location = params.get("location");
  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");
  const guests = params.get("guests");

  return (
    <Card className="overflow-hidden rounded-2xl border-border/60 bg-card shadow-md shadow-black/5">
      <CardContent className="p-5">
        <h3 className="font-semibold text-foreground">
          {location || "Location"} · {guests || 1} Guests
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {checkIn} – {checkOut}
        </p>
      </CardContent>
    </Card>
  );
};

export default SearchSummary;
