import React from 'react';
import { Card } from '../ui/Card.tsx';
import { PAYROLL_WORKFLOW_STEPS } from '../../constants.ts';
import { GitMerge, ArrowDown, RefreshCw, PauseCircle, PlayCircle } from 'lucide-react';

export const WorkflowGraphs: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">13. Workflow Graphs</h2>
        <p className="text-slate-600 mt-2">Explicit orchestration paths for complex HR operations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <GitMerge className="w-5 h-5 text-brand-600" />
            <h3 className="font-bold text-slate-800">Payroll Workflow (Deterministic & Gated)</h3>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <div className="flex flex-wrap gap-2 items-center text-xs font-mono">
              {PAYROLL_WORKFLOW_STEPS.map((step, index) => {
                const isPause = step === 'pause';
                const isResume = step === 'resume_after_approval';
                const isDeterministic = step.includes('deterministic') || step.includes('validate') || step.includes('apply');
                
                let bgColor = 'bg-white border-slate-300 text-slate-700';
                if (isPause) bgColor = 'bg-amber-100 border-amber-300 text-amber-800 font-bold';
                if (isResume) bgColor = 'bg-emerald-100 border-emerald-300 text-emerald-800 font-bold';
                if (isDeterministic && !isPause && !isResume) bgColor = 'bg-purple-50 border-purple-200 text-purple-800';

                return (
                  <React.Fragment key={step}>
                    <div className={`px-3 py-2 rounded border shadow-sm flex items-center gap-2 ${bgColor}`}>
                      {isPause && <PauseCircle className="w-4 h-4" />}
                      {isResume && <PlayCircle className="w-4 h-4" />}
                      {step}
                    </div>
                    {index < PAYROLL_WORKFLOW_STEPS.length - 1 && (
                      <ArrowDown className="w-4 h-4 text-slate-400 -rotate-90" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <RefreshCw className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-800">NEEDS_EMPLOYEE_INPUT Loop</h3>
          </div>
          
          <div className="space-y-4 relative">
            <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-blue-200"></div>
            
            <div className="relative z-10 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">1</div>
              <div className="bg-white border border-slate-200 p-3 rounded-lg text-sm text-slate-700 shadow-sm w-full">
                Specialist returns <code className="text-xs bg-slate-100 px-1 rounded">NEEDS_EMPLOYEE_INPUT</code>
              </div>
            </div>
            
            <div className="relative z-10 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">2</div>
              <div className="bg-white border border-slate-200 p-3 rounded-lg text-sm text-slate-700 shadow-sm w-full">
                Preserve case and specialist state in BigQuery
              </div>
            </div>

            <div className="relative z-10 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">3</div>
              <div className="bg-white border border-slate-200 p-3 rounded-lg text-sm text-slate-700 shadow-sm w-full">
                Return question through Root Agent to Employee
              </div>
            </div>

            <div className="relative z-10 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">4</div>
              <div className="bg-white border border-slate-200 p-3 rounded-lg text-sm text-slate-700 shadow-sm w-full">
                Record question and answer
              </div>
            </div>

            <div className="relative z-10 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">5</div>
              <div className="bg-white border border-slate-200 p-3 rounded-lg text-sm text-slate-700 shadow-sm w-full">
                Resume the same specialist
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
            <strong>Escalation Rule:</strong> Escalate only when employee cannot provide info, sensitive judgment is required, evidence is inaccessible, policy conflicts, capability is unavailable, or clarification limit is reached.
          </div>
        </Card>
      </div>
    </div>
  );
};
