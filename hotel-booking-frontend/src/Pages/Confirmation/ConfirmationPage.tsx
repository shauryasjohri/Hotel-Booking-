import { motion } from "framer-motion";
import SuccessCard from "./Components/SuccessCard/SuccessCard";

const ConfirmationPage = () => {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.35,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="w-full max-w-md"
      >
        <SuccessCard />
      </motion.div>
    </div>
  );
};

export default ConfirmationPage;
