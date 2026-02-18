import React from "react";
import { FolderOpen, Eye } from "lucide-react";
import type { FileItem } from "../../types";
import { formatDate, getFileTypeConfig } from "../../utils";
import { FileIcon } from "./FileIcon";

interface FileGridItemProps {
  item: FileItem;
  onNavigate?: () => void;
  onPreview: (item: FileItem) => void;
}

export const FileGridItem: React.FC<FileGridItemProps> = ({
  item,
  onNavigate,
  onPreview,
}) => {
  const isFolder = item.type === "folder";
  const { bg, text } = getFileTypeConfig(item.type);
  const folderCount = item.files?.length || 0;

  const handleClick = () => {
    if (isFolder && onNavigate) {
      onNavigate();
    } else {
      onPreview(item);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        group relative flex flex-col p-4 rounded-xl border border-border bg-card 
        hover:border-amber/50 hover:shadow-lg hover:-translate-y-1 
        transition-all duration-200 cursor-pointer
        ${isFolder ? "bg-folder" : ""}
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <FileIcon type={item.type} className="w-10 h-10 rounded-lg" />

        {/* Actions (Top Right) */}
        <div className="flex items-center gap-1">
          {isFolder ? (
            <button
              aria-label="Open folder"
              className="p-1.5 bg-card/80 backdrop-blur-sm rounded-lg hover:text-amber text-text-light border border-border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              title="Open Folder"
            >
              <FolderOpen className="w-4 h-4 text-text-mid hover:text-amber transition-colors" />
            </button>
          ) : (
            <button
              aria-label="Preview"
              className="p-1.5 bg-card/80 backdrop-blur-sm rounded-lg hover:text-amber text-text-light border border-border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onPreview(item);
              }}
              title="Preview"
            >
              <Eye className="w-4 h-4 text-text-mid hover:text-amber transition-colors" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <h3
          className="text-[13.5px] font-medium text-text-primary truncate mb-1"
          title={item.name}
        >
          {item.name}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-text-mid">
            {isFolder ? (
              <span>
                {folderCount} file{folderCount !== 1 ? "s" : ""}
              </span>
            ) : (
              <span>{formatDate(item.added)}</span>
            )}
          </div>

          {/* Type Badge (Bottom Right) */}
          {!isFolder && (
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${bg} ${text}`}
            >
              {item.type}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
