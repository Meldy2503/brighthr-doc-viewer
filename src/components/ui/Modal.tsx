import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface HeaderProps {
  icon: React.ReactNode;
  title: string;
  onClose: () => void;
}

interface FooterProps {
  primaryLabel: string;
  primaryIcon?: React.ReactNode;
  onPrimary: () => void;
  secondaryLabel?: string;
  secondaryIcon?: React.ReactNode;
  onSecondary?: () => void;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return createPortal(
    <div
      data-testid="modal-container"
      data-state={isOpen ? "open" : "closed"}
      aria-hidden={!isOpen}
      className={`
        fixed inset-0 z-[100] flex items-center justify-center p-6
        bg-overlay backdrop-blur-sm
        transition-opacity duration-300
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`
          bg-modal w-full max-w-[480px] rounded-[18px]
          border border-border shadow-modal overflow-hidden
          transform transition-all duration-300
          ${isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

// Modal Header
const Header = ({ icon, title, onClose }: HeaderProps) => (
  <div className="flex items-center gap-4 pt-[26px] px-[26px]">
    <div className="shrink-0">{icon}</div>
    <div className="flex-1 min-w-0">
      <h3 className="font-serif text-xl font-semibold -tracking-[0.02em] text-text-primary leading-tight break-words">
        {title}
      </h3>
    </div>
    <button
      aria-label="Close modal"
      onClick={onClose}
      className="w-[30px] h-[30px] flex items-center justify-center border border-border rounded-lg text-text-light hover:text-text-primary hover:border-text-primary transition-colors shrink-0"
    >
      <X className="w-3.5 h-3.5" />
    </button>
  </div>
);

// Modal Content
const Content = ({ children }: { children: React.ReactNode }) => (
  <div className="px-[26px] pt-5 pb-0">{children}</div>
);

// Modal Footer
const Footer = ({
  primaryLabel,
  primaryIcon,
  onPrimary,
  secondaryLabel,
  secondaryIcon,
  onSecondary,
}: FooterProps) => (
  <div className="px-[26px] pb-[26px] pt-0">
    <div className="h-px bg-border mb-[18px]" />
    <div className="flex gap-2.5">
      <button
        aria-label="Primary action"
        onClick={onPrimary}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-pink text-white text-[13.5px] font-semibold rounded-lg hover:bg-pink-light hover:-translate-y-px hover:shadow-lg hover:shadow-pink/30 transition-all"
      >
        {primaryIcon}
        {primaryLabel}
      </button>
      {secondaryLabel && (
        <button
          aria-label="Secondary action"
          onClick={onSecondary}
          className="px-4 py-2.5 border border-border rounded-lg flex items-center gap-2 text-[13.5px] font-medium text-text-mid hover:text-text-primary hover:border-text-primary transition-colors"
        >
          {secondaryIcon}
          {secondaryLabel}
        </button>
      )}
    </div>
  </div>
);

// modal-components
Modal.Header = Header;
Modal.Content = Content;
Modal.Footer = Footer;

export default Modal;
