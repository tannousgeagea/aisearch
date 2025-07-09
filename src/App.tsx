import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import Home from "./pages/Home";
import CaptionPage from "./pages/CaptionPage";
import SearchPage from "./pages/SearchPage";
import HistoryPage from "./pages/HistoryPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import BillingPage from "./pages/BillingPage";
import SecurityPage from "./pages/SecurityPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <div className="ml-auto">
                  {/* Header content can go here */}
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/caption" element={<CaptionPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/history" element={<HistoryPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/billing" element={<BillingPage />} />
                  <Route path="/security" element={<SecurityPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
