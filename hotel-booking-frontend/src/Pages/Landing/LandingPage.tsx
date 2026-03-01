import { motion } from "framer-motion";
import Navbar from "../../Components/Common/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import SearchBar from "./Components/SearchBar/SearchBar";
import FeaturedHotels from "./Components/FeaturedHotels/FeaturedHotels";
import FadeInSection from "../../Components/Common/FadeInSection/FadeInSection";

const LandingPage = () => {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <Navbar />
      <main>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Hero />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <SearchBar />
        </motion.div>
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <FadeInSection delay={0.1}>
            <FeaturedHotels />
          </FadeInSection>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
