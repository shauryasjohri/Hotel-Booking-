const Filters = () => {
  return (
    <div className="mt-4 space-y-5">
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">
          Max Price
        </label>
        <input
          type="range"
          min="50"
          max="500"
          className="w-full accent-primary"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">
          Rating
        </label>
        <select className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <option>Any</option>
          <option>4+</option>
          <option>3+</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
