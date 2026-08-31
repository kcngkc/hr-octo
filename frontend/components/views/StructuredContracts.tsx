import React from 'react';
import { Card } from '../ui/Card.tsx';
import { FileCode2, ArrowRightLeft, UserCheck } from 'lucide-react';

export const StructuredContracts: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">12. Structured Contracts</h2>
        <p className="text-slate-600 mt-2">Explicit JSON schemas required for agent handoffs and outputs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4">
            <FileCode2 className="w-5 h-5 text-brand-600" />
            <h3 className="font-bold text-slate-800">Conversational Intake Output</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">Required output from the Root Agent after intake.</p>
          <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto flex-1">
            <pre className="text-emerald-400 text-xs font-mono leading-relaxed">
{`{
  "conversation_status": "CLARIFYING | READY_FOR_CONFIRMATION | READY_FOR_HANDOFF | ESCALATE",
  "interpreted_intent": "...",
  "recommended_specialist": "...",
  "confidence": 0.0,
  "known_facts": {},
  "missing_fields": [
    {
      "field": "...",
      "reason": "...",
      "can_employee_answer": true
    }
  ],
  "clarifying_question": "...",
  "sensitive_signals": [],
  "confirmation_summary": "...",
  "next_action": "ASK_EMPLOYEE | CONFIRM_WITH_EMPLOYEE | HANDOFF | ESCALATE"
}`}
            </pre>
          </div>
        </Card>

        <Card className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4">
            <ArrowRightLeft className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-slate-800">Specialist Output</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">Required output from any Specialist Agent.</p>
          <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto flex-1">
            <pre className="text-purple-300 text-xs font-mono leading-relaxed">
{`{
  "resolution_status": "RESOLVED | NEEDS_EMPLOYEE_INPUT | ESCALATE | NOT_IMPLEMENTED",
  "handling_agent": "...",
  "case_id": "...",
  "reason_code": "...",
  "human_required": false,
  "summary": "...",
  "next_action": "...",
  "question_for_employee": "...",
  "requested_fields": [],
  "evidence_references": [],
  "result_payload": {}
}`}
            </pre>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center gap-2 mb-4">
          <UserCheck className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-slate-800">Human Handoff Contract</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">Strict separation of employee-provided facts, system-verified facts, and AI interpretations.</p>
        <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-amber-300 text-xs font-mono leading-relaxed">
{`{
  "case_id": "...",
  "employee_request": "...",
  "confirmed_intent": "...",
  "conversation_summary": "...",
  "employee_provided_facts": {},
  "system_verified_facts": {},
  "agent_interpretations": {},
  "questions_already_asked": [],
  "answers_received": [],
  "tools_used": [],
  "actions_attempted": [],
  "evidence_references": [],
  "reason_for_escalation": "...",
  "unresolved_decision": "...",
  "recommended_human_action": "...",
  "draft_employee_response": "..."
}`}
          </pre>
        </div>
      </Card>
    </div>
  );
};
