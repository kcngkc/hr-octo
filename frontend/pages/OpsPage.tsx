import React, { useState } from 'react';
import { ValueDashboard } from '../components/views/ValueDashboard.tsx';
import { AuditLogs } from '../components/views/AuditLogs.tsx';
import { Content } from '../components/Content.tsx';
import { TabId } from '../types.ts';

export const OpsPage: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'audit' | 'architecture'>('dashboard');

  return (
    <div className="h-full flex flex-col bg-background p-4 md:p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        
        <div className="flex gap-4 mb-8 border-b border-slate-200 pb-4 overflow-x-auto">
          <button 
            onClick={() => setView('dashboard')} 
            className={`text-sm font-medium whitespace-nowrap ${view === 'dashboard' ? 'text-primary-600 border-b-2 border-primary-600 pb-4 -mb-[17px]' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Value Dashboard
          </button>
          <button 
            onClick={() => setView('audit')} 
            className={`text-sm font-medium whitespace-nowrap ${view === 'audit' ? 'text-primary-600 border-b-2 border-primary-600 pb-4 -mb-[17px]' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Audit Logs
          </button>
          <button 
            onClick={() => setView('architecture')} 
            className={`text-sm font-medium whitespace-nowrap ${view === 'architecture' ? 'text-primary-600 border-b-2 border-primary-600 pb-4 -mb-[17px]' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Architecture Spec
          </button>
        </div>

        {view === 'dashboard' && <ValueDashboard />}
        {view === 'audit' && <AuditLogs />}
        {view === 'architecture' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-soft overflow-hidden">
            <Content activeTab={TabId.ARCHITECTURE} />
          </div>
        )}

      </div>
    </div>
  );
};
