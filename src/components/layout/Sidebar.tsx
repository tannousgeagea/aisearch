import React from 'react';
import { Link } from 'react-router-dom';
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
  Shield,
  Server
} from "lucide-react";
import { UserProfileMenu } from '@/components/user/UserProfileMenu';
import { authService } from '@/utils/auth';;

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentPage, 
  onPageChange, 
  onLogout,
  isCollapsed 
}) => {
  const mainItems = [
    { title: "Home", url: "", icon: Home },
    { title: "Caption Generator", url: "caption", icon: Sparkles },
    { title: "Image Search", url: "search", icon: Search },
    { title: "History", url: "history", icon: History },
    { title: "About", url: "about", icon: Info },
  ];


  const currentUser = authService.getUser();
  return (
    <div className={`bg-gradient-to-b from-slate-950 via-indigo-900 to-slate-900 border-r border-slate-700 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col`}>
      {/* Logo */}
      <div className="p-4 border-b border-slate-600">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-white font-bold text-lg">AISeach</h1>
              <p className="text-slate-400 text-xs">Advanced Vision AI</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 p-4">
        {mainItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentPage === item.url;
          
          return (
            <div
              className="transition-all duration-300 p-2 rounded-md mx-auto"
              key={index}
            >
              <Link
                to={`${item.url}`}
                onClick={() => onPageChange(item.url)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="font-medium">{item.title}</span>}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Logout */}
      {currentUser &&
        <div className="p-4 border-t border-slate-700">
          <UserProfileMenu 
            user={currentUser}
            isCollapsed={isCollapsed}
          />
        </div>
      }

    </div>
  );
};