import React, { useState, useRef } from "react";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import type { FileListProps } from "../../types";
import { FileRow } from "./FileRow";
import { FileGridItem } from "./FileGridItem";

export const FileList: React.FC<FileListProps> = ({
  items,
  onNavigate,
  onPreview,
  viewMode = "list",
}) => {
  const [limit, setLimit] = useState(10);
  const [isLoadinggMore, setIsLoadingMore] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(),
  );

  const listTopRef = useRef<HTMLDivElement>(null);

  const visibleItems = items.slice(0, limit);
  const hasMore = items.length > limit;
  const isFiltered = items.length < 10;

  // function to expand and collapse folders
  const toggleExpand = (itemId: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  };

  const handleShowMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setLimit((prev) => prev + 10);
      setIsLoadingMore(false);
      window.scrollBy({ top: 150, behavior: "smooth" });
    }, 600);
  };

  const handleShowLess = () => {
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => setLimit(10), 400);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-border rounded-2xl flex items-center justify-center mb-4">
          <span className="text-3xl">📂</span>
        </div>
        <h3 className="font-sans text-lg text-text-mid mb-1">
          No results found
        </h3>
        <p className="text-sm text-text-light">Try a different search term</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 pb-10 mb-6 md:mb-0">
      <div ref={listTopRef} className="scroll-mt-24" />

      <div
        className={`${
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4"
            : "flex flex-col gap-1"
        }`}
      >
        {visibleItems.map((item, index) => {
          const isExpanded = expandedFolders.has(item.id || item.name);
          const itemKey = item.id || `item-${index}`;

          return (
            <div
              key={itemKey}
              className="flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both"
              style={{ animationDelay: `${(index % 10) * 50}ms` }}
            >
              {viewMode === "grid" ? (
                <FileGridItem
                  item={item}
                  onPreview={onPreview}
                  onNavigate={
                    item.type === "folder" ? () => onNavigate(item) : undefined
                  }
                />
              ) : (
                <>
                  <FileRow
                    item={item}
                    isExpanded={isExpanded}
                    onToggleExpand={() => toggleExpand(item.id || item.name)}
                    onNavigate={
                      item.type === "folder"
                        ? () => onNavigate(item)
                        : undefined
                    }
                    onPreview={onPreview}
                  />

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col border border-border rounded-b-xl mb-2 bg-card/50 overflow-hidden">
                        {item.files && item.files.length > 0 ? (
                          item.files.map((child, childIdx) => (
                            <FileRow
                              key={child.id || `child-${childIdx}`}
                              item={child}
                              depth={1}
                              onPreview={onPreview}
                            />
                          ))
                        ) : (
                          <div className="p-4 text-xs text-text-light italic text-center">
                            This folder is empty
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {!isFiltered && (
        <div className="bg-page md:bg-transparent pt-2 pb-2 px-4 fixed bottom-0 left-0 w-full z-40 border-t border-border md:static md:border-none md:p-0 md:mt-6 md:flex md:flex-col md:items-center md:pointer-events-auto">
          <div className="pointer-events-auto flex items-center justify-center gap-3 md:shadow-none bg-page md:bg-transparent rounded-xl w-full md:w-auto">
            {hasMore ? (
              <button
                aria-label="Show more"
                onClick={handleShowMore}
                disabled={isLoadinggMore}
                className="group flex items-center justify-center gap-2 px-4 py-2 w-fit md:w-auto md:py-2 border border-pink-400 text-pink-500 text-sm font-semibold rounded-lg hover:bg-pink-400 hover:text-white transition-all duration-300 active:scale-95 disabled:opacity-70"
              >
                {isLoadinggMore ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                )}
                Show More
              </button>
            ) : (
              limit > 10 && (
                <button
                  aria-label="Show less"
                  onClick={handleShowLess}
                  className="flex items-center justify-center gap-2 px-4 py-2 w-fit md:w-auto md:py-2 border border-text-mid text-text-mid text-sm font-medium rounded-xl hover:bg-card hover:shadow-inner transition-all active:scale-95"
                >
                  <ChevronUp className="w-4 h-4" />
                  Show Less
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
