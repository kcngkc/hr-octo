import React from 'react';
import { Card } from '../ui/Card.tsx';
import { Server, ShieldCheck, Lock, FileCode2 } from 'lucide-react';

export const DeploymentSecurity: React.FC = () => {
  const deploymentItems = [
    'Executable source',
    'Database migrations',
    'Seed import pipeline',
    'Automated tests',
    'Deployment manifest',
    'Cloud Build configuration',
    'Cloud Run or Agent Platform Runtime configuration',
    'Least-privilege service account specification',
    'Environment-variable manifest',
    'Secret Manager references',
    'Health checks',
    'Structured logging',
    'Log-based alert recommendations',
    'Rollback procedure',
    'Cost controls',
    'README',
    'Architecture diagram',
    'Operator guide',
    'Demo guide'
  ];

  const securityRules = [
    'Use least privilege.',
    'Do not place credentials in source.',
    'Restrict tool access.',
    'Do not log prompts, personal information, payroll values, sensitive complaints, or credentials.',
    'Use human approval for consequential actions.',
    'Use restricted visibility for sensitive employee-relations cases.'
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">18. Deployment & Security</h2>
        <p className="text-slate-600 mt-2">Production readiness checklist and strict security boundaries.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Server className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-800">Deployment Preparation</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {deploymentItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                <FileCode2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 bg-emerald-50/30">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-emerald-900">Security Rules</h3>
          </div>
          <ul className="space-y-3">
            {securityRules.map((rule, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-emerald-800 font-medium">
                <Lock className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};
