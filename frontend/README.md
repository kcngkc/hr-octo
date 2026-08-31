# HR Octo: Autonomous HR Operations

HR Octo is a production-oriented, multi-agent HR operations application designed to remove 70–80% of routine human HR effort through intelligent delegation, deterministic controls, and seamless human-in-the-loop handoffs.

## Inspiration
Human Resources teams are the backbone of any organization, yet HR professionals spend the majority of their time bogged down by repetitive, routine tasks—answering the same policy questions, tracking down timesheet discrepancies, and routing requests. We were inspired to build a system that doesn't just act as a conversational FAQ bot, but as a true autonomous operator that can investigate, calculate, and draft resolutions while keeping humans firmly in control of consequential decisions.

## Problem Statement
While Large Language Models (LLMs) are incredible at natural language understanding, they are fundamentally unsuited for enterprise HR operations out-of-the-box. LLMs hallucinate math, invent policies, and lack the strict access controls required for sensitive employee data. HR requires 100% accuracy for payroll, strict compliance for policies, and high empathy and security for employee relations. Existing AI chatbots fail because they lack deterministic boundaries, auditable state management, and proper human-in-the-loop escalation paths.

## How we solve it
HR Octo solves this by implementing a **Multi-Agent Topology with Deterministic Gates**:
1. **Root Supervisor Agent**: Handles multi-turn employee intake, clarifies missing information, and routes to the correct specialist.
2. **Specialist Agents**: Dedicated agents for Payroll, Policy, Benefits, and Employee Relations.
3. **Strict Separation of Concerns**: Gemini handles intent recognition, entity extraction, and communication drafting. Deterministic services (ADK/Cloud Run) handle all math, workflow gates, idempotency checks, and database mutations.
4. **Policy Grounding (RAG)**: The Policy Agent cannot answer questions without retrieving exact, approved excerpts from jurisdiction-specific handbooks.
5. **Human-in-the-Loop**: Consequential actions (like payroll corrections) generate a versioned proposal that pauses the workflow until a human HR reviewer approves it. Sensitive cases (e.g., harassment) immediately lock the AI out and escalate to a human queue.

## Technology Stack
* **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React, Recharts
* **AI & Orchestration**: Google Gemini 2.5 Flash, `@google/genai` SDK, Agent Development Kit (ADK) architecture
* **Data & State (Architecture)**: BigQuery (System of Record), Cloud Storage (Ingestion), Cloud Run (Deterministic Services)
* **Design**: Modern SaaS aesthetic, calm professional interface, strict accessibility and contrast standards

## Challenges we ran into
* **Preventing LLM Math**: LLMs naturally want to solve math problems presented to them. We had to design strict system instructions and tool contracts to force the Payroll Agent to delegate all calculations to a deterministic Python/SQL service.
* **Context Preservation**: Ensuring that facts gathered by the Root Agent were perfectly preserved and passed down to Specialist Agents without requiring the employee to repeat themselves.
* **Sensitive Escalations**: Training the model to immediately stop autonomous fact-finding and trigger a restricted escalation when detecting keywords related to legal threats, harassment, or union activity.

## Accomplishments that we're proud of
* **The Deterministic Payroll Workflow**: Successfully building a graph where an LLM investigates a discrepancy, retrieves timecards, fetches policy multipliers, passes them to a deterministic calculator, and drafts a human-readable approval brief.
* **Comprehensive Audit Logging**: Every single agent handoff, tool invocation, and human decision is logged immutably, providing complete transparency into the AI's reasoning.
* **Value Dashboard**: A real-time dashboard that tracks actual human minutes saved versus a v1.0 manual baseline, proving the ROI of the multi-agent system.

## What we learned
* **Contracts are everything**: In a multi-agent system, strict JSON schemas for handoffs (e.g., `ConversationalIntakeOutput`, `SpecialistOutput`) are the only way to ensure reliable orchestration.
* **AI needs boundaries**: The most effective AI systems in enterprise environments are those that are heavily constrained by deterministic rules. AI should synthesize and orchestrate, but traditional code must execute and calculate.

## What's next for HR-Octo Agent: Autonomous HR Operation
* **Live HRIS Integration**: Connecting the deterministic integration tools to live sandbox environments of Workday, BambooHR, and ADP.
* **Expanded Specialist Roster**: Fully building out the Immigration & Global HR Agent and the Talent Acquisition Agent with their respective deterministic tools.
* **Advanced RAG Pipelines**: Implementing OCR and semantic chunking for legacy PDF employee handbooks and complex benefits matrices.
* **Voice Intake**: Integrating the Gemini Live API to allow employees to report issues or ask policy questions via natural voice conversations.
