import React from 'react';
import { Card } from '../ui/Card.tsx';
import { GEMINI_RESPONSIBILITIES, DETERMINISTIC_RESPONSIBILITIES } from '../../constants.ts';
import { Bot, ServerCog, XCircle } from 'lucide-react';

export const ResponsibilityMatrix: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">7. Responsibility Matrix</h2>
        <p className="text-slate-600 mt-2">Strict control boundaries between LLM reasoning and deterministic services.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-t-4 border-t-brand-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-brand-100 p-2 rounded-lg"><Bot className="w-6 h-6 text-brand-700" /></div>
            <h3 className="text-lg font-bold text-slate-800">Gemini May:</h3>
          </div>
          <ul className="space-y-3">
            {GEMINI_RESPONSIBILITIES.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border-t-4 border-t-purple-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-2 rounded-lg"><ServerCog className="w-6 h-6 text-purple-700" /></div>
            <h3 className="text-lg font-bold text-slate-800">Deterministic Services Must Own:</h3>
          </div>
          <ul className="space-y-3">
            {DETERMINISTIC_RESPONSIBILITIES.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="bg-red-50 border-red-200">
        <div className="flex items-center gap-2 mb-4">
          <XCircle className="w-5 h-5 text-red-600" />
          <h3 className="font-bold text-red-900">Gemini May NOT:</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-red-800">
          <p>• Calculate compensation or payroll</p>
          <p>• Approve a correction</p>
          <p>• Change payroll or HR records directly</p>
          <p>• Construct unrestricted SQL</p>
          <p>• Override stale-data checks</p>
          <p>• Override idempotency</p>
          <p>• Decide sensitive employee-relations matters</p>
          <p>• Evaluate, rate, rank, score, or infer the attitude of an employee</p>
          <p>• Make legal conclusions</p>
          <p>• State that a payment completed when the system only confirms scheduling</p>
        </div>
      </Card>
    </div>
  );
};
