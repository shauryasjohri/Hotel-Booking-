import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchSummary from "./Components/SearchSummary/SearchSummary";
import Filters from "./Components/Filters/Filters";
import HotelList from "./Components/HotelList/HotelList";
import { Button } from "@/Components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Skeleton } from "@/Components/ui/skeleton";
import { SlidersHorizontal } from "lucide-react";

const SearchResultsPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <SearchSummary />
        </motion.div>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:gap-6">
          {/* Desktop: sidebar filters */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-24 rounded-2xl border border-border/60 bg-card p-5 shadow-lg shadow-black/5">
              <h4 className="text-sm font-semibold text-foreground">Filters</h4>
              <Filters />
            </div>
          </aside>

          {/* Mobile: filters in sheet */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="mb-4 w-full rounded-xl gap-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85%] max-w-sm overflow-y-auto">
                <h4 className="mb-4 text-sm font-semibold text-foreground">Filters</h4>
                <Filters />
              </SheetContent>
            </Sheet>
          </div>

          {/* Main: hotel list */}
          <div className="min-w-0 flex-1">
            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <HotelList />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
      <Skeleton className="aspect-4/3 w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-5 w-3/4" />
        <div className="flex justify-between gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-9 w-full rounded-xl" />
      </div>
    </div>
  );
}

export default SearchResultsPage;
