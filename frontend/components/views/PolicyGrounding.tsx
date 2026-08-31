import React from 'react';
import { Card } from '../ui/Card.tsx';
import { BookOpen, Filter, ShieldAlert } from 'lucide-react';

export const PolicyGrounding: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">5. Policy Grounding Design</h2>
        <p className="text-slate-600 mt-2">RAG / Agent Search architecture for approved handbook retrieval.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Source Documents" className="lg:col-span-1">
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-brand-600" />
                <h4 className="font-semibold text-sm text-slate-800">Washington Handbook</h4>
              </div>
              <p className="text-xs text-slate-600">Includes WA Paid Sick Leave, PFML, Domestic Violence Leave, Overtime rules.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-brand-600" />
                <h4 className="font-semibold text-sm text-slate-800">California Handbook</h4>
              </div>
              <p className="text-xs text-slate-600">Includes CA PSL, CFRA, PDL, Reproductive Loss Leave, Overtime & Minimum Wage thresholds.</p>
            </div>
          </div>
        </Card>

        <Card title="Policy Record Metadata" className="lg:col-span-2">
          <p className="text-sm text-slate-600 mb-4">Policy records must preserve the following fields for accurate retrieval and grounding:</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {['document ID', 'title', 'jurisdiction', 'version', 'effective dates', 'approval status', 'section ID', 'section heading', 'exact approved section text', 'topic', 'source manifest reference'].map(field => (
              <div key={field} className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                <span className="font-mono text-xs text-slate-700 bg-slate-100 px-2 py-1 rounded">{field}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-3">
              <Filter className="w-5 h-5 text-blue-600" />
              Retrieval Filters
            </h3>
            <p className="text-sm text-slate-600 mb-4">Policy retrieval must strictly filter by:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-blue-50 px-3 py-2 rounded border border-blue-100">1. Jurisdiction</li>
              <li className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-blue-50 px-3 py-2 rounded border border-blue-100">2. Effective Date</li>
              <li className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-blue-50 px-3 py-2 rounded border border-blue-100">3. Approval Status</li>
              <li className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-blue-50 px-3 py-2 rounded border border-blue-100">4. Topic</li>
            </ul>
          </div>
          
          <div className="flex-1 bg-red-50 border border-red-200 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-6 h-6 text-red-600 shrink-0" />
              <div>
                <h4 className="font-bold text-red-900">Strict LLM Constraint</h4>
                <p className="text-sm text-red-800 mt-2 leading-relaxed">
                  Do not permit the LLM to answer policy questions without retrieved evidence. All answers must be grounded in the exact approved section text retrieved via the RAG Engine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
