import { ArrowUp, LayoutGrid, LayoutList } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { SortOption } from "../../types";

interface ToolbarProps<T extends string> {
  currentValue: T;
  onChange: (value: T) => void;
  sortAsc: boolean;
  totalCount: number;
  label?: string;
  unit?: string;
  options: SortOption<T>[];
  variant?: "standalone" | "embedded";
  viewMode?: "list" | "grid";
  onViewModeChange?: (mode: "list" | "grid") => void;
}

const Toolbar = <T extends string>({
  currentValue,
  onChange,
  sortAsc,
  totalCount,
  label = "Sort by",
  unit = "item",
  options,
  variant = "standalone",
  viewMode,
  onViewModeChange,
}: ToolbarProps<T>) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = options.findIndex((o) => o.value === currentValue);
    const activeButton = buttonsRef.current[activeIndex];

    if (activeButton) {
      setIndicatorStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  }, [currentValue, options]);

  const containerClasses =
    variant === "standalone"
      ? "px-4 md:px-9 py-[11px] flex items-center gap-2.5 bg-page border-b border-border transition-colors duration-200"
      : "flex items-center gap-2.5";

  return (
    <div className={containerClasses}>
      {label && (
        <span className="text-[11.5px] font-medium text-text-mid hidden md:inline">
          {label}
        </span>
      )}
      <div className="relative flex border-[1.5px] border-border rounded-lg overflow-hidden bg-card isolate">
        {/* Sliding effect*/}
        <div
          className="absolute top-0 bottom-0 bg-sidebar dark:bg-blue transition-all duration-300 ease-out z-0"
          style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        />

        {options.map((option, index) => {
          const isActive = currentValue === option.value;

          return (
            <button
              aria-label={`Sort by ${option.label}`}
              key={option.value}
              ref={(el) => {
                buttonsRef.current[index] = el;
              }}
              type="button"
              onClick={() => onChange(option.value)}
              className={`relative z-10 group px-2 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-colors duration-200
                ${index !== options.length - 1 ? "border-r-[1.5px] border-border" : ""} 
                ${
                  isActive
                    ? "text-white dark:text-white"
                    : "text-text-mid hover:text-text-primary hover:bg-page/50"
                }`}
            >
              {option.label}
              <ArrowUp
                className={`w-3 h-3 transition-all duration-300 ${
                  sortAsc ? "rotate-0" : "rotate-180"
                } ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
              />
            </button>
          );
        })}
      </div>

      {/* View Mode Toggle */}
      {onViewModeChange && (
        <div className="flex border-[1.5px] border-border rounded-lg overflow-hidden bg-card mr-2 md:mr-4">
          <button
            aria-label="List view"
            onClick={() => onViewModeChange("list")}
            className={`p-1.5 transition-colors ${
              viewMode === "list"
                ? "bg-sidebar dark:bg-blue text-white"
                : "text-text-mid hover:bg-page hover:text-text-primary"
            }`}
            title="List View"
          >
            <LayoutList className="w-4 h-4" />
          </button>
          <div className="w-[1.5px] bg-border" />
          <button
            aria-label="Grid view"
            onClick={() => onViewModeChange("grid")}
            className={`p-1.5 transition-colors ${
              viewMode === "grid"
                ? "bg-sidebar dark:bg-blue text-white"
                : "text-text-mid hover:bg-page hover:text-text-primary"
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="text-xs text-text-mid hidden sm:block">
        <strong className="text-text-primary font-semibold">
          {totalCount}
        </strong>{" "}
        {unit}
        {totalCount !== 1 ? "s" : ""}
      </div>
    </div>
  );
};

export default Toolbar;
