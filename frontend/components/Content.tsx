import React from 'react';
import { TabId } from '../types.ts';
import { Overview } from './views/Overview.tsx';
import { ArchitectureDiagram } from './views/ArchitectureDiagram.tsx';
import { DatabaseSchema } from './views/DatabaseSchema.tsx';
import { IngestionDesign } from './views/IngestionDesign.tsx';
import { ValidationRules } from './views/ValidationRules.tsx';
import { PolicyGrounding } from './views/PolicyGrounding.tsx';
import { AccessModel } from './views/AccessModel.tsx';
import { ResponsibilityMatrix } from './views/ResponsibilityMatrix.tsx';
import { FailurePaths } from './views/FailurePaths.tsx';
import { ArtifactInventory } from './views/ArtifactInventory.tsx';
import { BuildNotes } from './views/BuildNotes.tsx';
import { AgentTopology } from './views/AgentTopology.tsx';
import { StructuredContracts } from './views/StructuredContracts.tsx';
import { WorkflowGraphs } from './views/WorkflowGraphs.tsx';
import { DeterministicControls } from './views/DeterministicControls.tsx';
import { SensitiveHandoff } from './views/SensitiveHandoff.tsx';
import { ArtifactsActivity } from './views/ArtifactsActivity.tsx';
import { TestingEval } from './views/TestingEval.tsx';
import { DeploymentSecurity } from './views/DeploymentSecurity.tsx';
import { DemoScript } from './views/DemoScript.tsx';
import { FinalSummary } from './views/FinalSummary.tsx';

interface ContentProps {
  activeTab: TabId;
}

export const Content: React.FC<ContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case TabId.OVERVIEW: return <Overview />;
      case TabId.ARCHITECTURE: return <ArchitectureDiagram />;
      case TabId.DATABASE: return <DatabaseSchema />;
      case TabId.INGESTION: return <IngestionDesign />;
      case TabId.VALIDATION: return <ValidationRules />;
      case TabId.POLICY_RAG: return <PolicyGrounding />;
      case TabId.ACCESS_MODEL: return <AccessModel />;
      case TabId.RESPONSIBILITY: return <ResponsibilityMatrix />;
      case TabId.FAILURES: return <FailurePaths />;
      case TabId.ARTIFACTS: return <ArtifactInventory />;
      case TabId.BUILD_NOTES: return <BuildNotes />;
      case TabId.AGENT_TOPOLOGY: return <AgentTopology />;
      case TabId.CONTRACTS: return <StructuredContracts />;
      case TabId.WORKFLOWS: return <WorkflowGraphs />;
      case TabId.DETERMINISTIC_CONTROLS: return <DeterministicControls />;
      case TabId.SENSITIVE_HANDOFF: return <SensitiveHandoff />;
      case TabId.ARTIFACTS_ACTIVITY: return <ArtifactsActivity />;
      case TabId.TESTING_EVAL: return <TestingEval />;
      case TabId.DEPLOYMENT_SECURITY: return <DeploymentSecurity />;
      case TabId.DEMO_SCRIPT: return <DemoScript />;
      case TabId.FINAL_SUMMARY: return <FinalSummary />;
      default: return <Overview />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};
