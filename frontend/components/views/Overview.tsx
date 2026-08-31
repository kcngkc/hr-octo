import React from 'react';
import { Card } from '../ui/Card.tsx';
import { Target, Shield, Database, AlertCircle } from 'lucide-react';

export const Overview: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Product Objective</h2>
        <p className="text-slate-600 mt-2">HR Octo should remove 70–80% of routine human HR effort.</p>
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mt-3 flex items-start gap-3 text-amber-800 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p><strong>Note:</strong> The 70–80% figure is a product target, not a result to display unless observed data and an approved baseline support it.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Core Capabilities">
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" /> Clarifying and qualifying employee requests</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" /> Retrieving applicable employee, payroll, policy, and workflow evidence</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" /> Delegating work to specialist agents</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" /> Preparing investigation reports</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" /> Drafting communications</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" /> Preserving complete handoff context</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" /> Completing approved deterministic actions</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" /> Measuring human effort avoided</li>
          </ul>
        </Card>

        <Card title="Platform Stack">
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-center gap-2"><Target className="w-4 h-4 text-slate-400" /> Gemini Enterprise Agent Studio</li>
            <li className="flex items-center gap-2"><Target className="w-4 h-4 text-slate-400" /> Gemini Models (reasoning/drafting)</li>
            <li className="flex items-center gap-2"><Target className="w-4 h-4 text-slate-400" /> Agent Development Kit (ADK)</li>
            <li className="flex items-center gap-2"><Database className="w-4 h-4 text-slate-400" /> BigQuery (durable state)</li>
            <li className="flex items-center gap-2"><Database className="w-4 h-4 text-slate-400" /> Cloud Storage (source ingestion)</li>
            <li className="flex items-center gap-2"><Target className="w-4 h-4 text-slate-400" /> RAG Engine / Agent Search</li>
            <li className="flex items-center gap-2"><Target className="w-4 h-4 text-slate-400" /> Cloud Run</li>
            <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-slate-400" /> Secret Manager & Cloud Logging</li>
          </ul>
        </Card>
      </div>

      <Card title="Design Principles">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-slate-700">
          <div className="space-y-4">
            <p><strong>1. Explicit Contracts:</strong> State the decision, system of record, owner, input, output, dependency, gate, failure behavior, exception process, and downstream consequence.</p>
            <p><strong>2. System of Record:</strong> BigQuery is the system of record for durable workflow state. Do not create an architecture where conversation history is the system of record.</p>
            <p><strong>3. Handoffs:</strong> An interface or handoff must define its contract explicitly.</p>
            <p><strong>4. Approvals:</strong> A consequential action must have a named decision owner and approval gate.</p>
            <p><strong>5. Exceptions:</strong> If an exception removes correction ownership, reject the exception.</p>
            <p><strong>6. Safety Gates:</strong> Block release when a defect can materially affect payroll, territory assignment, billing, security, privacy, or compliance.</p>
          </div>
          <div className="space-y-4">
            <p><strong>7. No Hallucinations:</strong> Do not invent metrics, amounts, policies, employee data, pay records, approval records, or performance outcomes.</p>
            <p><strong>8. Concrete Codes:</strong> Use concrete status codes and reason codes.</p>
            <p><strong>9. Fallbacks:</strong> Every unresolved request must return to the Root Agent and then either ask the employee for information or reach a named human queue. Never silently fail.</p>
            <p><strong>10. Separation of Concerns:</strong> Keep deterministic controls separate from LLM reasoning.</p>
            <p><strong>11. Language:</strong> Use clear international English. Avoid marketing language and unexplained metaphors.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
