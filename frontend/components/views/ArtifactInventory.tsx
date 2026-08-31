import React from 'react';
import { Card } from '../ui/Card.tsx';
import { FileText, MessageSquare, FileCheck, ClipboardList } from 'lucide-react';

export const ArtifactInventory: React.FC = () => {
  const artifacts = [
    {
      title: 'Investigation Reports',
      icon: ClipboardList,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      desc: 'Prepared by agents summarizing retrieved evidence, policy rules, and case history for human review.'
    },
    {
      title: 'Communication Drafts',
      icon: MessageSquare,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100',
      desc: 'Non-sensitive HR responses drafted by Gemini for human editing and approval before sending.'
    },
    {
      title: 'Correction Proposals',
      icon: FileText,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      desc: 'Structured proposals for HR record changes, versioned and gated by deterministic approval workflows.'
    },
    {
      title: 'Import Reports',
      icon: FileCheck,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
      desc: 'Generated during the seed process detailing validation results, checksums, and rejected records.'
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">9. Generated Artifact Inventory</h2>
        <p className="text-slate-600 mt-2">Outputs produced by the HR Octo system during operation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {artifacts.map((artifact, i) => {
          const Icon = artifact.icon;
          return (
            <Card key={i} className="flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${artifact.bg}`}>
                  <Icon className={`w-5 h-5 ${artifact.color}`} />
                </div>
                <h3 className="font-bold text-slate-800">{artifact.title}</h3>
              </div>
              <p className="text-sm text-slate-600 flex-1">{artifact.desc}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
