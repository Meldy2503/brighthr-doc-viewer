import React from "react";
import {
  FileText,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import NavItem from "./NavItem";
import blueLogo from "../../assets/blue-logo.png";
import whiteLogo from "../../assets/white-logo.png";
import whiteLogoIcon from "../../assets/white-logo-icon.png";
import blueLogoIcon from "../../assets/blue-logo-icon.png";
import { useTheme } from "../../context/ThemeContext";

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  toggleSidebar: () => void;
  closeMobileSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  isMobileOpen,
  toggleSidebar,
  closeMobileSidebar,
}) => {
  const { theme } = useTheme();

  const effectiveCollapsed = isMobileOpen ? false : isCollapsed;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={closeMobileSidebar}
        />
      )}

      <aside
        className={`fixed left-0 top-0 inset-y-0 z-50 bg-sidebar flex flex-col transition-all duration-300 
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${effectiveCollapsed ? "w-[60px]" : "w-64"}
        `}
      >
        {/* Brand logo*/}
        <div
          className={`h-[72px] flex items-center px-2 border-b border-sidebar-hi shrink-0 relative ${
            effectiveCollapsed
              ? "justify-center"
              : "justify-center lg:justify-start lg:px-6"
          }`}
        >
          <img
            src={
              effectiveCollapsed || (!isMobileOpen && window.innerWidth < 1024)
                ? theme === "dark"
                  ? whiteLogoIcon
                  : blueLogoIcon
                : theme === "dark"
                  ? whiteLogo
                  : blueLogo
            }
            alt="logo"
            className="w-auto h-8 object-contain"
          />

          {/* Mobile Close Button */}
          <button
            aria-label="Close navigation menu"
            onClick={closeMobileSidebar}
            className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Toggle Button (Desktop Only) */}
          <button
            aria-label="Toggle navigation menu"
            onClick={toggleSidebar}
            className="absolute top-[100%] -translate-y-1/2 -right-3 bg-sidebar text-white p-1 rounded-full border border-sidebar-hi hover:bg-sidebar-hi transition-all hidden lg:flex items-center justify-center z-50 shadow-md"
          >
            {effectiveCollapsed ? (
              <ChevronRight className="w-3 h-3" />
            ) : (
              <ChevronLeft className="w-3 h-3" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-5 px-2 lg:px-3 space-y-4 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <NavItem
            icon={<FileText />}
            label="Documents"
            to="/"
            isCollapsed={effectiveCollapsed}
            onClick={closeMobileSidebar}
          />
          <NavItem
            icon={<Users />}
            label="Employees"
            to="/employees"
            isCollapsed={effectiveCollapsed}
            onClick={closeMobileSidebar}
          />
          <NavItem
            icon={<Settings />}
            label="Settings"
            to="/settings"
            isCollapsed={effectiveCollapsed}
            onClick={closeMobileSidebar}
          />
        </nav>

        {/* Footer - Fixed at the bottom on small screens */}
        <div className="p-4 border-t border-sidebar-hi shrink-0 bg-sidebar">
          <div
            className={`flex items-center gap-3 ${effectiveCollapsed ? "justify-center" : "justify-start"}`}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink to-blue flex items-center justify-center text-xs font-bold text-white shrink-0">
              EO
            </div>
            {!effectiveCollapsed && (
              <div className="overflow-hidden">
                <p className="text-[13.5px] font-medium text-white truncate">
                  Emelder Okafor
                </p>
                <p className="text-[11.5px] text-text-light truncate">
                  Administrator
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
