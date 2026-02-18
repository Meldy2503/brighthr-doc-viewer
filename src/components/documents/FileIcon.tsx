import React from "react";
import { FileText, Image, Film, FileSpreadsheet, Folder } from "lucide-react";
import type { FileType } from "../../types";
import { getFileTypeConfig } from "../../utils";

interface FileIconProps {
  type: FileType;
  className?: string;
}

export const FileIcon: React.FC<FileIconProps> = ({
  type,
  className = "w-8 h-8",
}) => {
  const getIcon = () => {
    switch (type) {
      case "pdf":
        return <FileText className="text-red-600 dark:text-red-400" />;
      case "doc":
        return <FileText className="text-blue-600 dark:text-blue-400" />;
      case "csv":
        return (
          <FileSpreadsheet className="text-green-700 dark:text-green-400" />
        );
      case "mov":
        return <Film className="text-purple-600 dark:text-purple-400" />;
      case "img":
        return <Image className="text-blue-700 dark:text-blue-300" />;
      case "folder":
        return (
          <Folder className="text-blue-600 dark:text-blue-400 fill-current" />
        );
      default:
        return <FileText className="text-gray-500" />;
    }
  };

  const getBgColor = (type: string) => getFileTypeConfig(type).bg;

  if (type === "folder") {
    return (
      <div
        className={`flex items-center justify-center rounded-lg ${className} bg-gradient-to-br from-amber-300 to-amber-500 text-white shadow-sm`}
      >
        <Folder className="w-1/2 h-1/2 fill-current" />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-lg ${className} ${getBgColor(type)}`}
    >
      {React.cloneElement(
        getIcon() as React.ReactElement,
        { className: "w-1/2 h-1/2" } as React.Attributes,
      )}
    </div>
  );
};
