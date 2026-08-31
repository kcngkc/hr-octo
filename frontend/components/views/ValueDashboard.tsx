import React from 'react';
import { Card } from '../ui/Card.tsx';
import { MOCK_DASHBOARD_DATA } from '../../mockData.ts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Clock, CheckCircle2, ShieldAlert, Activity, Users, Zap } from 'lucide-react';

export const ValueDashboard: React.FC = () => {
  const { executive, humanEffort, agentOperations } = MOCK_DASHBOARD_DATA;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Value & Automation Dashboard</h2>
          <p className="text-slate-600 mt-1">Observed metrics vs baseline human effort.</p>
        </div>
        <div className="bg-slate-100 px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 font-medium">
          Baseline: <span className="font-mono text-primary-700">Manual HR Tier 1 (v1.0)</span>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-primary-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary-50 rounded-lg"><TrendingUp className="w-5 h-5 text-primary-600" /></div>
            <h3 className="text-sm font-semibold text-slate-600">Total Enquiries</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">{executive.totalEnquiries}</p>
          <p className="text-xs text-slate-500 mt-2">Cases: {executive.casesCreated} | Policy Only: {executive.policyResolvedNoCase}</p>
        </Card>
        
        <Card className="border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-50 rounded-lg"><Zap className="w-5 h-5 text-emerald-600" /></div>
            <h3 className="text-sm font-semibold text-slate-600">Agent Offload Rate</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {Math.round(((executive.autonomousResolutions + executive.agentPreparedHumanApproved) / executive.casesCreated) * 100)}%
          </p>
          <p className="text-xs text-slate-500 mt-2">Auto + Agent-Prepared, Human-Approved</p>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg"><Clock className="w-5 h-5 text-blue-600" /></div>
            <h3 className="text-sm font-semibold text-slate-600">Hours Saved</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">{humanEffort.hoursSaved}</p>
          <p className="text-xs text-slate-500 mt-2">Baseline ({Math.round(humanEffort.baselineMinutes/60)}h) - Actual ({Math.round(humanEffort.actualMinutes/60)}h)</p>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-50 rounded-lg"><ShieldAlert className="w-5 h-5 text-amber-600" /></div>
            <h3 className="text-sm font-semibold text-slate-600">Escalated</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">{executive.escalated}</p>
          <p className="text-xs text-slate-500 mt-2">Open Queue: {executive.openHumanQueue}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Human Effort Breakdown */}
        <Card title="Human Effort Impact" className="lg:col-span-1">
          <div className="space-y-4 mt-2">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm text-slate-600">Avg Minutes / Case</span>
              <span className="font-bold text-slate-900">{humanEffort.avgMinutesPerCase}m</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm text-slate-600">Cases w/ No Human Work</span>
              <span className="font-bold text-emerald-600">{humanEffort.casesNoHumanWork}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm text-slate-600">Cases w/ Reduced Work</span>
              <span className="font-bold text-blue-600">{humanEffort.casesAgentReducedWork}</span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-sm text-slate-600">Cases w/ Increased Work</span>
              <span className="font-bold text-slate-400">{humanEffort.casesAgentIncreasedWork}</span>
            </div>
          </div>
        </Card>

        {/* Agent Operations */}
        <Card title="Agent Operations" className="lg:col-span-1">
          <div className="space-y-4 mt-2">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm text-slate-600">Clarification Completion</span>
              <span className="font-bold text-slate-900">{agentOperations.clarificationCompletionRate}%</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm text-slate-600">Avg Clarification Turns</span>
              <span className="font-bold text-slate-900">{agentOperations.avgClarificationTurns}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-sm text-slate-600">Policy Grounding Success</span>
              <span className="font-bold text-emerald-600">{agentOperations.policyGroundingSuccess}%</span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-sm text-slate-600">Missing Info Recovery</span>
              <span className="font-bold text-blue-600">{agentOperations.missingInfoRecoveryRate}%</span>
            </div>
          </div>
        </Card>

        {/* Draft Quality */}
        <Card title="Draft Quality (Human Acceptance)" className="lg:col-span-1">
          <div className="h-48 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_DASHBOARD_DATA.draftQuality}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {MOCK_DASHBOARD_DATA.draftQuality.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute right-0 flex flex-col gap-1">
              {MOCK_DASHBOARD_DATA.draftQuality.map((entry, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: entry.fill}}></div>
                  {entry.name} ({entry.value}%)
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
