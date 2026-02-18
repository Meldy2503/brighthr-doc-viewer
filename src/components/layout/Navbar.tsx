import React from "react";
import { Moon, Sun, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

interface NavbarProps {
  isSidebarCollapsed: boolean;
  toggleMobileSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isSidebarCollapsed,
  toggleMobileSidebar,
}) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Determine title based on route
  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Documents";
      case "/employees":
        return "Employees";
      case "/settings":
        return "Settings";
      default:
        return "BrightHR";
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 left-0 z-30 bg-topbar border-b border-border px-4 lg:px-9 h-[72px] flex items-center justify-between transition-all duration-300 ${
        isSidebarCollapsed ? "lg:left-[60px]" : "lg:left-64"
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden p-2 -ml-2 text-text-primary hover:bg-page rounded-md "
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        {/* Route Name (Left) */}
        <h2 className="font-serif text-xl md:text-2xl font-semibold -tracking-[0.03em] text-text-primary leading-none">
          {getTitle()}
        </h2>
      </div>
      {/* Theme Toggle (Right) */}
      <button
        onClick={toggleTheme}
        className="w-10 h-10 flex items-center justify-center border border-border rounded-[10px] bg-page text-text-mid hover:border-blue hover:text-blue hover:bg-blue-dim transition-all shrink-0"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );
};
