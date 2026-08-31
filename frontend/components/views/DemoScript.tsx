import React from 'react';
import { Card } from '../ui/Card.tsx';
import { PlaySquare, User, Bot, ShieldCheck, ServerCog } from 'lucide-react';

export const DemoScript: React.FC = () => {
  const steps = [
    { actor: 'Employee', text: 'Says: “My overtime pay is wrong.”', icon: User, color: 'text-slate-500', bg: 'bg-slate-100' },
    { actor: 'Root Agent', text: 'Asks for pay-period information.', icon: Bot, color: 'text-primary-600', bg: 'bg-primary-100' },
    { actor: 'Root Agent', text: 'Asks for approval timing.', icon: Bot, color: 'text-primary-600', bg: 'bg-primary-100' },
    { actor: 'Employee', text: 'Confirms the interpreted request.', icon: User, color: 'text-slate-500', bg: 'bg-slate-100' },
    { actor: 'Root Agent', text: 'Hands off to Payroll Agent.', icon: Bot, color: 'text-primary-600', bg: 'bg-primary-100' },
    { actor: 'Payroll Agent', text: 'Shows investigation plan.', icon: Bot, color: 'text-purple-600', bg: 'bg-purple-100' },
    { actor: 'Payroll Agent', text: 'Retrieves evidence.', icon: Bot, color: 'text-purple-600', bg: 'bg-purple-100' },
    { actor: 'Payroll Agent', text: 'Delegates policy search.', icon: Bot, color: 'text-purple-600', bg: 'bg-purple-100' },
    { actor: 'HR Policy Agent', text: 'Returns grounded policy evidence.', icon: Bot, color: 'text-blue-600', bg: 'bg-blue-100' },
    { actor: 'Deterministic', text: 'Calculates the correction.', icon: ServerCog, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { actor: 'Gemini', text: 'Generates a grounded finding and approval brief.', icon: Bot, color: 'text-brand-600', bg: 'bg-brand-100' },
    { actor: 'HR', text: 'Sees the full report and agent handoffs.', icon: ShieldCheck, color: 'text-amber-600', bg: 'bg-amber-100' },
    { actor: 'HR', text: 'Approves.', icon: ShieldCheck, color: 'text-amber-600', bg: 'bg-amber-100' },
    { actor: 'Workflow', text: 'Pauses and resumes.', icon: ServerCog, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { actor: 'Deterministic', text: 'Authority and source version are validated.', icon: ServerCog, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { actor: 'Deterministic', text: 'Idempotent simulated payroll action is submitted.', icon: ServerCog, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { actor: 'Gemini', text: 'Drafts the employee response.', icon: Bot, color: 'text-brand-600', bg: 'bg-brand-100' },
    { actor: 'Deterministic', text: 'Validator confirms the wording and values.', icon: ServerCog, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { actor: 'System', text: 'Case closes.', icon: ServerCog, color: 'text-slate-600', bg: 'bg-slate-200' },
    { actor: 'System', text: 'Unsupported immigration request creates a context-rich human handoff and editable HR draft.', icon: ServerCog, color: 'text-slate-600', bg: 'bg-slate-200' },
    { actor: 'System', text: 'California policy question resolves without a case.', icon: ServerCog, color: 'text-slate-600', bg: 'bg-slate-200' },
    { actor: 'Dashboard', text: 'Shows measured effort, baseline, automation mix, draft acceptance, and feedback.', icon: PlaySquare, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">19. Demo Script</h2>
        <p className="text-slate-600 mt-2">Concise 22-step demonstration sequence for hackathons and reviews.</p>
      </div>

      <Card noPadding>
        <div className="divide-y divide-slate-100">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div className={`p-2 rounded-lg ${step.bg} shrink-0`}>
                  <Icon className={`w-5 h-5 ${step.color}`} />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{step.actor}</span>
                  <p className="text-sm text-slate-800 font-medium mt-1">{step.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
