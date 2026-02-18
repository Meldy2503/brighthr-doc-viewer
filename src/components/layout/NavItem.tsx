import { NavLink } from "react-router-dom";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  badge?: string;
  isCollapsed?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  to,
  badge,
  isCollapsed,
}) => {
  return (
    <NavLink
      to={to}
      title={isCollapsed ? label : undefined}
      className={({ isActive }) => `
        relative flex items-center gap-3 px-2.5 py-3.5 rounded-lg cursor-pointer transition-colors group
        ${isActive ? "bg-sidebar-hi text-white" : "text-white/40 hover:bg-sidebar-hi hover:text-white/80"}
      `}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-[3px] h-[18px] bg-blue rounded-r-sm hidden lg:block" />
          )}
          <div className="w-[18px] h-[18px] [&>svg]:w-full [&>svg]:h-full shrink-0">
            {icon}
          </div>
          {!isCollapsed && (
            <span className="hidden lg:block text-[14px] font-medium flex-1 animate-in fade-in duration-200">
              {label}
            </span>
          )}
          {badge && !isCollapsed && (
            <span className="hidden lg:flex bg-blue text-text-primary text-[10px] font-bold px-1.5 py-[1px] rounded-full min-w-[18px] items-center justify-center animate-in fade-in duration-200">
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
};

export default NavItem;
