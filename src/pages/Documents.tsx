import { useSearchParams } from "react-router-dom";
import { findFileById, findFolderById } from "../utils";
import { FileList } from "../components/documents/FileList";
import { MOCK_DATA } from "../data/mockData";
import FileModal from "../components/documents/FileModal";
import { Header } from "../components/documents/Header";
import type { UrlParams } from "../types";
import { useMemo } from "react";

const Documents: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read params from the URL
  const folderId = searchParams.get("folderId");
  const query = searchParams.get("q") || "";
  const sortBy = (searchParams.get("sort") as "name" | "date") || "name";
  const sortAsc = searchParams.get("asc") !== "false";
  const preview = searchParams.get("preview");
  const viewMode = (searchParams.get("view") as "list" | "grid") || "list";

  // function to change the page state
  const updateUrl = (newFields: UrlParams) => {
    const nextParams = new URLSearchParams(searchParams);
    Object.entries(newFields).forEach(([key, value]) => {
      if (value === null || value === "") nextParams.delete(key);
      else nextParams.set(key, String(value));
    });
    setSearchParams(nextParams);
  };

  // find folder by id
  const { folder: currentFolder, breadcrumbs } = folderId
    ? findFolderById(MOCK_DATA, folderId)
    : { folder: null, breadcrumbs: [] };

  const rawItems = currentFolder?.files || MOCK_DATA;

  // Filter and Sort data
  const processedItems = [...rawItems]
    .filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (a.type === "folder" && b.type !== "folder") return -1;
      if (a.type !== "folder" && b.type === "folder") return 1;

      const compare =
        sortBy === "name"
          ? a.name.localeCompare(b.name)
          : (a.added || "").localeCompare(b.added || "");

      return sortAsc ? compare : -compare;
    });

  // only runs when preview or MOCK_DATA changes.
  const selectedFile = useMemo(() => {
    return preview ? findFileById(MOCK_DATA, preview) : null;
  }, [preview]);

  return (
    <>
      <Header
        breadcrumbs={breadcrumbs}
        onNavigate={(id) => updateUrl({ folderId: id, q: null })}
        searchQuery={query}
        onSearch={(q) => updateUrl({ q })}
        sortBy={sortBy}
        sortAsc={sortAsc}
        setSortBy={(key) =>
          updateUrl({ sort: key, asc: sortBy === key ? !sortAsc : true })
        }
        viewMode={viewMode}
        setViewMode={(view) => updateUrl({ view })}
        totalItems={processedItems.length}
      />

      <div className="flex-1 p-4 md:px-9 overflow-y-auto">
        <FileList
          items={processedItems}
          viewMode={viewMode}
          onNavigate={(folder) => updateUrl({ folderId: folder.id })}
          onPreview={(item) => updateUrl({ preview: item.id })}
        />
      </div>

      <FileModal
        item={selectedFile}
        onClose={() => updateUrl({ preview: null })}
      />
    </>
  );
};;

export default Documents;
