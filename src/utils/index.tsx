import type { FileItem } from "../types";

// Helper to find folder by ID and return path
export const findFolderById = (
  items: FileItem[],
  folderId: string,
): { folder: FileItem | null; breadcrumbs: { name: string; id: string }[] } => {
  for (const item of items) {
    // If exact match
    if (item.id === folderId) {
      return {
        folder: item,
        breadcrumbs: [{ name: item.name, id: item.id || "" }],
      };
    }

    // If folder, search children recursively
    if (item.type === "folder" && item.files) {
      const found = findFolderById(item.files, folderId);
      if (found.folder) {
        // Found deep inside, prepend current item to breadcrumbs
        return {
          folder: found.folder,
          breadcrumbs: [
            { name: item.name, id: item.id || "" },
            ...found.breadcrumbs,
          ],
        };
      }
    }
  }

  return { folder: null, breadcrumbs: [] };
};

// Helper to find file by ID
export const findFileById = (
  items: FileItem[],
  id: string,
): FileItem | null => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.type === "folder" && item.files) {
      const found = findFileById(item.files, id);
      if (found) return found;
    }
  }
  return null;
};

// Format date: "6 Dec 2017"
export const formatDate = (dateStr?: string) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// format file size
export const formatSize = (mb?: number) => {
  if (mb === undefined) return "—";
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(mb * 1024)} KB`;
};

// fileTypes config
export const FILE_TYPE_CONFIG: Record<string, { bg: string; text: string }> = {
  pdf: {
    bg: "bg-[#ffeaea] dark:bg-[#3d1515]",
    text: "text-[#c53030] dark:text-[#fc8181]",
  },
  doc: {
    bg: "bg-[#ebf4ff] dark:bg-[#152340]",
    text: "text-[#2b6cb0] dark:text-[#63b3ed]",
  },
  csv: {
    bg: "bg-[#e6fffa] dark:bg-[#0f2d24]",
    text: "text-[#276749] dark:text-[#68d391]",
  },
  mov: {
    bg: "bg-[#faf5ff] dark:bg-[#231640]",
    text: "text-[#6b46c1] dark:text-[#b794f4]",
  },
  img: {
    bg: "bg-[#fef9c3] dark:bg-[#2d2200]",
    text: "text-[#b45309] dark:text-[#f6e05e]",
  },
  default: {
    bg: "bg-gray-200 dark:bg-gray-800",
    text: "text-gray-500 dark:text-gray-300",
  },
};

export const getFileTypeConfig = (type: string) =>
  FILE_TYPE_CONFIG[type] ?? FILE_TYPE_CONFIG.default;
