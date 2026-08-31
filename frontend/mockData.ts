import { Case, AgentActivity } from './types.ts';

export const MOCK_CASES: Case[] = [
  {
    id: 'CAS-2024-0891',
    title: 'Overtime Pay Discrepancy - Oct 2024',
    status: 'AWAITING_HR',
    createdAt: '2024-10-24T09:30:00Z',
    updatedAt: '2024-10-24T10:15:00Z',
    employeeId: 'EMP-7721',
    specialist: 'Payroll Agent',
    summary: 'Employee reported missing 4 hours of overtime on the Oct 15 paycheck.'
  },
  {
    id: 'CAS-2024-0892',
    title: 'Visa Sponsorship Inquiry',
    status: 'ESCALATED',
    createdAt: '2024-10-24T11:00:00Z',
    updatedAt: '2024-10-24T11:05:00Z',
    employeeId: 'EMP-9932',
    specialist: 'Immigration and Global HR Agent',
    summary: 'Employee requesting H1-B transfer timeline and legal implications.',
    escalationData: {
      reason: 'LEGAL_ADVICE_REQUESTED',
      employeeFacts: { 'Visa Type': 'H1-B', 'Current Status': 'Active with previous employer' },
      systemFacts: { 'Hire Date': 'Pending', 'Role': 'Senior Engineer' },
      interpretation: 'Employee is asking for specific legal timelines and risks associated with visa transfer.',
      questionsAsked: ['Are you currently in the US?', 'Have you received your offer letter?'],
      answersReceived: ['Yes, I am in Seattle.', 'Yes, signed yesterday.'],
      toolsUsed: ['get_visa_milestones'],
      actionsAttempted: ['Retrieved standard H1-B transfer milestones.'],
      unresolvedDecision: 'Cannot provide legal advice or guarantee timelines.',
      recommendedAction: 'Review case and assign to external immigration counsel.',
      receivingQueue: 'IMMIGRATION_LEGAL_TIER3'
    }
  },
  {
    id: 'CAS-2024-0882',
    title: 'Parental Leave Inquiry',
    status: 'RESOLVED',
    createdAt: '2024-10-20T14:20:00Z',
    updatedAt: '2024-10-21T11:00:00Z',
    employeeId: 'EMP-7721',
    specialist: 'HR Policy Agent',
    summary: 'Clarification on WA PFML concurrent usage with company PTO.'
  }
];

export const MOCK_ACTIVITY: AgentActivity[] = [
  { id: 'act-1', sourceAgent: 'Root Agent', destinationAgent: 'Root Agent', action: 'clarified request', detail: 'Asked employee to confirm exact dates of missing overtime.', timestamp: '09:31 AM' },
  { id: 'act-2', sourceAgent: 'Root Agent', destinationAgent: 'Payroll Agent', action: 'handed off', detail: 'Delegated confirmed overtime discrepancy case.', timestamp: '09:35 AM' },
  { id: 'act-3', sourceAgent: 'Payroll Agent', destinationAgent: 'Payroll Agent', action: 'created investigation plan', detail: 'Plan: Retrieve timesheets, retrieve paystubs, compare hours, check policy.', timestamp: '09:36 AM' },
  { id: 'act-4', sourceAgent: 'Payroll Agent', destinationAgent: 'Payroll Agent', action: 'retrieved records', detail: 'Fetched approved workweeks and payroll lines for Oct 1-15.', timestamp: '09:36 AM' },
  { id: 'act-5', sourceAgent: 'Payroll Agent', destinationAgent: 'HR Policy Agent', action: 'handed policy question', detail: 'Requested WA state overtime multiplier rules.', timestamp: '09:37 AM' },
  { id: 'act-6', sourceAgent: 'HR Policy Agent', destinationAgent: 'Payroll Agent', action: 'returned approved policy evidence', detail: 'WA Overtime is 1.5x regular rate over 40 hours.', timestamp: '09:38 AM' },
  { id: 'act-7', sourceAgent: 'Payroll Agent', destinationAgent: 'Payroll Agent', action: 'invoked deterministic calculation', detail: 'Calculated 4 hours * $35 * 1.5 = $210.00 owed.', timestamp: '09:39 AM' },
  { id: 'act-8', sourceAgent: 'Payroll Agent', destinationAgent: 'Payroll Agent', action: 'generated grounded finding', detail: 'Confirmed 4 hours approved but unpaid due to late timesheet sync.', timestamp: '09:40 AM' },
  { id: 'act-9', sourceAgent: 'Root Agent', destinationAgent: 'Root Agent', action: 'prepared approval brief', detail: 'Drafted summary and proposal for HR Review.', timestamp: '09:41 AM' },
];

export const MOCK_DASHBOARD_DATA = {
  executive: {
    totalEnquiries: 1420,
    policyResolvedNoCase: 315,
    casesCreated: 1105,
    autonomousResolutions: 751,
    agentPreparedHumanApproved: 210,
    agentAssisted: 85,
    humanLed: 25,
    escalated: 34,
    unsupported: 0,
    openHumanQueue: 12
  },
  humanEffort: {
    baselineMinutes: 16575,
    actualMinutes: 3850,
    minutesSaved: 12725,
    hoursSaved: 212,
    avgMinutesPerCase: 3.4,
    casesNoHumanWork: 751,
    casesAgentReducedWork: 320,
    casesAgentIncreasedWork: 0
  },
  agentOperations: {
    clarificationCompletionRate: 94,
    avgClarificationTurns: 1.2,
    policyGroundingSuccess: 98.5,
    specialistHandoffCount: 1250,
    missingInfoRecoveryRate: 91,
    staleSourceBlocks: 14,
    duplicateWritePrevention: 3
  },
  casesBySpecialist: [
    { name: 'Payroll', value: 420 },
    { name: 'Policy', value: 380 },
    { name: 'Benefits', value: 290 },
    { name: 'Employee Rel', value: 85 },
    { name: 'Performance', value: 150 },
  ],
  draftQuality: [
    { name: 'Accepted w/o edit', value: 65, fill: '#10b981' },
    { name: 'Minor edit', value: 20, fill: '#3b82f6' },
    { name: 'Materially edited', value: 10, fill: '#f59e0b' },
    { name: 'Rejected', value: 5, fill: '#ef4444' },
  ]
};
