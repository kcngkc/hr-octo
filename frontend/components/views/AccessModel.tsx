import React from 'react';
import { Card } from '../ui/Card.tsx';
import { Key, Lock, UserCheck } from 'lucide-react';

export const AccessModel: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">6. Service Account & Access Model</h2>
        <p className="text-slate-600 mt-2">Dedicated least-privilege service accounts for system components.</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-3 px-4 text-sm font-semibold text-slate-800">Component / Role</th>
                <th className="py-3 px-4 text-sm font-semibold text-slate-800">Service Account</th>
                <th className="py-3 px-4 text-sm font-semibold text-slate-800">Required Permissions (Least Privilege)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-4 px-4 text-sm font-medium text-slate-900 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-brand-500" /> Agent Studio Runtime
                </td>
                <td className="py-4 px-4 text-sm font-mono text-slate-600">sa-hrocto-agent@...</td>
                <td className="py-4 px-4 text-sm text-slate-600">
                  Vertex AI User, Cloud Run Invoker (for ADK tools), RAG Data Viewer
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-sm font-medium text-slate-900 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-500" /> ADK / Orchestration
                </td>
                <td className="py-4 px-4 text-sm font-mono text-slate-600">sa-hrocto-adk@...</td>
                <td className="py-4 px-4 text-sm text-slate-600">
                  BigQuery Data Editor (hr_case, hr_audit), BigQuery Data Viewer (hr_core, hr_policy), Secret Manager Secret Accessor
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-sm font-medium text-slate-900 flex items-center gap-2">
                  <Key className="w-4 h-4 text-emerald-500" /> Data Ingestion Pipeline
                </td>
                <td className="py-4 px-4 text-sm font-mono text-slate-600">sa-hrocto-ingest@...</td>
                <td className="py-4 px-4 text-sm text-slate-600">
                  Storage Object Viewer (Staging Bucket), BigQuery Data Editor (All HR datasets)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
