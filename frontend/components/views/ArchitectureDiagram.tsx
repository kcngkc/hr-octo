import React from 'react';
import { Card } from '../ui/Card.tsx';
import { Database, Server, Bot, FileText, Users, ArrowRight, ShieldAlert } from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">1. Architecture Diagram</h2>
        <p className="text-slate-600 mt-2">High-level component interaction and data flow for HR Octo.</p>
      </div>

      <Card className="bg-slate-50">
        <div className="flex flex-col items-center p-8 space-y-12">
          
          {/* User Layer */}
          <div className="flex flex-col items-center">
            <div className="bg-white border-2 border-slate-300 rounded-full p-4 shadow-sm z-10">
              <Users className="w-8 h-8 text-slate-600" />
            </div>
            <span className="font-medium mt-2 text-slate-700">Employee / HR Staff</span>
          </div>

          <div className="w-0.5 h-8 bg-slate-300"></div>

          {/* Agent Layer */}
          <div className="w-full max-w-3xl border-2 border-brand-200 bg-brand-50 rounded-xl p-6 relative">
            <div className="absolute -top-3 left-6 bg-brand-100 text-brand-800 text-xs font-bold px-2 py-1 rounded border border-brand-200">
              Gemini Enterprise Agent Studio
            </div>
            <div className="flex justify-center gap-8">
              <div className="flex flex-col items-center bg-white p-4 rounded-lg border border-brand-200 shadow-sm w-40">
                <Bot className="w-8 h-8 text-brand-600 mb-2" />
                <span className="text-sm font-semibold text-center">Root Agent</span>
                <span className="text-xs text-slate-500 text-center mt-1">Intake & Routing</span>
              </div>
              <div className="flex flex-col items-center bg-white p-4 rounded-lg border border-brand-200 shadow-sm w-40">
                <Bot className="w-8 h-8 text-brand-600 mb-2" />
                <span className="text-sm font-semibold text-center">Specialist Agents</span>
                <span className="text-xs text-slate-500 text-center mt-1">Payroll, Policy, etc.</span>
              </div>
            </div>
          </div>

          <div className="flex gap-32">
            <div className="w-0.5 h-12 bg-slate-300"></div>
            <div className="w-0.5 h-12 bg-slate-300"></div>
          </div>

          {/* Orchestration & Logic Layer */}
          <div className="w-full max-w-4xl flex gap-6 justify-center">
            
            {/* RAG Engine */}
            <div className="flex-1 border-2 border-purple-200 bg-purple-50 rounded-xl p-6 relative flex flex-col items-center">
              <div className="absolute -top-3 left-6 bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded border border-purple-200">
                RAG Engine / Agent Search
              </div>
              <FileText className="w-10 h-10 text-purple-600 mb-3" />
              <span className="text-sm font-semibold text-center">Policy Grounding</span>
              <span className="text-xs text-slate-600 text-center mt-2">Retrieves approved handbook evidence</span>
            </div>

            {/* ADK / Cloud Run */}
            <div className="flex-1 border-2 border-blue-200 bg-blue-50 rounded-xl p-6 relative flex flex-col items-center">
              <div className="absolute -top-3 left-6 bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded border border-blue-200">
                Agent Development Kit (ADK) / Cloud Run
              </div>
              <Server className="w-10 h-10 text-blue-600 mb-3" />
              <span className="text-sm font-semibold text-center">Deterministic Orchestration</span>
              <span className="text-xs text-slate-600 text-center mt-2">Workflow gates, calculations, API calls</span>
            </div>

          </div>

          <div className="flex gap-32">
            <div className="w-0.5 h-12 bg-slate-300"></div>
            <div className="w-0.5 h-12 bg-slate-300"></div>
          </div>

          {/* Data Layer */}
          <div className="w-full max-w-4xl flex gap-6 justify-center">
            
            {/* Cloud Storage */}
            <div className="flex-1 border-2 border-emerald-200 bg-emerald-50 rounded-xl p-6 relative flex flex-col items-center">
              <div className="absolute -top-3 left-6 bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded border border-emerald-200">
                Cloud Storage
              </div>
              <Database className="w-10 h-10 text-emerald-600 mb-3" />
              <span className="text-sm font-semibold text-center">Source Ingestion</span>
              <span className="text-xs text-slate-600 text-center mt-2">Controlled source-file ingestion</span>
            </div>

            {/* BigQuery */}
            <div className="flex-[2] border-2 border-amber-200 bg-amber-50 rounded-xl p-6 relative flex flex-col items-center">
              <div className="absolute -top-3 left-6 bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded border border-amber-200">
                BigQuery (System of Record)
              </div>
              <div className="flex gap-4 mt-2">
                <div className="bg-white px-3 py-2 rounded border border-amber-200 text-xs font-medium">hr_core</div>
                <div className="bg-white px-3 py-2 rounded border border-amber-200 text-xs font-medium">hr_payroll</div>
                <div className="bg-white px-3 py-2 rounded border border-amber-200 text-xs font-medium">hr_policy</div>
                <div className="bg-white px-3 py-2 rounded border border-amber-200 text-xs font-medium">hr_case</div>
              </div>
              <span className="text-xs text-slate-600 text-center mt-4">Durable operational and analytical state</span>
            </div>

          </div>

        </div>
      </Card>

      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md">
        <div className="flex items-start">
          <ShieldAlert className="w-5 h-5 text-red-600 mt-0.5 mr-3 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-red-800">Critical Architecture Constraint</h4>
            <p className="text-sm text-red-700 mt-1">
              Do not create an architecture where conversation history is the system of record. BigQuery must be the system of record for durable workflow state.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
