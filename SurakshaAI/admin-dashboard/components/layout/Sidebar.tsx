import React from 'react';
import { ShieldAlert, Users, Activity, Settings, Bell, Database, Server, X, LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, active }: SidebarItemProps) => (
  <button 
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group relative
      ${active 
        ? 'bg-white/70 shadow-sm border border-white font-semibold text-indigo-700' 
        : 'text-slate-600 hover:bg-white/40 hover:text-slate-900 border border-transparent'
      }`}
  >
    {active && <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-full" />}
    <Icon size={18} className={active ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"} />
    <span className="text-sm tracking-wide">{label}</span>
  </button>
);

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-40 lg:hidden transition-all"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* FLOATING SIDEBAR */}
      <aside className={`fixed lg:relative z-50 h-[calc(100vh-2rem)] w-[260px] m-4 mr-0 rounded-3xl glass-panel flex flex-col transition-transform duration-300 ease-out shadow-xl
        ${isOpen ? 'translate-x-0' : '-translate-x-[120%] lg:translate-x-0'}`}>
        
        {/* Brand */}
        <div className="h-20 flex items-center px-6 pt-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900">SurakshaAI</span>
          <button 
            className="lg:hidden ml-auto p-2 rounded-xl bg-white/50 text-slate-600 hover:text-slate-900"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-2 px-4 space-y-1">
          <div className="mb-6 px-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-2">Overview</p>
            <SidebarItem icon={Activity} label="Dashboard" active />
            <SidebarItem icon={ShieldAlert} label="Threats" />
            <SidebarItem icon={Server} label="Network" />
          </div>

          <div className="mb-6 px-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-2">Management</p>
            <SidebarItem icon={Users} label="Access Control" />
            <SidebarItem icon={Database} label="Data Logs" />
            <SidebarItem icon={Bell} label="Alert Rules" />
          </div>
        </div>

        {/* User Footer */}
        <div className="p-5">
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/50 border border-white shadow-sm hover:bg-white/70 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
              <span className="text-sm font-bold">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">System Admin</p>
              <p className="text-[11px] font-semibold text-slate-500 truncate">admin@suraksha.ai</p>
            </div>
            <Settings size={18} className="text-slate-400" />
          </div>
        </div>
      </aside>
    </>
  );
}
