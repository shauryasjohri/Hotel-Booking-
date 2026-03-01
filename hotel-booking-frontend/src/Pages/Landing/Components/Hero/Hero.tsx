const Hero = () => {
  return (
    <section className="relative flex min-h-[55vh] flex-col items-center justify-center overflow-hidden rounded-b-4xl bg-linear-to-br from-primary/90 via-primary to-primary/80 px-4 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-primary-foreground drop-shadow-sm sm:text-5xl md:text-6xl">
          Find your perfect stay
        </h1>
        <p className="mt-4 text-lg text-primary-foreground/90 sm:text-xl">
          Hotels, resorts and stays at the best prices
        </p>
      </div>
    </section>
  );
};

export default Hero;
