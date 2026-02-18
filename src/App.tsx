import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Documents from "./pages/Documents";
import Employees from "./pages/Employees";
import Settings from "./pages/Settings";
import { Sidebar } from "./components/layout/Sidebar";
import { ThemeProvider } from "./context/ThemeProvider";
import { Navbar } from "./components/layout/Navbar";

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-page text-text-primary font-sans transition-colors duration-200">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          isMobileOpen={isMobileSidebarOpen}
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          closeMobileSidebar={() => setIsMobileSidebarOpen(false)}
        />
        <Navbar
          isSidebarCollapsed={isSidebarCollapsed}
          toggleMobileSidebar={() =>
            setIsMobileSidebarOpen(!isMobileSidebarOpen)
          }
        />

        <main
          className={`flex-1 flex flex-col min-w-0 pt-[72px] transition-all duration-300 ${
            isSidebarCollapsed ? "lg:ml-[60px]" : "lg:ml-64"
          } ml-0`}
        >
          <Routes>
            <Route path="/" element={<Documents />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
