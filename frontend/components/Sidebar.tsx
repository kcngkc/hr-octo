import React from 'react';
import * as Icons from 'lucide-react';
import { TabId, NavItem } from '../types.ts';
import { NAV_ITEMS } from '../constants.ts';

interface SidebarProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-72 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800 shrink-0">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 text-white mb-1">
          <Icons.Octagon className="w-8 h-8 text-brand-500" />
          <h1 className="text-xl font-bold tracking-tight">HR Octo</h1>
        </div>
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-2">Architecture Spec</p>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const Icon = (Icons as any)[item.icon];
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-brand-600 text-white shadow-sm' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-100' : 'text-slate-400'}`} />
                <span className="text-left">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
        <p>Confidential & Proprietary</p>
        <p>Do not proceed with ungrounded sample database records.</p>
      </div>
    </div>
  );
};
