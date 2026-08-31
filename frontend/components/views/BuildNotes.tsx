import React from 'react';
import { Card } from '../ui/Card.tsx';
import { Wrench, Code2, Database, ShieldCheck } from 'lucide-react';

export const BuildNotes: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">10. Build Notes</h2>
        <p className="text-slate-600 mt-2">Capabilities requiring Agent Development Kit (ADK) or external code vs native Agent Studio.</p>
      </div>

      <Card>
        <div className="space-y-6">
          
          <div className="flex gap-4">
            <div className="mt-1"><Code2 className="w-6 h-6 text-blue-600" /></div>
            <div>
              <h3 className="font-bold text-slate-800">Explicit Orchestration (ADK Required)</h3>
              <p className="text-sm text-slate-600 mt-1">
                Agent Studio's native routing is insufficient for the strict "Root Agent fallback" and "Named Human Queue" requirements. ADK or Agent Platform graph workflow must be used to explicitly orchestrate the handoffs, preserve complete context, and enforce the fallback to the Root Agent.
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-slate-100"></div>

          <div className="flex gap-4">
            <div className="mt-1"><Database className="w-6 h-6 text-amber-600" /></div>
            <div>
              <h3 className="font-bold text-slate-800">BigQuery System of Record (External Code Required)</h3>
              <p className="text-sm text-slate-600 mt-1">
                Agent Studio does not natively use BigQuery as its durable state store for conversation history. External Cloud Run services (called via Tools/Extensions) must be built to read/write workflow state, case records, and idempotency ledgers to BigQuery.
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-slate-100"></div>

          <div className="flex gap-4">
            <div className="mt-1"><ShieldCheck className="w-6 h-6 text-emerald-600" /></div>
            <div>
              <h3 className="font-bold text-slate-800">Deterministic Gates (External Code Required)</h3>
              <p className="text-sm text-slate-600 mt-1">
                The LLM cannot approve corrections or calculate payroll. All deterministic actions (validating stale data, checking idempotency, calculating compensation, executing integration writes) must be implemented in external Cloud Run services and exposed to the agents as strictly typed Tools.
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-slate-100"></div>

          <div className="flex gap-4">
            <div className="mt-1"><Wrench className="w-6 h-6 text-purple-600" /></div>
            <div>
              <h3 className="font-bold text-slate-800">Data Ingestion Pipeline (External Code Required)</h3>
              <p className="text-sm text-slate-600 mt-1">
                The 10-step data validation and rejection rules for seed files (checksums, schema validation, PII rejection) require a dedicated data pipeline (e.g., Cloud Dataflow or Cloud Run batch jobs) outside of Agent Studio before data lands in BigQuery or the RAG Engine.
              </p>
            </div>
          </div>

        </div>
      </Card>
    </div>
  );
};
