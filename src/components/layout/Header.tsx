import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  tenantName: string;
  userName: string;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, tenantName, userName }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200 lg:hidden"
          >
            <Menu className="h-5 w-5 text-slate-600" />
          </button>
          
          <div>
            <h1 className="text-xl font-bold text-slate-900">{tenantName}</h1>
            <p className="text-sm text-slate-500">Advanced AI Vision</p>
          </div>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search services..."
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200 relative">
            <Bell className="h-5 w-5 text-slate-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};