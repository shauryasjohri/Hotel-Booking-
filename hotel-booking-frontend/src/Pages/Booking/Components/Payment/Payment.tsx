import { useNavigate } from "react-router-dom";
import { useBooking } from "../../../../Context/useBooking";
import { Button } from "@/Components/ui/button";

const Payment = () => {
  const navigate = useNavigate();
  const { addBooking } = useBooking();

  const handlePayment = () => {
    addBooking({
      id: `BK-${Date.now()}`,
      hotel: "Taj Palace",
      dates: "20 Feb – 22 Feb",
      guests: 2,
      status: "Upcoming"
    });

    navigate("/booking/confirmation");
  };

  return (
    <Button
      size="lg"
      onClick={handlePayment}
      className="w-full rounded-xl shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
    >
      Pay & Confirm
    </Button>
  );
};

export default Payment;
