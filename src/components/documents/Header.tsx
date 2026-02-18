import React from "react";
import { ChevronRight } from "lucide-react";
import Toolbar from "../ui/Toolbar";
import SearchInput from "../ui/SearchInput";

interface HeaderProps {
  breadcrumbs: { name: string; id: string }[];
  onNavigate: (folderId: string | null) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
  sortBy: "name" | "date";
  sortAsc: boolean;
  setSortBy: (sort: "name" | "date") => void;
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
  totalItems: number;
}

export const Header: React.FC<HeaderProps> = ({
  breadcrumbs,
  onNavigate,
  searchQuery,
  onSearch,
  sortBy,
  sortAsc,
  setSortBy,
  viewMode,
  setViewMode,
  totalItems,
}) => {
  return (
    <div className="bg-page/50 backdrop-blur-md border-b border-border px-4 md:px-9 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-200">
      {/* Left Side: Breadcrumbs */}
      <nav
        data-testid="breadcrumb-nav"
        aria-label="Breadcrumbs"
        className="flex items-center text-xs flex-wrap gap-1 min-w-0 w-full md:w-auto"
      >
        <span
          className={`cursor-pointer transition-colors ${
            breadcrumbs.length === 0
              ? "text-text-mid font-medium"
              : "text-text-mid hover:text-blue-light"
          }`}
          onClick={() => onNavigate(null)}
        >
          All Files
        </span>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.id || index}>
            <ChevronRight className="w-3 h-3 text-text-mid opacity-40 shrink-0" />
            <span
              className={`transition-colors truncate max-w-[120px] ${
                index === breadcrumbs.length - 1
                  ? "text-text-mid font-medium cursor-default"
                  : "text-text-light hover:text-blue-light cursor-pointer"
              }`}
              onClick={() =>
                index < breadcrumbs.length - 1 && onNavigate(crumb.id)
              }
            >
              {crumb.name}
            </span>
          </React.Fragment>
        ))}
      </nav>

      {/* Right Side: Toolbar, Search, and Count */}
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 shrink-0 w-full md:w-auto">
        <SearchInput
          placeholder="Search files…"
          searchQuery={searchQuery}
          onSearch={onSearch}
        />

        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <Toolbar
            currentValue={sortBy}
            sortAsc={sortAsc}
            onChange={setSortBy}
            totalCount={totalItems}
            options={[
              { label: "Name", value: "name" },
              { label: "Date", value: "date" },
            ]}
            variant="embedded"
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>
      </div>
    </div>
  );
};
