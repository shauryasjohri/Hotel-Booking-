import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border/40 bg-background/80 px-4 py-3 shadow-sm shadow-black/5 backdrop-blur-md sm:px-6 lg:px-8">
      <div
        className="font-semibold tracking-tight text-foreground text-lg sm:text-xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        StayFinder
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          variant="ghost"
          className="rounded-xl transition-smooth hover:scale-[1.02]"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>

        <Button
          className="rounded-xl shadow-sm transition-smooth hover:scale-[1.02]"
          onClick={() => navigate("/signup")}
        >
          Register
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;