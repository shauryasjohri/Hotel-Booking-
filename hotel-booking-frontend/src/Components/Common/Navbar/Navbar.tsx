import { Button } from "@/Components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border/40 bg-background/80 px-4 py-3 shadow-sm shadow-black/5 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="font-semibold tracking-tight text-foreground text-lg sm:text-xl">
        StayFinder
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <Button variant="ghost" className="rounded-xl transition-smooth hover:scale-[1.02]">
          Login
        </Button>
        <Button className="rounded-xl shadow-sm transition-smooth hover:scale-[1.02]">
          Register
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
