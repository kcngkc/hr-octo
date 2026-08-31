import React from 'react';
import { Card } from '../ui/Card.tsx';
import { CheckCircle2, ListChecks, Target } from 'lucide-react';

export const TestingEval: React.FC = () => {
  const testCategories = [
    {
      title: 'Conversational Intake',
      items: [
        'Incomplete payroll request asks a clarification question',
        'One primary question per turn',
        'Facts persist across turns',
        'Complete request reaches confirmation',
        'Case is not created before confirmation',
        'Direct policy answer does not create a case',
        'Sensitive request forces restricted escalation',
        'Clarification limit creates context-rich human handoff',
        'Employee-requested human handoff works'
      ]
    },
    {
      title: 'Routing and Handoff',
      items: [
        'Valid specialist selected',
        'Invalid specialist rejected or falls back',
        'NEEDS_EMPLOYEE_INPUT returns to employee',
        'Same specialist resumes after employee answer',
        'NOT_IMPLEMENTED reaches Root Agent and human queue',
        'Handoff retains conversation, verified facts, actions, and evidence',
        'Employee does not need to repeat information'
      ]
    },
    {
      title: 'Payroll',
      items: [
        'Deterministic calculation returns expected result from fixture data',
        'Proposal version is preserved',
        'Approval is required and survives process restart',
        'Authority envelope rejects unauthorized field or amount',
        'Stale source blocks execution',
        'Duplicate resume creates one outbound transaction',
        'Integration confirmation is distinguished from completed payment',
        'Employee response contains amount and scheduled date',
        'Employee response says scheduled to be paid',
        'Response rejects already-paid language'
      ]
    },
    {
      title: 'Performance Workflow',
      items: [
        'Eligibility and workflow gates are deterministic',
        'Reviewer ownership and deadline are explicit',
        'Gemini does not score, rank, compare, or recommend employment decisions'
      ]
    },
    {
      title: 'Policy',
      items: [
        'Washington and California jurisdiction filters work',
        'Effective and approved policy filters work',
        'Answer includes evidence reference',
        'Missing or conflicting evidence escalates',
        'Model memory is never used without retrieved evidence'
      ]
    },
    {
      title: 'Human Review',
      items: [
        'Investigation report includes plan, finding, evidence, policy trace, agent activity, and escalation narrative',
        'Human can approve or reject',
        'Human can accept, edit, regenerate, reject, and send a draft',
        'Final response provenance is stored',
        'Sensitive case visibility is restricted'
      ]
    },
    {
      title: 'Audit and Learning',
      items: [
        'Every material action creates an audit row',
        'Every handoff records source and destination',
        'Draft acceptance classification works',
        'Route-quality feedback is saved',
        'Recommendation outcome is saved',
        'Trajectory evaluation checks specialist and tool order',
        'Response evaluation checks correctness, grounding, and safety'
      ]
    },
    {
      title: 'Value Metrics',
      items: [
        'No metric appears without a baseline',
        'Baseline method and version are shown',
        'Minutes saved is baseline minus actual',
        'Display value is bounded at zero (negative internal values remain available)',
        'Agent offload rate includes autonomous plus agent-prepared, human-approved',
        'Autonomous resolution remains a separate metric',
        'No hardcoded 70–80% result'
      ]
    },
    {
      title: 'Regression',
      items: [
        'No st.switch_page references',
        'No deprecated use_container_width',
        'No required UI access to absent proposal fields',
        'All previous backend exit gates remain green',
        'Retry and idempotency remain intact'
      ]
    }
  ];

  const evalSets = [
    'Intake trajectory',
    'Correct specialist selection',
    'Clarification quality',
    'Tool sequence',
    'Policy grounding',
    'Payroll response safety',
    'Escalation handoff completeness',
    'Draft usefulness',
    'Performance-review boundary adherence'
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">17. Testing & Evaluation</h2>
        <p className="text-slate-600 mt-2">Comprehensive automated test suites and agent evaluation criteria.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {testCategories.map((category, idx) => (
            <Card key={idx} title={category.title}>
              <ul className="space-y-2">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="border-t-4 border-t-primary-500">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary-600" />
              <h3 className="font-bold text-slate-800">Agent Evaluation Sets</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Evaluate both <strong>trajectory</strong> (correct agents/tools in order) and <strong>response</strong> (correct, grounded, safe, appropriate).
            </p>
            <ul className="space-y-2">
              {evalSets.map((set, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 px-3 py-2 rounded border border-slate-100">
                  <ListChecks className="w-4 h-4 text-slate-400 shrink-0" />
                  {set}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};
