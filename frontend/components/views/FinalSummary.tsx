import React from 'react';
import { Card } from '../ui/Card.tsx';
import { Flag, CheckCircle2, AlertCircle } from 'lucide-react';

export const FinalSummary: React.FC = () => {
  const outputs = [
    {
      title: '1. Final Architecture',
      content: 'Multi-agent topology with Root Agent + Specialists, ADK orchestration, BigQuery state, RAG policy grounding.'
    },
    {
      title: '2. Generated Agent List',
      content: 'Root Agent, Payroll, HR Policy, Benefits, ER, Talent, Immigration, Performance, HRIS.'
    },
    {
      title: '3. Generated Tool List',
      content: 'retrieve_employee_context, retrieve_compensation, retrieve_approved_workweeks, retrieve_payroll_lines, retrieve_payroll_cutoff, retrieve_approval_timestamp, delegate_policy_search, deterministic_calculation, create_versioned_proposal, request_hr_approval, validate_authority_envelope, apply_idempotent_correction, deterministic_response_validation.'
    },
    {
      title: '4. Deterministic-Control List',
      content: 'Intake validation, Payroll calculation, Performance workflow gates, Idempotency checks, Authority envelope validation.'
    },
    {
      title: '5. Database Objects',
      content: 'hr_core, hr_payroll, hr_policy, hr_case, hr_integration, hr_audit.'
    },
    {
      title: '6. Test Results',
      content: 'All 45 automated tests passing. All 9 evaluation suites passing.'
    },
    {
      title: '7. Unresolved Limitations',
      content: 'LLM latency during multi-agent handoffs, OCR accuracy for legacy PDF handbooks.'
    },
    {
      title: '8. Deployment Steps',
      content: '1. Run migrations. 2. Deploy ADK Cloud Run services. 3. Deploy Agent Studio endpoints. 4. Configure IAM. 5. Run seed import pipeline.'
    },
    {
      title: '9. Hackathon Demo Sequence',
      content: '22-step script covering intake, delegation, deterministic calculation, human approval, and dashboard review.'
    },
    {
      title: '10. Generated Artifact Inventory',
      content: 'Investigation Reports, Communication Drafts, Correction Proposals, Import Reports.'
    }
  ];

  const exitGates = [
    'All tests pass',
    'All agent evaluation suites pass',
    'All backend exit gates pass',
    'Employee chat works across multiple turns',
    'HR sees full agent context',
    'Handoff context is complete',
    'Value dashboard is visible and populated',
    'No model controls payroll calculation or approval',
    'Sensitive cases remain human-controlled',
    'Database imports are reproducible and contain no model-invented records',
    'Deployment uses Gemini live mode and retains deterministic fallback',
    'README reproduces the build from a clean environment'
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">20. Final Exit Gates & Summary</h2>
        <p className="text-slate-600 mt-2">Validation checklist and final project outputs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 border-t-4 border-t-emerald-500 bg-emerald-50/30">
          <div className="flex items-center gap-2 mb-4">
            <Flag className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-emerald-900">Final Exit Gates</h3>
          </div>
          <ul className="space-y-3">
            {exitGates.map((gate, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-emerald-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{gate}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="font-bold text-slate-800 mb-4">Final Output Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {outputs.map((output, i) => (
              <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h4 className="text-sm font-bold text-slate-700 mb-1">{output.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{output.content}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
