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
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  toggleSidebar,
}) => {
  const { theme } = useTheme();

  return (
    <aside
      className={`fixed left-0 top-0 inset-y-0 z-50 bg-sidebar flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-[60px]" : "w-[60px] lg:w-64"
      }`}
    >
      {/* Brand logo*/}
      <div
        className={`h-[72px] flex items-center px-2 border-b border-sidebar-hi shrink-0 relative ${
          isCollapsed
            ? "justify-center"
            : "justify-center lg:justify-start lg:px-6"
        }`}
      >
        <img
          src={
            isCollapsed || window.innerWidth < 1024
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
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-1/2 -translate-y-1/2 -right-3 bg-sidebar text-white p-1 rounded-full border border-sidebar-hi hover:bg-sidebar-hi transition-all hidden lg:flex items-center justify-center z-50 shadow-md"
        >
          {isCollapsed ? (
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
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<Users />}
          label="Employees"
          to="/employees"
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<Settings />}
          label="Settings"
          to="/settings"
          isCollapsed={isCollapsed}
        />
      </nav>

      {/* Footer - Fixed at the bottom on small screens */}
      <div className="p-4 border-t border-sidebar-hi shrink-0 bg-sidebar">
        <div
          className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : "lg:justify-start"}`}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink to-blue flex items-center justify-center text-xs font-bold text-white shrink-0">
            EO
          </div>
          {!isCollapsed && (
            <div className="hidden lg:block overflow-hidden">
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
  );
};
