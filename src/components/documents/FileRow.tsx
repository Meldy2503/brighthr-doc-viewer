import React from "react";
import { ChevronRight, Eye, FolderOpen } from "lucide-react";
import type { FileItem } from "../../types";
import { formatDate, getFileTypeConfig } from "../../utils";
import { FileIcon } from "./FileIcon";

interface FileRowProps {
  item: FileItem;
  bgWhite?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onNavigate?: () => void;
  onPreview: (item: FileItem) => void;
  depth?: number;
}

export const FileRow: React.FC<FileRowProps> = ({
  item,
  isExpanded,
  onToggleExpand,
  onNavigate,
  onPreview,
  depth = 0,
}) => {
  const isFolder = item.type === "folder";
  const folderCount = item.files?.length || 0;

  const handleRowClick = () => {
    if (isFolder) {
      // If folder, toggle expand. If file, preview.
      if (folderCount > 0 && onToggleExpand) {
        onToggleExpand();
      } else if (onNavigate) {
        // If it's an empty folder, a user can still navigate into it
        onNavigate();
      }
    } else {
      onPreview(item);
    }
  };

  return (
    <div
      className={`
        group relative grid grid-cols-[48px_1fr_42px] md:grid-cols-[48px_1fr_160px_140px_84px] items-center 
        gap-0 border border-border bg-card hover:border-amber/50 hover:shadow-md hover:-translate-y-[1px] 
        transition-all duration-200 cursor-pointer overflow-hidden scroll-mt-[100px]
        ${isFolder ? "bg-folder border-border" : ""}
        ${isExpanded ? "rounded-t-xl border-b-0" : "rounded-xl"}
        ${depth > 0 ? "!border-t-0 !border-x-0 !border-b-border !rounded-none hover:bg-card-alt !shadow-none hover:translate-y-0" : "mb-1"}
      `}
      onClick={handleRowClick}
      style={{ paddingLeft: depth * 24 }}
      data-testid="file-row"
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-14 shrink-0">
        <FileIcon type={item.type} className="w-8 h-8 rounded-lg " />
      </div>

      {/* Name & Meta */}
      <div className="px-2.5 min-w-0 flex flex-col justify-center">
        <div className={`text-[13.5px] font-medium truncate text-text-primary`}>
          {item.name}
        </div>
        {isFolder && (
          <div className="text-[11px] text-text-mid">
            {folderCount} file{folderCount !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* Date */}
      <div className="px-1.5 text-xs text-text-mid hidden md:block">
        {isFolder ? "" : formatDate(item.added)}
      </div>

      {/* Type Badge */}
      <div className="px-1.5 hidden md:block">
        {(() => {
          const { bg, text } = getFileTypeConfig(item.type);
          return (
            <span
              className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${bg} ${text}`}
            >
              {item.type}
            </span>
          );
        })()}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-1 px-2 h-full">
        {isFolder ? (
          <>
            {/* Navigate into folder button */}
            {onNavigate && (
              <button
                aria-label="Open folder"
                className="p-1.5 rounded-lg border border-border hover:border-amber hover:bg-amber/10 transition-colors shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate();
                }}
                title="Open folder"
              >
                <FolderOpen className="w-4 h-4 text-text-mid hover:text-amber transition-colors" />
              </button>
            )}

            {/* Expand/collapse chevron */}
            <button
              aria-label="Expand folder"
              className="p-1.5 shrink-0 ml-2"
              onClick={(e) => {
                e.stopPropagation();
                if (onToggleExpand) onToggleExpand();
              }}
              title="Expand folder"
            >
              <ChevronRight
                className={`w-[18px] h-[18px] text-text-light transition-transform duration-200 ${isExpanded ? "rotate-90 text-amber" : ""}`}
              />
            </button>
          </>
        ) : (
          /* Preview button for files */
          <button
            aria-label="Preview file"
            data-testid="preview-button" 
            className="p-1.5 text-text-light hover:text-amber hover:bg-amber/10 rounded-lg transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onPreview(item);
            }}
            title="Preview file"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
