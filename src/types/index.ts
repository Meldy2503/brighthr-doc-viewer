export type FileType = "pdf" | "doc" | "csv" | "mov" | "img" | "folder";

export interface FileItem {
  id?: string;
  type: FileType;
  name: string;
  added?: string;
  size?: number;
  files?: FileItem[];
  uploaded_by?: string;
}

export interface SortOption<T extends string> {
  label: string;
  value: T;
}

export interface UrlParams {
  folderId?: string | null;
  q?: string | null;
  sort?: "name" | "date";
  asc?: boolean;
  preview?: string | null;
  view?: "list" | "grid";
}

export interface FileListProps {
  items: FileItem[];
  onNavigate: (folder: FileItem) => void;
  onPreview: (item: FileItem) => void;
  viewMode?: "list" | "grid";
  onLoadMore?: () => void;
  onShowLess?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}