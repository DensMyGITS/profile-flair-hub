import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import MyProfile from "./pages/MyProfile";
import Settings from "./pages/Settings";
import AdminUsers from "./pages/AdminUsers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | undefined>(undefined);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(undefined);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                <AppSidebar 
                  isAuthenticated={isAuthenticated} 
                  role={userRole} 
                  onLogout={handleLogout}
                />
                <div className="flex-1 flex flex-col">
                  <AppHeader />
                  <main className="flex-1 overflow-y-auto">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/profile" element={<MyProfile />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/admin/users" element={<AdminUsers />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </SidebarProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;