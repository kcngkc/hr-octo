import React from 'react';
import { Card } from '../ui/Card.tsx';
import { Lock, Calculator, ShieldCheck, XCircle, CheckCircle2 } from 'lucide-react';

export const DeterministicControls: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">14. Deterministic Controls</h2>
        <p className="text-slate-600 mt-2">Strict separation of deterministic logic from LLM reasoning.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-800">Intake Validation (Before Accepting Root Output)</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> Verify conversation status</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> Verify specialist is registered</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> Clamp confidence to 0–1</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> Allow one primary clarification question</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> Reject restricted information requests</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> Force sensitive requests to ER and human escalation</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> Allow employee-requested human handoff</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> Enforce a configurable clarification-turn limit</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> Preserve all prior verified facts</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> Never create a case before confirmation (except mandatory escalation)</li>
          </ul>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-800">Payroll Calculation Service</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4">Payroll calculation must be deterministic. Calculate only from verified fields:</p>
          
          <div className="bg-slate-900 p-5 rounded-lg font-mono text-sm text-slate-300 space-y-2">
            <div className="flex justify-between"><span>approved overtime hours</span><span className="text-blue-400">verified</span></div>
            <div className="flex justify-between"><span>× regular hourly rate</span><span className="text-blue-400">verified</span></div>
            <div className="flex justify-between"><span>× overtime multiplier</span><span className="text-blue-400">verified</span></div>
            <div className="flex justify-between border-b border-slate-700 pb-2"><span>− overtime already paid</span><span className="text-blue-400">verified</span></div>
            <div className="flex justify-between pt-2 text-emerald-400 font-bold"><span>= proposed balance</span><span>calculated</span></div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-purple-600" />
          <h3 className="font-bold text-slate-800">Performance Workflow Gates</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-slate-700 mb-3 border-b pb-2">Deterministic Gates</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Review cycle</li>
              <li>• Participant eligibility</li>
              <li>• Assigned reviewer</li>
              <li>• Required forms</li>
              <li>• Completion status</li>
              <li>• Approval ownership</li>
              <li>• Deadline</li>
              <li>• Escalation path</li>
            </ul>
          </div>
          
          <div className="md:col-span-1 bg-emerald-50 p-4 rounded-lg border border-emerald-100">
            <h4 className="text-sm font-semibold text-emerald-800 mb-3 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Gemini May:</h4>
            <ul className="space-y-2 text-sm text-emerald-700">
              <li>• Explain process</li>
              <li>• Collect factual inputs</li>
              <li>• Summarize employee-provided content</li>
              <li>• Draft neutral process communications</li>
            </ul>
          </div>

          <div className="md:col-span-1 bg-red-50 p-4 rounded-lg border border-red-100">
            <h4 className="text-sm font-semibold text-red-800 mb-3 flex items-center gap-2"><XCircle className="w-4 h-4" /> Gemini May NOT:</h4>
            <ul className="space-y-2 text-sm text-red-700">
              <li>• Evaluate employee performance</li>
              <li>• Score or rank employees</li>
              <li>• Infer attitude, sentiment, motivation, or potential</li>
              <li>• Recommend promotion, termination, discipline, compensation, or rating</li>
              <li>• Compare employees</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
