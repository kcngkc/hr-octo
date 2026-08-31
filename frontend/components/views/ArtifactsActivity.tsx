import React from 'react';
import { Card } from '../ui/Card.tsx';
import { REASONING_ARTIFACTS } from '../../constants.ts';
import { Archive, Activity, Database } from 'lucide-react';

export const ArtifactsActivity: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">16. Artifacts & Activity</h2>
        <p className="text-slate-600 mt-2">Persistence requirements for reasoning artifacts and the agent activity feed.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4">
            <Archive className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-slate-800">Reasoning Artifacts</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Do not store hidden chain-of-thought. Store concise operational artifacts and evidence references.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex-1">
            <ul className="space-y-2">
              {REASONING_ARTIFACTS.map((artifact) => (
                <li key={artifact} className="flex items-center gap-2 text-sm">
                  <Database className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-mono text-xs text-slate-700 bg-white px-2 py-1 rounded border border-slate-200 w-full">{artifact}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-brand-600" />
            <h3 className="font-bold text-slate-800">Agent Activity Feed</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Record an ordered feed of all agent actions for audit and debugging.
          </p>
          <div className="bg-slate-900 rounded-lg p-4 flex-1 overflow-hidden">
            <pre className="text-blue-300 text-xs font-mono leading-relaxed">
{`{
  "schema": "hr_case.agent_activity",
  "fields": [
    "actor",
    "action",
    "detail",
    "tool",
    "source_agent",
    "destination_agent",
    "handoff_reason",
    "sequence",
    "status",
    "timestamp",
    "evidence_reference"
  ]
}`}
            </pre>
          </div>
        </Card>
      </div>
    </div>
  );
};
