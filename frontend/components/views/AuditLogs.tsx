import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card.tsx';
import { Badge } from '../ui/Badge.tsx';
import { Activity, ShieldCheck, Database, FileText, RefreshCw, UserCheck, Target } from 'lucide-react';
import { store } from '../../services/store.ts';

export const AuditLogs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('handoffs');
  const [activities, setActivities] = useState(store.getActivities());

  useEffect(() => {
    return store.subscribe(() => {
      setActivities(store.getActivities());
    });
  }, []);

  const tabs = [
    { id: 'handoffs', label: 'Agent Handoffs', icon: Activity },
    { id: 'actions', label: 'Audit Actions', icon: ShieldCheck },
    { id: 'artifacts', label: 'Reasoning Artifacts', icon: FileText },
    { id: 'policy', label: 'Policy Enquiries', icon: Database },
    { id: 'integration', label: 'Integration Tx', icon: RefreshCw },
    { id: 'resolutions', label: 'Human Resolutions', icon: UserCheck },
    { id: 'evaluations', label: 'Evaluation Results', icon: Target },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">System Audit & Logs</h2>
        <p className="text-slate-600 mt-1">Immutable records of all system actions, handoffs, and evaluations.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-primary-600 text-white shadow-sm' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      <Card noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-3 px-4 text-sm font-semibold text-slate-800">Timestamp</th>
                <th className="py-3 px-4 text-sm font-semibold text-slate-800">Source</th>
                <th className="py-3 px-4 text-sm font-semibold text-slate-800">Destination</th>
                <th className="py-3 px-4 text-sm font-semibold text-slate-800">Action / Event</th>
                <th className="py-3 px-4 text-sm font-semibold text-slate-800">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activities.map(act => (
                <tr key={act.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 text-sm text-slate-500 font-mono whitespace-nowrap">{act.timestamp}</td>
                  <td className="py-3 px-4 text-sm text-slate-800"><Badge variant="info">{act.sourceAgent}</Badge></td>
                  <td className="py-3 px-4 text-sm text-slate-800"><Badge variant="default">{act.destinationAgent}</Badge></td>
                  <td className="py-3 px-4 text-sm text-slate-800 font-medium">{act.action}</td>
                  <td className="py-3 px-4 text-sm text-slate-600 max-w-xs truncate" title={act.detail}>{act.detail}</td>
                </tr>
              ))}
              {activities.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-slate-500">No activity recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
