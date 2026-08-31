import React from 'react';
import { Card } from '../ui/Card.tsx';
import { MANIFEST_FIELDS } from '../../constants.ts';
import { FileJson, ArrowDown, Database } from 'lucide-react';

export const IngestionDesign: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">3. Source Manifest & Ingestion Design</h2>
        <p className="text-slate-600 mt-2">Design for controlled source-file ingestion into the system of record.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Source Manifest Schema">
          <p className="text-sm text-slate-600 mb-4">Create a source manifest for every seed file to ensure traceability and governance.</p>
          <div className="bg-slate-900 rounded-lg p-4 overflow-hidden">
            <pre className="text-emerald-400 text-xs font-mono leading-relaxed">
              {`{
  "schema": "hr_policy.source_manifest",
  "fields": [`}
              {MANIFEST_FIELDS.map((field, i) => (
                <div key={field} className="pl-4">
                  <span className="text-blue-300">"{field}"</span>
                  <span className="text-slate-400">: "string"{i < MANIFEST_FIELDS.length - 1 ? ',' : ''}</span>
                </div>
              ))}
              {`  ]
}`}
            </pre>
          </div>
        </Card>

        <Card title="Ingestion Flow">
          <div className="flex flex-col items-center space-y-4 py-4">
            <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-md"><FileJson className="w-5 h-5 text-blue-700" /></div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Source Files</p>
                  <p className="text-xs text-slate-500">CSV, JSON, SQL, Handbooks</p>
                </div>
              </div>
            </div>
            
            <ArrowDown className="w-5 h-5 text-slate-400" />
            
            <div className="w-full bg-brand-50 border border-brand-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-brand-100 p-2 rounded-md"><Database className="w-5 h-5 text-brand-700" /></div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Cloud Storage Staging</p>
                  <p className="text-xs text-slate-500">Controlled ingestion bucket</p>
                </div>
              </div>
            </div>

            <ArrowDown className="w-5 h-5 text-slate-400" />

            <div className="w-full bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-md"><Database className="w-5 h-5 text-purple-700" /></div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Validation & Idempotency Check</p>
                  <p className="text-xs text-slate-500">ADK / Cloud Run deterministic gates</p>
                </div>
              </div>
            </div>

            <ArrowDown className="w-5 h-5 text-slate-400" />

            <div className="w-full bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-2 rounded-md"><Database className="w-5 h-5 text-amber-700" /></div>
                <div>
                  <p className="text-sm font-bold text-slate-800">BigQuery Target Tables</p>
                  <p className="text-xs text-slate-500">hr_core, hr_policy, etc.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
