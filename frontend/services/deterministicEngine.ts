export const REGISTERED_SPECIALISTS = new Set([
  "agent_payroll", "agent_policy", "agent_benefits_comp",
  "agent_employee_relations", "agent_talent_acquisition",
  "agent_immigration_global", "agent_performance_dev",
  "agent_analytics_ops", "agent_hris_integration"
]);

export const SENSITIVE_TRIGGERS = [
  /\bharass(ment)?\b/i, /\bdiscriminat(e|ion)\b/i, /\bretaliat(e|ion)\b/i,
  /\blawsuit\b/i, /\battorney\b/i, /\bunion(ize|ization)?\b/i,
  /\bthreat(en)?\b/i, /\bkill\b/i, /\bhurt\b/i, /\bhate\s*crime\b/i,
  /\bstalk(ing)?\b/i, /\bdomestic\s*violence\b/i
];

export const PII_PATTERNS = [
  /\b\d{3}-\d{2}-\d{4}\b/,             // SSN
  /\b\d{9,18}\b/,                      // Bank routing/account number
  /\b[A-Za-z0-9._%+-]+@gmail\.com\b/i  // Personal email
];

export function calculatePayrollOvertimeAdjustment(data: any) {
  const { approved_overtime_hours, regular_hourly_rate_cents, overtime_multiplier, overtime_already_paid_cents } = data;
  
  if (approved_overtime_hours < 0) throw new Error("ERR_NEGATIVE_HOURS: Approved overtime hours cannot be negative.");
  if (regular_hourly_rate_cents <= 0) throw new Error("ERR_INVALID_RATE: Regular hourly rate must be positive.");
  if (overtime_multiplier !== 1.5 && overtime_multiplier !== 2.0) throw new Error("ERR_INVALID_MULTIPLIER: Overtime multiplier must be 1.5x or 2.0x.");
  if (overtime_already_paid_cents < 0) throw new Error("ERR_NEGATIVE_PAID: Prior paid amount cannot be negative.");

  const total_earned_cents = Math.round(approved_overtime_hours * regular_hourly_rate_cents * overtime_multiplier);
  const proposed_balance_cents = total_earned_cents - overtime_already_paid_cents;
  
  const trace_payload = `${approved_overtime_hours}|${regular_hourly_rate_cents}|${overtime_multiplier}|${overtime_already_paid_cents}`;
  const trace_id = 'TRC-' + btoa(trace_payload).substring(0, 12).toUpperCase();

  return {
    total_earned_overtime_cents: total_earned_cents,
    overtime_already_paid_cents,
    proposed_balance_cents,
    trace_id
  };
}

export function validateIntakeContract(payload: any, turnCount: number, maxTurns: number = 3) {
  const userText = JSON.stringify(payload.known_facts || {}) + " " + (payload.interpreted_intent || "");
  
  // 1. Check for sensitive employee relations triggers
  for (const trigger of SENSITIVE_TRIGGERS) {
    if (trigger.test(userText)) {
      return {
        is_valid: true,
        force_escalation: true,
        target_specialist: "agent_employee_relations",
        reason_code: "SENSITIVE_ER_TRIGGER_DETECTED",
        assigned_queue: "EMPLOYEE_RELATIONS_TIER2"
      };
    }
  }

  // 2. Check for prohibited PII
  for (const pattern of PII_PATTERNS) {
    if (pattern.test(userText)) {
      throw new Error("ERR_PROHIBITED_PII: Input contains unmasked personal data.");
    }
  }

  // 3. Validate specialist delegation
  const specialist = payload.recommended_specialist;
  if (specialist && !REGISTERED_SPECIALISTS.has(specialist)) {
    throw new Error(`ERR_UNREGISTERED_SPECIALIST: '${specialist}' is not a recognized agent.`);
  }

  // 4. Enforce clarification turn limit
  if (turnCount >= maxTurns && payload.conversation_status === "CLARIFYING") {
    return {
      is_valid: true,
      force_escalation: true,
      target_specialist: specialist,
      reason_code: "EXCEEDED_CLARIFICATION_LIMIT",
      assigned_queue: "HR_SERVICE_DESK_TIER2"
    };
  }

  // 5. Verify single primary clarification question
  const question = (payload.clarifying_question || "").trim();
  if (payload.conversation_status === "CLARIFYING") {
    if (!question || (question.match(/\?/g) || []).length > 1) {
      throw new Error("ERR_INVALID_QUESTION_FORMAT: Exactly one primary question is permitted.");
    }
  }

  return {
    is_valid: true,
    force_escalation: false,
    target_specialist: specialist,
    reason_code: "INTAKE_VALIDATED"
  };
}
