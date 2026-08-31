import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';
import { DB } from './database.ts';
import { calculatePayrollOvertimeAdjustment, validateIntakeContract } from './deterministicEngine.ts';
import { store } from './store.ts';

let ai: GoogleGenAI | null = null;
try {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });
} catch (error) {
  console.warn("GoogleGenAI initialization failed. Ensure process.env.API_KEY is set.");
}

export interface IntakeResponse {
  conversation_status: string;
  interpreted_intent: string;
  recommended_specialist: string;
  confidence: number;
  known_facts: Record<string, string>;
  missing_fields: Array<{ field: string; reason: string; can_employee_answer: boolean }>;
  clarifying_question: string;
  sensitive_signals: string[];
  confirmation_summary: string;
  next_action: string;
}

const intakeSchema = {
  type: Type.OBJECT,
  properties: {
    conversation_status: { type: Type.STRING, description: "CLARIFYING | READY_FOR_CONFIRMATION | READY_FOR_HANDOFF | ESCALATE" },
    interpreted_intent: { type: Type.STRING },
    recommended_specialist: { type: Type.STRING },
    confidence: { type: Type.NUMBER },
    known_facts: { type: Type.OBJECT, additionalProperties: { type: Type.STRING } },
    missing_fields: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          field: { type: Type.STRING },
          reason: { type: Type.STRING },
          can_employee_answer: { type: Type.BOOLEAN }
        }
      }
    },
    clarifying_question: { type: Type.STRING },
    sensitive_signals: { type: Type.ARRAY, items: { type: Type.STRING } },
    confirmation_summary: { type: Type.STRING },
    next_action: { type: Type.STRING, description: "ASK_EMPLOYEE | CONFIRM_WITH_EMPLOYEE | HANDOFF | ESCALATE" }
  },
  required: [
    "conversation_status", 
    "interpreted_intent", 
    "recommended_specialist", 
    "confidence", 
    "known_facts", 
    "missing_fields", 
    "clarifying_question", 
    "sensitive_signals", 
    "confirmation_summary", 
    "next_action"
  ]
};

export const processIntake = async (message: string, history: any[]): Promise<IntakeResponse> => {
  if (!ai) throw new Error("Gemini API not initialized.");

  store.addActivity({
    sourceAgent: 'Employee',
    destinationAgent: 'Root Agent',
    action: 'Message Received',
    detail: `"${message}"`
  });

  const formattedHistory = history
    .filter(h => h.sender === 'user' || h.sender === 'agent')
    .map(h => ({
      role: h.sender === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    }));

  formattedHistory.push({
    role: 'user',
    parts: [{ text: message }]
  });

  const prompt = `
    You are the HR Operations Root Supervisor Agent for HR Octo.
    Your mandate is to conduct multi-turn employee intake, qualify requests, formulate exactly ONE clarification question per turn when information is missing, and obtain explicit employee confirmation prior to non-sensitive case creation.
    
    OPERATIONAL BOUNDARIES:
    - DO NOT perform mathematical or payroll calculations.
    - DO NOT approve cases or execute database mutations.
    - IF sensitive employee relations signals are detected (harassment, discrimination, retaliation, threats, union activity, domestic violence), IMMEDIATELY set conversation_status="ESCALATE", recommended_specialist="agent_employee_relations", and next_action="ESCALATE".
    - DO NOT exceed 3 clarification turns.
    
    Analyze the conversation history and the latest message, then output the structured JSON response.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: formattedHistory,
    config: {
      systemInstruction: prompt,
      responseMimeType: 'application/json',
      responseSchema: intakeSchema,
      temperature: 0.1
    }
  });

  if (!response.text) throw new Error("Empty response from Gemini");
  
  let rawResponse = JSON.parse(response.text) as IntakeResponse;
  
  // Deterministic Gate: Validate Intake Contract
  try {
    const userTurns = history.filter(h => h.sender === 'user').length + 1;
    const validation = validateIntakeContract(rawResponse, userTurns);
    
    if (validation.force_escalation) {
      rawResponse.conversation_status = "ESCALATE";
      rawResponse.recommended_specialist = validation.target_specialist;
      rawResponse.next_action = "ESCALATE";
      
      store.addActivity({
        sourceAgent: 'Root Agent',
        destinationAgent: 'Deterministic Gate',
        action: 'Forced Escalation',
        detail: `Reason: ${validation.reason_code}`
      });
    }
  } catch (error: any) {
    store.addActivity({
      sourceAgent: 'Root Agent',
      destinationAgent: 'Deterministic Gate',
      action: 'Validation Failed',
      detail: error.message
    });
    throw error;
  }

  store.addActivity({
    sourceAgent: 'Root Agent',
    destinationAgent: 'Root Agent',
    action: 'Intake Processed',
    detail: `Status: ${rawResponse.conversation_status}, Action: ${rawResponse.next_action}`
  });

  return rawResponse;
};

// --- ADK Tools for Payroll Specialist ---

const getEmployeeCompensationTool: FunctionDeclaration = {
  name: 'get_employee_compensation',
  description: 'Retrieves authoritative compensation profile for an employee.',
  parameters: {
    type: Type.OBJECT,
    properties: { employee_id: { type: Type.STRING } },
    required: ['employee_id']
  }
};

const getApprovedTimeEntriesTool: FunctionDeclaration = {
  name: 'get_approved_time_entries',
  description: 'Retrieves locked and manager-approved timecard entries for a specific pay period.',
  parameters: {
    type: Type.OBJECT,
    properties: { employee_id: { type: Type.STRING }, pay_period: { type: Type.STRING } },
    required: ['employee_id', 'pay_period']
  }
};

const searchPolicyHandbookTool: FunctionDeclaration = {
  name: 'search_policy_handbook',
  description: 'Performs grounded hybrid search over approved Washington and California handbooks.',
  parameters: {
    type: Type.OBJECT,
    properties: { jurisdiction: { type: Type.STRING }, topic_query: { type: Type.STRING } },
    required: ['jurisdiction', 'topic_query']
  }
};

const invokeDeterministicPayrollCalculatorTool: FunctionDeclaration = {
  name: 'invoke_deterministic_payroll_calculator',
  description: 'Computes gross overtime correction balance in integer cents. MUST be used for all math.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      approved_overtime_hours: { type: Type.NUMBER },
      regular_hourly_rate_cents: { type: Type.INTEGER },
      overtime_multiplier: { type: Type.NUMBER },
      overtime_already_paid_cents: { type: Type.INTEGER }
    },
    required: ['approved_overtime_hours', 'regular_hourly_rate_cents', 'overtime_multiplier', 'overtime_already_paid_cents']
  }
};

const executeTool = async (name: string, args: any) => {
  store.addActivity({
    sourceAgent: 'Payroll Agent',
    destinationAgent: 'Deterministic Service',
    action: `Invoked ${name}`,
    detail: JSON.stringify(args)
  });

  let result: any;
  switch (name) {
    case 'get_employee_compensation':
      result = DB.hr_core.compensation[args.employee_id as keyof typeof DB.hr_core.compensation] || { error: "Not found" };
      break;
    case 'get_approved_time_entries':
      result = DB.hr_payroll.time_entry[`${args.employee_id}_${args.pay_period}` as keyof typeof DB.hr_payroll.time_entry] || { error: "Not found" };
      break;
    case 'search_policy_handbook':
      const policies = DB.hr_policy.handbook.filter(p => p.jurisdiction === args.jurisdiction);
      result = policies.length > 0 ? policies[0] : { error: "Policy not found" };
      break;
    case 'invoke_deterministic_payroll_calculator':
      try {
        result = calculatePayrollOvertimeAdjustment(args);
      } catch (e: any) {
        result = { error: e.message };
      }
      break;
    default:
      result = { error: 'Tool not found' };
  }

  store.addActivity({
    sourceAgent: 'Deterministic Service',
    destinationAgent: 'Payroll Agent',
    action: `Returned ${name}`,
    detail: JSON.stringify(result)
  });

  return result;
};

export const runPayrollInvestigation = async (facts: any, caseId: string): Promise<any> => {
  if (!ai) throw new Error("Gemini API not initialized.");

  store.addActivity({
    sourceAgent: 'Root Agent',
    destinationAgent: 'Payroll Agent',
    action: 'Delegated Case',
    detail: `Case ID: ${caseId}`
  });

  const systemInstruction = `
    You are the Payroll Specialist Agent for HR Octo.
    Your mandate is to investigate timecard discrepancies, verify hours against workweek rules, assemble investigation plans, and draft correction proposals.

    OPERATIONAL BOUNDARIES:
    - FORBIDDEN: You must NEVER calculate regular pay, overtime pay, or proposed balances using internal language model reasoning.
    - ALWAYS invoke invoke_deterministic_payroll_calculator for any arithmetic or financial delta.
    - For Washington cases, apply the 40-hour weekly rule.
    - All proposed adjustments require human HR approval.

    When you have gathered all necessary evidence and performed the calculation, you MUST return your final answer as a JSON object matching this structure:
    {
      "resolution_status": "RESOLVED | NEEDS_EMPLOYEE_INPUT | ESCALATE | NOT_IMPLEMENTED",
      "handling_agent": "agent_payroll",
      "case_id": "${caseId}",
      "reason_code": "CALCULATION_COMPLETE",
      "human_required": true,
      "summary": "...",
      "next_action": "AWAITING_HR_APPROVAL",
      "question_for_employee": "",
      "requested_fields": [],
      "evidence_references": [{"source_id": "...", "section_id": "...", "exact_quote": "..."}],
      "result_payload": {"proposed_balance_cents": 1234}
    }
    Do not include markdown formatting like \`\`\`json in your final response, just the raw JSON.
  `;

  let contents: any[] = [
    { role: 'user', parts: [{ text: `Investigate this payroll issue. Known facts: ${JSON.stringify(facts)}. Employee ID is EMP-7721. Pay period is 2024-10.` }] }
  ];

  for (let i = 0; i < 5; i++) {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction,
        tools: [{ 
          functionDeclarations: [
            getEmployeeCompensationTool, 
            getApprovedTimeEntriesTool, 
            searchPolicyHandbookTool, 
            invokeDeterministicPayrollCalculatorTool
          ] 
        }],
        temperature: 0.1
      }
    });

    if (response.functionCalls && response.functionCalls.length > 0) {
      contents.push(response.candidates?.[0]?.content);

      const toolResponses = [];
      for (const call of response.functionCalls) {
        const result = await executeTool(call.name, call.args);
        toolResponses.push({
          functionResponse: {
            name: call.name,
            response: result
          }
        });
      }
      contents.push({ role: 'user', parts: toolResponses });
    } else {
      const text = response.text || '{}';
      const cleanJson = text.replace(/```json\n?|\n?```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      
      store.addActivity({
        sourceAgent: 'Payroll Agent',
        destinationAgent: 'Root Agent',
        action: 'Investigation Complete',
        detail: `Status: ${parsed.resolution_status}`
      });
      
      return parsed;
    }
  }
  
  throw new Error("Max tool iterations reached without resolution.");
};
