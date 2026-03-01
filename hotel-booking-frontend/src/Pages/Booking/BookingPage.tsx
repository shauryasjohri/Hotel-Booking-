import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import GuestDetails from "./Components/GuestDetails/GuestDetails";
import BookingSummary from "./Components/BookingSummary/BookingSummary";
import Payment from "./Components/Payment/Payment";

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Complete your booking
          </h1>
          <p className="mt-1 text-muted-foreground">
            Booking for Hotel ID: {id}
          </p>
        </motion.header>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          {/* Left: form */}
          <div className="min-w-0 flex-1 space-y-6">
            <div className="transition-all duration-300">
              <GuestDetails />
            </div>
            <div className="transition-all duration-300">
              <Payment />
            </div>
          </div>

          {/* Right: sticky summary */}
          <aside className="lg:w-90lg:shrink-0">
            <div className="transition-all duration-300 lg:sticky lg:top-24">
              <BookingSummary />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
