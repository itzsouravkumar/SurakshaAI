"use client";

import React from 'react';
import { Search, Bell, Menu, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  setSidebarOpen: (isOpen: boolean) => void;
}

export function Header({ setSidebarOpen }: HeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('suraksha_admin_auth');
    router.replace('/login');
  };

  return (
    <header className="glass-panel rounded-2xl h-16 shrink-0 flex items-center justify-between px-4 lg:px-6 shadow-md mb-6 relative z-30">
      <div className="flex items-center flex-1">
        <button 
          className="mr-4 lg:hidden p-2 rounded-xl bg-white/50 border border-white hover:bg-white/80 text-slate-600 shadow-sm"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden md:flex items-center px-4 py-2 bg-white/50 backdrop-blur-md border border-white/80 rounded-xl focus-within:bg-white focus-within:shadow-md focus-within:ring-2 focus-within:ring-indigo-200 transition-all w-[360px] shadow-sm">
          <Search size={16} className="text-slate-400 mr-3" />
          <input 
            type="text" 
            placeholder="Search claims, workers, or policies..." 
            className="bg-transparent border-none outline-none text-sm w-full text-slate-900 placeholder:text-slate-500 font-medium"
          />
          <div className="px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-400 bg-slate-100 border border-slate-200 ml-2">
            ⌘K
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3 lg:space-x-4">
        <div className="hidden lg:flex items-center px-3 py-1.5 rounded-lg bg-emerald-100/50 border border-emerald-200/50 text-emerald-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 shadow-[0_0_5px_#10b981] animate-pulse"></span>
          <span className="text-[11px] font-bold uppercase tracking-wider">Live Risk Polling Active</span>
        </div>
        <div className="h-6 w-px bg-slate-300/50 hidden lg:block"></div>
        <button className="relative p-2.5 rounded-xl bg-white/50 border border-white hover:bg-white text-slate-600 transition-all shadow-sm">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button
          onClick={handleLogout}
          className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/50 border border-white hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-slate-600 text-xs font-bold transition-all shadow-sm"
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </header>
  );
}
