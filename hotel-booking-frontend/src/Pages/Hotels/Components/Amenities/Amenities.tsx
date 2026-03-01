import { Card, CardContent } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";

const amenities = [
  "Free WiFi",
  "Swimming Pool",
  "Parking",
  "Air Conditioning",
  "Restaurant",
];

const Amenities = () => {
  return (
    <Card className="overflow-hidden rounded-2xl border-border/60">
      <CardContent className="p-5">
        <ul className="flex flex-wrap gap-2">
          {amenities.map((item) => (
            <li key={item}>
              <Badge
                variant="secondary"
                className="rounded-lg px-3 py-1 font-normal transition-colors hover:bg-secondary/80"
              >
                {item}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Amenities;
