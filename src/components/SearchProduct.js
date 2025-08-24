import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

export const SearchProduct = ({
  onSearch,
  placeholder = "Search products...",
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-sm mt-4 px-4 py-3 border border-gray-200 rounded-lg shadow-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-10 w-full border-0 focus:ring-0 focus:outline-none"
      />
      {query && (
        <button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};

export default SearchProduct;
