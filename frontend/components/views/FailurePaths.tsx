import React from 'react';
import { Card } from '../ui/Card.tsx';
import { AlertTriangle, ArrowRight, UserX, ShieldAlert } from 'lucide-react';

export const FailurePaths: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">8. Failure & Exception Paths</h2>
        <p className="text-slate-600 mt-2">Rules for handling unresolved requests, exceptions, and safety gates.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card title="Unresolved Request Flow">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-center md:text-left">
              <div className="font-semibold text-slate-800">Specialist Agent</div>
              <div className="text-xs text-slate-500">Cannot resolve request</div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 hidden md:block" />
            <div className="text-center">
              <div className="font-semibold text-brand-700 bg-brand-100 px-4 py-2 rounded-md">Root Agent</div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 hidden md:block" />
            <div className="flex flex-col gap-2">
              <div className="font-semibold text-slate-700 bg-white border border-slate-300 px-4 py-2 rounded-md text-sm text-center">
                Ask Employee for Info
              </div>
              <div className="text-xs text-slate-400 text-center">OR</div>
              <div className="font-semibold text-amber-700 bg-amber-100 border border-amber-200 px-4 py-2 rounded-md text-sm text-center">
                Route to Named Human Queue
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-4 text-center font-medium">
            Never silently fail or return NOT_IMPLEMENTED without an explanation and human fallback.
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-amber-500">
            <div className="flex items-center gap-2 mb-3">
              <UserX className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-slate-800">Exception Ownership</h3>
            </div>
            <p className="text-sm text-slate-700">
              If an exception removes correction ownership, <strong>reject the exception</strong>. A consequential action must always have a named decision owner and approval gate.
            </p>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-slate-800">Release Blocking Defects</h3>
            </div>
            <p className="text-sm text-slate-700">
              Block release when a defect can materially affect:
            </p>
            <ul className="list-disc pl-5 mt-2 text-sm text-slate-600 space-y-1">
              <li>Payroll</li>
              <li>Territory assignment</li>
              <li>Billing</li>
              <li>Security</li>
              <li>Privacy</li>
              <li>Compliance</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};
