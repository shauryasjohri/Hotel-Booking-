import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

const GuestDetails = () => {
  return (
    <Card className="overflow-hidden rounded-2xl border-border/60 shadow-lg shadow-black/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/10">
      <CardHeader className="pb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Guest Details
        </h2>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="First Name"
              className="rounded-xl transition-colors focus-visible:ring-2"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Last Name"
              className="rounded-xl transition-colors focus-visible:ring-2"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email Address"
            className="rounded-xl transition-colors focus-visible:ring-2"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Phone Number"
            className="rounded-xl transition-colors focus-visible:ring-2"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GuestDetails;
