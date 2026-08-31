import React from 'react';
import { Card } from '../ui/Card.tsx';
import { SPECIALIST_AGENTS, ROOT_AGENT_RESPONSIBILITIES } from '../../constants.ts';
import { Bot, Network, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

export const AgentTopology: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">11. Agent Topology</h2>
        <p className="text-slate-600 mt-2">Hierarchical multi-agent system with a single Root Agent and specialized delegates.</p>
      </div>

      <Card className="bg-slate-50 border-slate-200">
        <div className="flex flex-col items-center py-8">
          {/* Root Agent */}
          <div className="bg-brand-600 text-white p-6 rounded-xl shadow-lg border-2 border-brand-400 w-80 relative z-10 flex flex-col items-center">
            <Bot className="w-10 h-10 mb-3 text-brand-100" />
            <h3 className="text-lg font-bold text-center">HR Operations Root Agent</h3>
            <p className="text-xs text-brand-200 text-center mt-2">Intake, Clarification, Delegation & Handoff</p>
          </div>

          {/* Connecting Lines */}
          <div className="w-0.5 h-12 bg-slate-300"></div>
          <div className="w-full max-w-4xl h-0.5 bg-slate-300"></div>
          
          {/* Specialist Agents Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8 w-full max-w-5xl px-4">
            {SPECIALIST_AGENTS.map((agent, i) => (
              <div key={i} className="relative flex flex-col items-center">
                <div className="absolute -top-8 w-0.5 h-8 bg-slate-300"></div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm w-full h-full flex flex-col items-center justify-center text-center hover:border-brand-300 transition-colors">
                  <Network className="w-6 h-6 text-slate-400 mb-2" />
                  <span className="text-xs font-semibold text-slate-700">{agent}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card title="Root Agent Responsibilities">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          {ROOT_AGENT_RESPONSIBILITIES.map((resp, i) => {
            const isNegative = resp.toLowerCase().startsWith('never');
            return (
              <div key={i} className="flex items-start gap-3">
                {isNegative ? (
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                )}
                <span className={`text-sm ${isNegative ? 'text-red-700 font-medium' : 'text-slate-700'}`}>
                  {resp}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
