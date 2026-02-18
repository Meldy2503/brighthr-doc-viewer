import { useState, useEffect } from "react";
import { Download, Share2 } from "lucide-react";
import Modal from "../ui/Modal";
import Card from "../ui/Card";
import { formatDate, formatSize, getFileTypeConfig } from "../../utils";
import type { FileItem } from "../../types";
import { FileIcon } from "./FileIcon";

interface FileModalProps {
  item: FileItem | null;
  onClose: () => void;
}

const FileModal = ({ item, onClose }: FileModalProps) => {
  const [progress, setProgress] = useState(0);

  // to animate the storage bar when a new item opens
  useEffect(() => {
    if (!item) {
      return;
    }
    const timer = setTimeout(() => {
      setProgress(Math.min(((item.size ?? 0) / 10) * 100, 100));
    }, 100);
    return () => clearTimeout(timer);
  }, [item]);

  const { bg, text } = item
    ? getFileTypeConfig(item.type)
    : { bg: "", text: "" };

  return (
    <Modal isOpen={!!item} onClose={onClose}>
      <div data-testid="file-modal" role="dialog" aria-modal="true">
        <Modal.Header
          icon={
            <FileIcon
              type={item?.type ?? "pdf"}
              className="w-[54px] h-[54px] rounded-xl"
            />
          }
          title={item?.name ?? ""}
          onClose={onClose}
        />
        <Modal.Content>
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            <Card
              label="File Type"
              value={item?.type.toUpperCase() ?? ""}
              badgeClass={`${bg} ${text}`}
            />
            <Card label="Date Added" value={formatDate(item?.added)} />
            <Card label="File Size" value={formatSize(item?.size)} />
            <Card label="Uploaded By" value={item?.uploaded_by ?? "—"} />
          </div>

          {/* Size bar */}
          <div className="mb-5">
            <div className="flex justify-between text-[11px] text-text-mid mb-2">
              <span>Storage used</span>
              <span className="text-text-primary font-medium">
                {formatSize(item?.size)}
              </span>
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-text-mid transition-all duration-700 ease-out"
                style={{ width: `${Math.max(progress, 2)}%` }}
              />
            </div>
          </div>
        </Modal.Content>
        <Modal.Footer
          primaryLabel="Download File"
          primaryIcon={<Download className="w-4 h-4" />}
          onPrimary={() => console.log("download")}
          secondaryLabel="Share"
          secondaryIcon={<Share2 className="w-4 h-4" />}
          onSecondary={() => console.log("share")}
        />
      </div>
    </Modal>
  );
};

export default FileModal;
