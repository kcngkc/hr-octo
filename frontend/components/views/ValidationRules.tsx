import React from 'react';
import { Card } from '../ui/Card.tsx';
import { VALIDATION_RULES } from '../../constants.ts';
import { ShieldCheck, XCircle, CheckCircle2 } from 'lucide-react';

export const ValidationRules: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">4. Data Validation & Rejection Rules</h2>
        <p className="text-slate-600 mt-2">Deterministic gates that must pass before data enters the system of record.</p>
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <h3 className="text-lg font-semibold text-slate-800">The Seed Process Must:</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {VALIDATION_RULES.map((rule, index) => {
            const isRejection = rule.toLowerCase().includes('reject') || rule.toLowerCase().includes('stop');
            return (
              <div key={index} className={`flex items-start gap-3 p-3 rounded-lg border ${isRejection ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
                {isRejection ? (
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                )}
                <span className={`text-sm ${isRejection ? 'text-red-900 font-medium' : 'text-slate-700'}`}>
                  {index + 1}. {rule}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 font-medium flex items-center justify-center">
          All imports must be idempotent.
        </div>
      </Card>
    </div>
  );
};
