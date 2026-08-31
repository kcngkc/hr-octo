import React from 'react';
import { Role } from '../types.ts';
import { Octagon, User, ShieldCheck, BarChart3, LogOut, Menu } from 'lucide-react';

interface LayoutProps {
  role: Role;
  setRole: (role: Role) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ role, setRole, children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const roleConfig = {
    [Role.EMPLOYEE]: { name: 'Sarah Jenkins', title: 'Employee', icon: User },
    [Role.HR_REVIEWER]: { name: 'Marcus Chen', title: 'HR Specialist', icon: ShieldCheck },
    [Role.DEMO_OPERATOR]: { name: 'System Admin', title: 'Demo Operator', icon: BarChart3 },
  };

  const CurrentIcon = roleConfig[role].icon;

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      {/* Topbar */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-primary-600">
            <Octagon className="w-7 h-7" />
            <span className="text-xl font-bold tracking-tight hidden sm:block">HR Octo</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-lg">
            {Object.values(Role).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  role === r 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {r.replace('_', ' ')}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-slate-900">{roleConfig[role].name}</div>
              <div className="text-xs text-slate-500">{roleConfig[role].title}</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center border border-primary-200">
              <CurrentIcon className="w-5 h-5" />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Role Switcher (visible only on mobile when menu open) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 flex flex-col gap-2 z-10">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Switch Role</p>
          {Object.values(Role).map((r) => (
            <button
              key={r}
              onClick={() => { setRole(r); setMobileMenuOpen(false); }}
              className={`px-4 py-3 text-sm font-medium rounded-lg text-left ${
                role === r ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {r.replace('_', ' ')}
            </button>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>
    </div>
  );
};
