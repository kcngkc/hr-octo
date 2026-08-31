import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Badge } from '../components/ui/Badge.tsx';
import { ValueDashboard } from '../components/views/ValueDashboard.tsx';
import { Search, Filter, UserCog, FileText, Activity, BookOpen, CheckSquare, MessageSquare, AlertTriangle, PlayCircle, CheckCircle2, ThumbsUp, ThumbsDown, ShieldAlert, Edit3, Send } from 'lucide-react';
import { Case } from '../types.ts';
import { store } from '../services/store.ts';

export const HRPage: React.FC = () => {
  const [view, setView] = useState<'queue' | 'dashboard'>('queue');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [activeTab, setActiveTab] = useState('investigation');
  const [isApproving, setIsApproving] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [cases, setCases] = useState<Case[]>(store.getCases());
  const [activities, setActivities] = useState(store.getActivities());

  useEffect(() => {
    return store.subscribe(() => {
      setCases(store.getCases());
      setActivities(store.getActivities());
    });
  }, []);

  const handleApprove = () => {
    setIsApproving(true);
    setTimeout(() => {
      setIsApproving(false);
      setIsApproved(true);
      if (selectedCase) {
        store.updateCase(selectedCase.id, { status: 'RESOLVED' });
        store.addActivity({
          sourceAgent: 'HR Reviewer',
          destinationAgent: 'System',
          action: 'Approved Correction',
          detail: `Approved proposal for case ${selectedCase.id}`
        });
      }
    }, 1500);
  };

  if (view === 'dashboard') {
    return (
      <div className="h-full flex flex-col bg-background p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex gap-4 mb-6 border-b border-slate-200 pb-4">
            <button onClick={() => setView('queue')} className="text-sm font-medium text-slate-500 hover:text-slate-800">Review Queue</button>
            <button className="text-sm font-medium text-primary-600 border-b-2 border-primary-600 pb-4 -mb-[17px]">Value Dashboard</button>
          </div>
          <ValueDashboard />
        </div>
      </div>
    );
  }

  if (selectedCase) {
    const isEscalated = selectedCase.status === 'ESCALATED';

    return (
      <div className="h-full flex flex-col bg-background">
        {/* Case Header */}
        <div className="bg-white border-b border-slate-200 p-4 md:px-8 shrink-0">
          <div className="max-w-6xl mx-auto">
            <button onClick={() => setSelectedCase(null)} className="text-sm text-primary-600 hover:text-primary-700 font-medium mb-3 flex items-center gap-1">
              &larr; Back to Queue
            </button>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold text-slate-900">{selectedCase.id}</h2>
                  <Badge variant={isEscalated ? 'danger' : selectedCase.status === 'RESOLVED' ? 'success' : 'warning'} className="flex items-center gap-1">
                    {isEscalated ? <AlertTriangle className="w-3 h-3" /> : <UserCog className="w-3 h-3" />}
                    {isEscalated ? 'Human Escalation' : selectedCase.status.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="text-slate-600">{selectedCase.title} • Employee: {selectedCase.employeeId}</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">Reassign</Button>
                {!isEscalated && <Button variant="danger">Escalate</Button>}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-slate-200 px-4 md:px-8 shrink-0 overflow-x-auto">
          <div className="max-w-6xl mx-auto flex gap-6">
            {[
              { id: 'investigation', label: isEscalated ? 'Escalation Details' : 'Investigation Report', icon: isEscalated ? AlertTriangle : FileText },
              { id: 'activity', label: 'Agent Activity', icon: Activity },
              { id: 'evidence', label: 'Evidence & Policy', icon: BookOpen },
              { id: 'decision', label: 'Decision', icon: CheckSquare },
              { id: 'draft', label: 'Response Draft', icon: MessageSquare },
              { id: 'feedback', label: 'Feedback', icon: ThumbsUp },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'border-primary-600 text-primary-700' 
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            
            {activeTab === 'investigation' && !isEscalated && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card title="Finding & Recommendation">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                      <h4 className="font-bold text-emerald-900 flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5" /> Confirmed Finding
                      </h4>
                      <p className="text-sm text-emerald-800">
                        {selectedCase.summary}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Confirmed Intent</h5>
                        <p className="text-sm text-slate-800">{selectedCase.title}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-3 rounded border border-slate-200">
                          <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Employee Facts</h5>
                          <ul className="text-sm text-slate-700 space-y-1">
                            <li>• Period: Oct 1-15</li>
                            <li>• Missing: 4 hours</li>
                          </ul>
                        </div>
                        <div className="bg-slate-50 p-3 rounded border border-slate-200">
                          <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">System Facts</h5>
                          <ul className="text-sm text-slate-700 space-y-1">
                            <li>• Base Rate: $35/hr</li>
                            <li>• OT Rate: 1.5x</li>
                            <li>• Approved OT: 4 hrs</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card title="Deterministic Proposal">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="text-slate-500">Version</span>
                        <span className="font-mono text-slate-800">v1.0</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="text-slate-500">Proposed Amount</span>
                        <span className="font-bold text-emerald-600">$210.00</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="text-slate-500">Scheduled Date</span>
                        <span className="text-slate-800">Oct 31, 2024</span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span className="text-slate-500">Confidence</span>
                        <span className="text-slate-800">0.98</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" onClick={() => setActiveTab('decision')}>Review Decision</Button>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'investigation' && isEscalated && selectedCase.escalationData && (
              <div className="space-y-6">
                <Card className="border-l-4 border-l-red-500 bg-red-50/30">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldAlert className="w-5 h-5 text-red-600" />
                    <h3 className="font-bold text-red-900">Escalation Reason: {selectedCase.escalationData.reason}</h3>
                  </div>
                  <p className="text-sm text-red-800">Receiving Queue: <span className="font-mono">{selectedCase.escalationData.receivingQueue}</span></p>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card title="Context Separation">
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Employee-Provided Facts</h5>
                        <div className="bg-slate-50 p-3 rounded border border-slate-200 text-sm text-slate-700">
                          {Object.entries(selectedCase.escalationData.employeeFacts).map(([k, v]) => (
                            <div key={k}><span className="font-medium">{k}:</span> {v}</div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">System-Verified Facts</h5>
                        <div className="bg-slate-50 p-3 rounded border border-slate-200 text-sm text-slate-700">
                          {Object.entries(selectedCase.escalationData.systemFacts).map(([k, v]) => (
                            <div key={k}><span className="font-medium">{k}:</span> {v}</div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">AI Interpretation</h5>
                        <p className="text-sm text-slate-700">{selectedCase.escalationData.interpretation}</p>
                      </div>
                    </div>
                  </Card>

                  <Card title="Agent Actions Attempted">
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Questions Asked</h5>
                        <ul className="list-disc pl-4 text-sm text-slate-700 space-y-1">
                          {selectedCase.escalationData.questionsAsked.map((q, i) => <li key={i}>{q}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Answers Received</h5>
                        <ul className="list-disc pl-4 text-sm text-slate-700 space-y-1">
                          {selectedCase.escalationData.answersReceived.map((a, i) => <li key={i}>{a}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tools Used</h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedCase.escalationData.toolsUsed.map((t, i) => (
                            <Badge key={i} variant="info" className="font-mono">{t}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card title="Manual Human Resolution">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Unresolved Decision</label>
                      <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded border border-slate-200">{selectedCase.escalationData.unresolvedDecision}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Recommended Human Action</label>
                      <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded border border-slate-200">{selectedCase.escalationData.recommendedAction}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex gap-3">
                      <Button>Submit Manual Resolution</Button>
                      <Button variant="outline">Update Status</Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'activity' && (
              <Card title="Agent Activity Feed" noPadding>
                <div className="divide-y divide-slate-100">
                  {activities.map((act, i) => (
                    <div key={act.id} className="p-4 flex gap-4 hover:bg-slate-50 transition-colors">
                      <div className="text-xs text-slate-400 font-mono pt-1 w-16 shrink-0">{act.timestamp}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="info">{act.sourceAgent}</Badge>
                          <span className="text-slate-400 text-xs">&rarr;</span>
                          <Badge variant="default">{act.destinationAgent}</Badge>
                        </div>
                        <p className="text-sm font-medium text-slate-800">{act.action}</p>
                        <p className="text-sm text-slate-600 mt-1">{act.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'evidence' && (
              <Card title="Retrieved Evidence">
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-slate-50 p-3 border-b border-slate-200 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary-600" />
                      <span className="font-semibold text-sm text-slate-800">WA Employee Handbook</span>
                    </div>
                    <Badge variant="success">Approved Source</Badge>
                  </div>
                  <div className="p-4 text-sm">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div><span className="block text-xs text-slate-500">Jurisdiction</span><span className="font-medium">Washington</span></div>
                      <div><span className="block text-xs text-slate-500">Section</span><span className="font-medium">3: Overtime</span></div>
                      <div><span className="block text-xs text-slate-500">Effective</span><span className="font-medium">Jan 1, 2024</span></div>
                      <div><span className="block text-xs text-slate-500">Version</span><span className="font-medium">v2.1</span></div>
                    </div>
                    <div className="bg-slate-100 p-4 rounded border border-slate-200 font-serif text-slate-700">
                      "Washington: Non-exempt employees will be paid at a rate of 1.5x their regular hourly rate for hours worked in excess of 40 in a workweek."
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'decision' && !isEscalated && (
              <div className="max-w-2xl mx-auto">
                <Card title="Approval Gate">
                  {!isApproved && selectedCase.status !== 'RESOLVED' ? (
                    <div className="space-y-6">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                        <UserCog className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-amber-900">Human HR Review Required</h4>
                          <p className="text-sm text-amber-800 mt-1">This action modifies payroll records and requires explicit human authorization.</p>
                        </div>
                      </div>
                      
                      <div className="border border-slate-200 rounded-lg p-4 space-y-3 text-sm">
                        <div className="flex justify-between"><span className="text-slate-500">Action</span><span className="font-medium">Apply Payroll Correction</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Proposal Version</span><span className="font-mono">v1.0</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Proposed Amount</span><span className="font-bold text-emerald-600">$210.00</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Scheduled Date</span><span>Oct 31, 2024</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Source Revalidation</span><Badge variant="success">Passed</Badge></div>
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-slate-100">
                        <Button className="flex-1" onClick={handleApprove} isLoading={isApproving}>Approve Correction</Button>
                        <Button variant="danger" className="flex-1">Reject</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 text-center py-8">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Correction Approved</h3>
                      <p className="text-slate-600 text-sm max-w-md mx-auto">
                        The authority envelope has been signed. The workflow is currently paused.
                      </p>
                      <div className="pt-4">
                        <Button icon={<PlayCircle className="w-5 h-5" />} size="lg">
                          Resume Approved Workflow
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            )}

            {activeTab === 'draft' && (
              <Card title="Employee Response Draft">
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <p className="text-sm text-slate-700 whitespace-pre-wrap font-serif">
                      Hi Sarah,
                      
                      I have reviewed your request regarding the missing overtime for the Oct 1-15 pay period. 
                      
                      I confirmed that you worked 4 hours of approved overtime on Oct 12. Because the timesheet synced after the payroll cutoff, it was not included in your Oct 15 paycheck. 
                      
                      I have approved a correction for $210.00 (4 hours at 1.5x your regular rate), which will be included in your next paycheck on Oct 31.
                      
                      Please let me know if you have any other questions.
                      
                      Best,
                      HR Operations
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button icon={<Send className="w-4 h-4"/>}>Accept & Send</Button>
                    <Button variant="outline" icon={<Edit3 className="w-4 h-4"/>}>Edit</Button>
                    <Button variant="outline">Regenerate</Button>
                    <Button variant="danger">Reject</Button>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'feedback' && (
              <div className="max-w-2xl mx-auto">
                <Card title="Agent Evaluation & Feedback">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 mb-2">Trajectory Evaluation</h4>
                      <p className="text-sm text-slate-600 mb-3">Did the agent select the correct specialists and tools in the correct order?</p>
                      <div className="flex gap-3">
                        <Button variant="outline" icon={<ThumbsUp className="w-4 h-4"/>}>Correct Trajectory</Button>
                        <Button variant="outline" icon={<ThumbsDown className="w-4 h-4"/>}>Incorrect Trajectory</Button>
                      </div>
                    </div>
                    <div className="border-t border-slate-100 pt-4">
                      <h4 className="text-sm font-semibold text-slate-800 mb-2">Response Evaluation</h4>
                      <p className="text-sm text-slate-600 mb-3">Was the final output correct, grounded, safe, and appropriate?</p>
                      <div className="flex gap-3">
                        <Button variant="outline" icon={<ThumbsUp className="w-4 h-4"/>}>Good Response</Button>
                        <Button variant="outline" icon={<ThumbsDown className="w-4 h-4"/>}>Poor Response</Button>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card title="Case Reflection" className="mt-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-slate-50 p-3 rounded border border-slate-200">
                      <span className="block text-xs text-slate-500 mb-1">Baseline Human Effort</span>
                      <span className="font-bold text-slate-800">15 minutes</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded border border-slate-200">
                      <span className="block text-xs text-slate-500 mb-1">Observed Human Effort</span>
                      <span className="font-bold text-slate-800">2 minutes</span>
                    </div>
                    <div className="bg-emerald-50 p-3 rounded border border-emerald-200 col-span-2">
                      <span className="block text-xs text-emerald-600 mb-1">Calculated Minutes Saved</span>
                      <span className="font-bold text-emerald-700 text-lg">13 minutes</span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-xs text-slate-500 mb-1">Automation Category</span>
                      <Badge variant="info">Agent-Prepared, Human-Approved</Badge>
                    </div>
                  </div>
                </Card>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background p-4 md:p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex gap-4 mb-6 border-b border-slate-200 pb-4">
          <button className="text-sm font-medium text-primary-600 border-b-2 border-primary-600 pb-4 -mb-[17px]">Review Queue</button>
          <button onClick={() => setView('dashboard')} className="text-sm font-medium text-slate-500 hover:text-slate-800">Value Dashboard</button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Review Queue</h2>
            <p className="text-slate-600 mt-1">Cases requiring human authorization or escalation.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input type="text" placeholder="Search cases..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 outline-none text-sm" />
            </div>
            <Button variant="outline" icon={<Filter className="w-4 h-4" />}>Filter</Button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Card noPadding>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-3 px-4 text-sm font-semibold text-slate-800">Case ID</th>
                    <th className="py-3 px-4 text-sm font-semibold text-slate-800">Title</th>
                    <th className="py-3 px-4 text-sm font-semibold text-slate-800">Status</th>
                    <th className="py-3 px-4 text-sm font-semibold text-slate-800">Specialist</th>
                    <th className="py-3 px-4 text-sm font-semibold text-slate-800">Updated</th>
                    <th className="py-3 px-4 text-sm font-semibold text-slate-800 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cases.map(c => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 text-sm font-mono text-slate-600">{c.id}</td>
                      <td className="py-4 px-4 text-sm font-medium text-slate-900">{c.title}</td>
                      <td className="py-4 px-4 text-sm">
                        <Badge variant={c.status === 'AWAITING_HR' ? 'warning' : c.status === 'ESCALATED' ? 'danger' : c.status === 'RESOLVED' ? 'success' : 'default'} className="flex w-max items-center gap-1">
                          {c.status === 'AWAITING_HR' && <UserCog className="w-3 h-3" />}
                          {c.status === 'ESCALATED' && <AlertTriangle className="w-3 h-3" />}
                          {c.status.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600">{c.specialist}</td>
                      <td className="py-4 px-4 text-sm text-slate-500">{new Date(c.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                      <td className="py-4 px-4 text-right">
                        <Button size="sm" onClick={() => setSelectedCase(c)}>Review</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {cases.map(c => (
            <Card key={c.id} className="flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-xs text-slate-500">{c.id}</span>
                <Badge variant={c.status === 'AWAITING_HR' ? 'warning' : c.status === 'ESCALATED' ? 'danger' : c.status === 'RESOLVED' ? 'success' : 'default'} className="flex items-center gap-1">
                  {c.status === 'AWAITING_HR' && <UserCog className="w-3 h-3" />}
                  {c.status === 'ESCALATED' && <AlertTriangle className="w-3 h-3" />}
                  {c.status.replace('_', ' ')}
                </Badge>
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">{c.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{c.specialist}</p>
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-500">{new Date(c.updatedAt).toLocaleDateString()}</span>
                <Button size="sm" onClick={() => setSelectedCase(c)}>Review</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
