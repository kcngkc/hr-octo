export enum Role {
  EMPLOYEE = 'EMPLOYEE',
  HR_REVIEWER = 'HR_REVIEWER',
  DEMO_OPERATOR = 'DEMO_OPERATOR'
}

export interface User {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  timestamp: string;
  structuredData?: any;
  provenance?: string;
  caseLink?: string;
  type?: 'text' | 'confirmation';
  data?: any;
}

export interface Case {
  id: string;
  title: string;
  status: 'OPEN' | 'AWAITING_HR' | 'RESOLVED' | 'ESCALATED';
  createdAt: string;
  updatedAt: string;
  employeeId: string;
  specialist: string;
  summary: string;
  escalationData?: EscalationData;
}

export interface EscalationData {
  reason: string;
  employeeFacts: Record<string, string>;
  systemFacts: Record<string, string>;
  interpretation: string;
  questionsAsked: string[];
  answersReceived: string[];
  toolsUsed: string[];
  actionsAttempted: string[];
  unresolvedDecision: string;
  recommendedAction: string;
  receivingQueue: string;
}

export interface AgentActivity {
  id: string;
  sourceAgent: string;
  destinationAgent: string;
  action: string;
  detail: string;
  timestamp: string;
}

export enum TabId {
  OVERVIEW = 'overview',
  ARCHITECTURE = 'architecture',
  DATABASE = 'database',
  INGESTION = 'ingestion',
  VALIDATION = 'validation',
  POLICY_RAG = 'policy_rag',
  ACCESS_MODEL = 'access_model',
  RESPONSIBILITY = 'responsibility',
  FAILURES = 'failures',
  ARTIFACTS = 'artifacts',
  BUILD_NOTES = 'build_notes',
  AGENT_TOPOLOGY = 'agent_topology',
  CONTRACTS = 'contracts',
  WORKFLOWS = 'workflows',
  DETERMINISTIC_CONTROLS = 'deterministic_controls',
  SENSITIVE_HANDOFF = 'sensitive_handoff',
  ARTIFACTS_ACTIVITY = 'artifacts_activity',
  TESTING_EVAL = 'testing_eval',
  DEPLOYMENT_SECURITY = 'deployment_security',
  DEMO_SCRIPT = 'demo_script',
  FINAL_SUMMARY = 'final_summary'
}

export interface NavItem {
  id: TabId;
  label: string;
  icon: string;
}

export interface Dataset {
  name: string;
  tables: string[];
}
