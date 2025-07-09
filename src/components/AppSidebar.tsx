import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Sparkles,
  Search,
  History,
  Info,
  User,
  Settings,
  LogOut,
  CreditCard,
  Shield
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Caption Generator", url: "/caption", icon: Sparkles },
  { title: "Image Search", url: "/search", icon: Search },
  { title: "History", url: "/history", icon: History },
  { title: "About", url: "/about", icon: Info },
];

const userItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Billing", url: "/billing", icon: CreditCard },
  { title: "Security", url: "/security", icon: Shield },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  // Mock user state - this will be replaced with real authentication
  const [isLoggedIn] = useState(false);
  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "",
  };

  const isActive = (path: string) => currentPath === path;
  const isMainGroupExpanded = mainItems.some((item) => isActive(item.url));
  const isUserGroupExpanded = userItems.some((item) => isActive(item.url));

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium" 
      : "hover:bg-accent hover:text-accent-foreground";

  const handleLogin = () => {
    // This will be implemented with Supabase authentication
    console.log("Login functionality requires Supabase integration");
  };

  const handleLogout = () => {
    // This will be implemented with Supabase authentication
    console.log("Logout functionality requires Supabase integration");
  };

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="flex flex-col h-full">
        {/* Logo and Brand */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            {!collapsed && (
              <span className="font-bold text-lg">VisionLens</span>
            )}
          </div>
        </div>

        {/* User Section */}
        {!collapsed && (
          <div className="p-4 border-b">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={mockUser.avatar} />
                  <AvatarFallback>{mockUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{mockUser.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{mockUser.email}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Button 
                  className="w-full" 
                  size="sm"
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="sm"
                  onClick={handleLogin}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Tools */}
          <SidebarGroup>
            <SidebarGroupLabel>Tools</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        end 
                        className={getNavClassName}
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* User Management (only show if logged in) */}
          {isLoggedIn && (
            <>
              <Separator className="my-2" />
              <SidebarGroup>
                <SidebarGroupLabel>Account</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {userItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink 
                            to={item.url} 
                            end 
                            className={getNavClassName}
                          >
                            <item.icon className="h-4 w-4" />
                            {!collapsed && <span>{item.title}</span>}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </>
          )}
        </div>

        {/* Logout button (only show if logged in) */}
        {isLoggedIn && (
          <div className="p-4 border-t">
            <SidebarMenuButton 
              onClick={handleLogout}
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span>Sign Out</span>}
            </SidebarMenuButton>
          </div>
        )}

        {/* Sidebar Toggle */}
        <div className="p-2 border-t">
          <SidebarTrigger className="w-full" />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}