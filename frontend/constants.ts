import { TabId, NavItem, Dataset } from './types.ts';

export const NAV_ITEMS: NavItem[] = [
  { id: TabId.OVERVIEW, label: 'Product Objective', icon: 'Target' },
  { id: TabId.ARCHITECTURE, label: '1. Architecture Diagram', icon: 'Network' },
  { id: TabId.DATABASE, label: '2. BigQuery Datasets', icon: 'Database' },
  { id: TabId.INGESTION, label: '3. Source Manifest', icon: 'FileJson' },
  { id: TabId.VALIDATION, label: '4. Data Validation', icon: 'ShieldCheck' },
  { id: TabId.POLICY_RAG, label: '5. Policy Grounding', icon: 'BookOpen' },
  { id: TabId.ACCESS_MODEL, label: '6. Access Model', icon: 'Key' },
  { id: TabId.RESPONSIBILITY, label: '7. Responsibility Matrix', icon: 'SplitSquareHorizontal' },
  { id: TabId.FAILURES, label: '8. Failure Paths', icon: 'AlertTriangle' },
  { id: TabId.ARTIFACTS, label: '9. Artifact Inventory', icon: 'Archive' },
  { id: TabId.BUILD_NOTES, label: '10. Build Notes', icon: 'Wrench' },
  { id: TabId.AGENT_TOPOLOGY, label: '11. Agent Topology', icon: 'Network' },
  { id: TabId.CONTRACTS, label: '12. Structured Contracts', icon: 'FileCode2' },
  { id: TabId.WORKFLOWS, label: '13. Workflow Graphs', icon: 'GitMerge' },
  { id: TabId.DETERMINISTIC_CONTROLS, label: '14. Deterministic Controls', icon: 'Lock' },
  { id: TabId.SENSITIVE_HANDOFF, label: '15. Sensitive ER & Handoff', icon: 'ShieldAlert' },
  { id: TabId.ARTIFACTS_ACTIVITY, label: '16. Artifacts & Activity', icon: 'Activity' },
  { id: TabId.TESTING_EVAL, label: '17. Testing & Evaluation', icon: 'ListChecks' },
  { id: TabId.DEPLOYMENT_SECURITY, label: '18. Deployment & Security', icon: 'Server' },
  { id: TabId.DEMO_SCRIPT, label: '19. Demo Script', icon: 'PlaySquare' },
  { id: TabId.FINAL_SUMMARY, label: '20. Final Exit Gates', icon: 'Flag' },
];

export const DATASETS: Dataset[] = [
  {
    name: 'hr_core',
    tables: ['employee', 'employment', 'compensation', 'organization_assignment']
  },
  {
    name: 'hr_payroll',
    tables: ['pay_schedule', 'pay_period', 'workweek', 'time_entry', 'payroll_line']
  },
  {
    name: 'hr_policy',
    tables: ['policy_document', 'policy_section', 'policy_rule', 'source_manifest', 'enquiry_log']
  },
  {
    name: 'hr_case',
    tables: ['intake_session', 'case_record', 'case_event', 'correction_proposal', 'approval', 'escalation', 'reasoning_artifact', 'agent_activity', 'response_draft']
  },
  {
    name: 'hr_integration',
    tables: ['outbound_transaction', 'idempotency_ledger', 'employee_notification']
  },
  {
    name: 'hr_audit',
    tables: ['agent_action', 'case_effort', 'agent_feedback', 'evaluation_result']
  }
];

export const MANIFEST_FIELDS = [
  'source_id',
  'source_name',
  'source_type',
  'authoritative_owner',
  'source_location',
  'retrieval_date',
  'jurisdiction',
  'effective_date',
  'version',
  'checksum',
  'approval_status',
  'imported_at',
  'imported_by'
];

export const VALIDATION_RULES = [
  'Validate required files',
  'Verify checksums',
  'Validate schema',
  'Validate required relationships',
  'Check duplicate primary identifiers',
  'Check effective-date overlaps',
  'Check jurisdiction codes',
  'Confirm policy approval status',
  'Reject records containing prohibited personal fields',
  'Generate an import report',
  'Stop the load when a required relationship or policy source is invalid'
];

export const GEMINI_RESPONSIBILITIES = [
  'Interpret non-sensitive requests',
  'Ask clarification questions',
  'Extract entities',
  'Propose an investigation plan',
  'Select from an approved specialist list',
  'Synthesize verified evidence',
  'Draft non-sensitive communications',
  'Draft an HR response for human editing',
  'Explain workflow state'
];

export const DETERMINISTIC_RESPONSIBILITIES = [
  'Calculate compensation or payroll',
  'Approve a correction',
  'Change payroll or HR records directly',
  'Construct unrestricted SQL',
  'Override stale-data checks',
  'Override idempotency',
  'Decide sensitive employee-relations matters',
  'Evaluate, rate, rank, score, or infer attitude',
  'Make legal conclusions',
  'State that a payment completed (only confirm scheduling)',
  'Performance-review workflow gates & ownership',
  'Proposal versions & approval status',
  'Authority envelopes',
  'Integration writes & notification completion'
];

export const SPECIALIST_AGENTS = [
  'Payroll Agent',
  'HR Policy Agent',
  'Benefits and Compensation Agent',
  'Employee Relations Agent',
  'Talent Acquisition Agent',
  'Immigration and Global HR Agent',
  'Performance and Development Agent',
  'HR Operations and Analytics Agent',
  'HRIS Integration Agent'
];

export const ROOT_AGENT_RESPONSIBILITIES = [
  'Conduct multi-turn employee intake',
  'Interpret the employee’s goal using Gemini when allowed',
  'Identify known facts',
  'Identify missing information',
  'Ask exactly one primary clarification question per turn',
  'Qualify the request before case creation',
  'Prepare a confirmation summary',
  'Require employee confirmation before creating a non-sensitive case',
  'Delegate only to registered specialists',
  'Receive specialist results',
  'Ask the employee for missing employee-supplied information',
  'Coordinate context-rich human handoff',
  'Communicate confirmed outcomes',
  'Never calculate payroll',
  'Never approve a proposal',
  'Never bypass human or deterministic gates'
];

export const PAYROLL_WORKFLOW_STEPS = [
  'load_case',
  'interpret_request',
  'clarify_if_needed',
  'confirm_intent',
  'create_case',
  'delegate_to_payroll',
  'generate_investigation_plan',
  'retrieve_employee_context',
  'retrieve_compensation',
  'retrieve_approved_workweeks',
  'retrieve_payroll_lines',
  'retrieve_payroll_cutoff',
  'retrieve_approval_timestamp',
  'delegate_policy_search',
  'receive_policy_evidence',
  'deterministic_calculation',
  'Gemini_evidence_synthesis',
  'create_versioned_proposal',
  'request_hr_approval',
  'pause',
  'resume_after_approval',
  'validate_authority_envelope',
  'revalidate_source',
  'apply_idempotent_correction',
  'draft_employee_response',
  'deterministic_response_validation',
  'notify_employee',
  'close_case'
];

export const REASONING_ARTIFACTS = [
  'INTAKE_INTERPRETATION',
  'CONFIRMATION_SUMMARY',
  'INVESTIGATION_PLAN',
  'TOOL_RESULT_SUMMARY',
  'POLICY_TRACE',
  'FINDING',
  'APPROVAL_BRIEF',
  'ESCALATION_NARRATIVE',
  'EMPLOYEE_RESPONSE_DRAFT',
  'FINAL_RESPONSE'
];
