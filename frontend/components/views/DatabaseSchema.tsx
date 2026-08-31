import React from 'react';
import { Card } from '../ui/Card.tsx';
import { DATASETS } from '../../constants.ts';
import { Database, Table2, AlertTriangle } from 'lucide-react';

export const DatabaseSchema: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">2. BigQuery Datasets & Tables</h2>
        <p className="text-slate-600 mt-2">Preferred data architecture for durable operational and analytical state.</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start gap-3 text-amber-800 text-sm">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold mb-1">Data Rules & Constraints</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Do not use model-generated database records.</li>
            <li>Seed the database from authoritative public policy, approved handbooks, sanitized operational seed files, or reproducible source-controlled files.</li>
            <li>Do not ingest names, personal email addresses, addresses, government identifiers, bank details, medical data, immigration documents, confidential complaints, or live payroll records into the Agent Studio demo.</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DATASETS.map((dataset) => (
          <Card key={dataset.name} className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <Database className="w-5 h-5 text-brand-600" />
              <h3 className="font-bold text-slate-800">{dataset.name}</h3>
            </div>
            <ul className="space-y-2 flex-1">
              {dataset.tables.map((table) => (
                <li key={table} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-md border border-slate-100">
                  <Table2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-mono text-xs">{table}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
};
