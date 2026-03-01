import { Card, CardContent } from "@/Components/ui/card";

const reviews = [
  { author: "Aman", text: "Great location and excellent service." },
  { author: "Riya", text: "Rooms were clean and spacious." },
];

const Reviews = () => {
  return (
    <Card className="overflow-hidden rounded-2xl border-border/60">
      <CardContent className="divide-y divide-border/40 p-0">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="p-5 transition-colors hover:bg-muted/30"
          >
            <strong className="text-foreground">{review.author}</strong>
            <p className="mt-1 text-sm text-muted-foreground">{review.text}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Reviews;
