import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Gallery from "./Components/Gallery/Gallery";
import HotelInfo from "./Components/HotelInfo/HotelInfo";
import Rooms from "./Components/Rooms/Rooms";
import Amenities from "./Components/Amenities/Amenities";
import Reviews from "./Components/Reviews/Reviews";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

const HotelDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (id) navigate(`/hotel/${id}/booking`);
  };

  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          {/* Main content */}
          <div className="min-w-0 flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Gallery />
            </motion.div>
            <HotelInfo />

            <Tabs defaultValue="amenities" className="w-full">
              <TabsList className="w-full justify-start rounded-xl bg-muted/60 p-1">
                <TabsTrigger value="amenities" className="rounded-lg px-4">
                  Amenities
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-lg px-4">
                  Reviews
                </TabsTrigger>
              </TabsList>
              <TabsContent value="amenities" className="mt-4">
                <Amenities />
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <Reviews />
              </TabsContent>
            </Tabs>

            <Rooms />
          </div>

          {/* Sticky booking summary */}
          <aside className="lg:w-[340px] lg:shrink-0">
            <div className="lg:sticky lg:top-24">
              <Card className="overflow-hidden rounded-2xl border-border/60 shadow-xl shadow-black/5">
                <CardHeader className="pb-2">
                  <h3 className="font-semibold text-foreground">
                    Booking summary
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-2xl font-bold tracking-tight text-foreground">
                    ₹4,500
                    <span className="ml-1 text-sm font-normal text-muted-foreground">
                      / night
                    </span>
                  </p>
                  <Button
                    onClick={handleBookNow}
                    size="lg"
                    className="w-full rounded-xl transition-smooth hover:scale-[1.02]"
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsPage;
