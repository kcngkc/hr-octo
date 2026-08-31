import React from 'react';
import { Card } from '../ui/Card.tsx';
import { ShieldAlert, UserCog, Edit3 } from 'lucide-react';

export const SensitiveHandoff: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">15. Sensitive ER & Handoff</h2>
        <p className="text-slate-600 mt-2">Strict protocols for handling sensitive cases and human-in-the-loop responses.</p>
      </div>

      <Card className="border-l-4 border-l-red-600 bg-red-50/30">
        <div className="flex items-center gap-3 mb-4">
          <ShieldAlert className="w-6 h-6 text-red-600" />
          <h3 className="text-lg font-bold text-red-900">Sensitive Employee Relations</h3>
        </div>
        <p className="text-sm text-red-800 mb-4 font-medium">
          For harassment, discrimination, retaliation, legal threats, violence, self-harm, union activity, or protected activity:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" /> Do not conduct autonomous fact-finding</li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" /> Do not infer emotion or credibility</li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" /> Create a restricted escalation</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" /> Show limited employee acknowledgment</li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" /> Transmit full conversation only to authorized human queue</li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" /> Record the deterministic reason code</li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" /> Do not use Gemini to decide the outcome</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-3 mb-4">
          <UserCog className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-bold text-slate-800">Human Response Draft (Non-Sensitive)</h3>
        </div>
        <p className="text-sm text-slate-600 mb-6">
          For non-sensitive escalations, Gemini may draft a response. The human reviewer has explicit control over the final output.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center bg-slate-50 p-6 rounded-lg border border-slate-200">
          <div className="text-center">
            <div className="bg-white border border-slate-300 p-3 rounded-lg shadow-sm mb-2">
              <Edit3 className="w-6 h-6 text-slate-400 mx-auto mb-1" />
              <span className="text-xs font-bold text-slate-700">AI Draft Generated</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <button className="bg-emerald-100 text-emerald-800 border border-emerald-200 py-2 px-4 rounded text-sm font-semibold hover:bg-emerald-200 transition-colors">Accept</button>
            <button className="bg-blue-100 text-blue-800 border border-blue-200 py-2 px-4 rounded text-sm font-semibold hover:bg-blue-200 transition-colors">Edit</button>
            <button className="bg-amber-100 text-amber-800 border border-amber-200 py-2 px-4 rounded text-sm font-semibold hover:bg-amber-200 transition-colors">Regenerate</button>
            <button className="bg-red-100 text-red-800 border border-red-200 py-2 px-4 rounded text-sm font-semibold hover:bg-red-200 transition-colors">Reject</button>
          </div>
          
          <div className="text-center">
            <div className="bg-brand-600 text-white p-3 rounded-lg shadow-sm mb-2">
              <span className="text-xs font-bold">Send Final Response</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs text-slate-500 font-medium">
          System must record AI draft, final response, and acceptance classification.
        </div>
      </Card>
    </div>
  );
};
