import { Search, X } from "lucide-react";

const SearchInput = ({
  placeholder,
  searchQuery,
  onSearch,
}: {
  placeholder: string;
  searchQuery: string;
  onSearch: (query: string) => void;
}) => {
  return (
    <div className="relative w-full md:w-[260px] shrink-0">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-text-mid pointer-events-none z-10" />
      <input
        type="text"
        className="w-full pl-[36px] pr-9 py-2.5 border-[1.5px] border-border rounded-lg text-[13px] text-text-primary bg-page transition-all focus:border-blue focus:border-[1px] focus:bg-card focus:ring-4 focus:ring-blue-dim placeholder:text-text-light outline-none"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
      />
      {searchQuery && (
        <button
          onClick={() => onSearch("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-light hover:text-text-primary p-0.5"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
