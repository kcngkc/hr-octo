import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../components/ui/Card.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Badge } from '../components/ui/Badge.tsx';
import { MessageSquare, List, Send, Bot, User, FileText, CheckCircle2, ExternalLink, Plus, Clock, UserCog, Loader2 } from 'lucide-react';
import { Case } from '../types.ts';
import { processIntake, runPayrollInvestigation } from '../services/agentService.ts';
import { store } from '../services/store.ts';

export const EmployeePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'cases'>('chat');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [cases, setCases] = useState<Case[]>(store.getCases());
  
  useEffect(() => {
    return store.subscribe(() => {
      setCases(store.getCases());
    });
  }, []);

  const initialMessages = [
    { id: '1', sender: 'agent', text: 'Hello Sarah. I am the HR Operations Assistant. How can I help you today?', timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
  ];

  const [messages, setMessages] = useState<any[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isInvestigating, setIsInvestigating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    
    const userMsg = { 
      id: Date.now().toString(), 
      sender: 'user', 
      text: inputValue, 
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
    };
    
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputValue('');
    setIsTyping(true);
    
    try {
      const response = await processIntake(userMsg.text, messages);
      
      if (response.next_action === 'ASK_EMPLOYEE') {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'agent',
          text: response.clarifying_question,
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }]);
      } else if (response.next_action === 'CONFIRM_WITH_EMPLOYEE') {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'system',
          type: 'confirmation',
          data: {
            intent: response.interpreted_intent,
            specialist: response.recommended_specialist,
            knownFacts: response.known_facts,
            summary: response.confirmation_summary
          },
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }]);
      } else if (response.next_action === 'ESCALATE') {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'agent',
          text: 'I have securely logged your request and escalated it directly to our Employee Relations team for immediate review. A specialist will contact you shortly.',
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }]);
      } else {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'agent',
          text: 'I am processing your request.',
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }]);
      }
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'agent',
        text: `I encountered an error processing your request: ${error.message}. Please try again or contact HR support directly.`,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleConfirm = async () => {
    setIsInvestigating(true);
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'system',
      text: 'Delegating to Payroll Agent for investigation...',
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }]);

    try {
      const confirmMsg = messages.find(m => m.type === 'confirmation');
      const facts = confirmMsg?.data?.knownFacts || {};
      
      const newCase: Case = {
        id: 'CAS-' + Date.now().toString().slice(-6),
        title: confirmMsg?.data?.intent || 'Investigation Request',
        status: 'OPEN',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        employeeId: 'EMP-7721',
        specialist: confirmMsg?.data?.specialist || 'Payroll Agent',
        summary: 'Investigating...'
      };
      store.addCase(newCase);

      const result = await runPayrollInvestigation(facts, newCase.id);
      
      store.updateCase(newCase.id, { 
        status: 'AWAITING_HR', 
        summary: result.summary 
      });

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'agent',
        text: `Investigation complete. ${result.summary} A correction proposal has been drafted for HR approval.`,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        caseLink: newCase.id
      }]);
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'agent',
        text: `I encountered an error during the investigation: ${error.message}. Please contact HR support.`,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }]);
    } finally {
      setIsInvestigating(false);
    }
  };

  const handleNewRequest = () => {
    setMessages([{ id: Date.now().toString(), sender: 'agent', text: 'Hello Sarah. I am the HR Operations Assistant. How can I help you today?', timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
  };

  const renderCaseDetail = () => {
    if (!selectedCase) return null;
    
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto h-full overflow-y-auto">
        <button onClick={() => setSelectedCase(null)} className="text-sm text-primary-600 hover:text-primary-700 font-medium mb-4 flex items-center gap-1">
          &larr; Back to Cases
        </button>
        
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-sm text-slate-500">{selectedCase.id}</span>
          <Badge variant={selectedCase.status === 'RESOLVED' ? 'success' : selectedCase.status === 'AWAITING_HR' ? 'warning' : 'default'}>
            {selectedCase.status.replace('_', ' ')}
          </Badge>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">{selectedCase.title}</h2>

        <Card title="Status Timeline" className="mb-6">
          <div className="relative border-l-2 border-slate-200 ml-3 space-y-6 py-2">
            <div className="relative pl-6">
              <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
              <p className="text-sm font-bold text-slate-800">Case Created</p>
              <p className="text-xs text-slate-500">{new Date(selectedCase.createdAt).toLocaleString()}</p>
            </div>
            <div className="relative pl-6">
              <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
              <p className="text-sm font-bold text-slate-800">Investigating</p>
              <p className="text-xs text-slate-500">Payroll Agent retrieved records and policy.</p>
            </div>
            <div className="relative pl-6">
              <div className={`absolute w-3 h-3 rounded-full -left-[7px] top-1.5 ring-4 ring-white ${selectedCase.status === 'AWAITING_HR' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></div>
              <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                {selectedCase.status === 'AWAITING_HR' && <UserCog className="w-4 h-4 text-amber-600" />}
                Awaiting HR Approval
              </p>
              <p className="text-xs text-slate-500">Correction proposal generated and sent to HR Lead.</p>
            </div>
            {selectedCase.status === 'RESOLVED' && (
              <div className="relative pl-6">
                <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                <p className="text-sm font-bold text-slate-800">Resolved</p>
                <p className="text-xs text-slate-500">Correction applied and notification sent.</p>
              </div>
            )}
          </div>
        </Card>

        <Card title="Employee-Safe Resolution">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-700">
            {selectedCase.status === 'AWAITING_HR' ? (
              <p>Your request has been investigated and a correction proposal has been drafted. It is currently awaiting final authorization from the HR team. You will be notified once it is approved.</p>
            ) : selectedCase.status === 'RESOLVED' ? (
              <p>Your request has been resolved. The missing overtime has been calculated and applied to your next pay cycle.</p>
            ) : (
              <p>Your request is currently being processed by our HR team.</p>
            )}
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-background">
      {/* Sidebar Navigation for Employee */}
      <div className="w-full md:w-64 bg-white border-r border-slate-200 shrink-0 flex flex-row md:flex-col p-4 gap-2 overflow-x-auto">
        <button 
          onClick={() => { setActiveTab('chat'); setSelectedCase(null); }}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'chat' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'}`}
        >
          <MessageSquare className="w-5 h-5" /> HR Assistant
        </button>
        <button 
          onClick={() => { setActiveTab('cases'); setSelectedCase(null); }}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'cases' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'}`}
        >
          <List className="w-5 h-5" /> My Cases
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 h-full overflow-hidden relative">
        {activeTab === 'chat' ? (
          <div className="flex flex-col h-full max-w-4xl mx-auto p-4 md:p-6">
            <div className="flex justify-end mb-4">
              <Button variant="outline" size="sm" onClick={handleNewRequest} icon={<Plus className="w-4 h-4" />}>
                Start New Request
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-6 pb-4 pr-2">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender !== 'user' && (
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-5 h-5 text-primary-600" />
                    </div>
                  )}
                  
                  <div className={`max-w-[85%] md:max-w-[75%] ${msg.sender === 'user' ? 'order-1' : 'order-2'}`}>
                    {msg.type === 'confirmation' ? (
                      <Card className="border-primary-200 bg-primary-50/30 shadow-sm">
                        <div className="flex items-center gap-2 mb-3 text-primary-700">
                          <CheckCircle2 className="w-5 h-5" />
                          <h4 className="font-semibold">Confirmation Summary</h4>
                        </div>
                        <p className="text-sm text-slate-700 mb-4">{msg.data.summary}</p>
                        
                        <div className="bg-white rounded border border-slate-200 p-3 mb-4 text-sm">
                          <div className="grid grid-cols-3 gap-2 mb-2">
                            <span className="text-slate-500">Intent:</span>
                            <span className="col-span-2 font-medium text-slate-800">{msg.data.intent}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 mb-2">
                            <span className="text-slate-500">Specialist:</span>
                            <span className="col-span-2 font-medium text-slate-800">{msg.data.specialist}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <span className="text-slate-500">Known Facts:</span>
                            <div className="col-span-2">
                              {Object.entries(msg.data.knownFacts || {}).map(([k, v]) => (
                                <div key={k} className="text-slate-800"><span className="text-slate-500 mr-1">{k}:</span>{v as string}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button onClick={handleConfirm} isLoading={isInvestigating} className="w-full sm:w-auto">
                            Confirm and Investigate
                          </Button>
                          <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
                        </div>
                      </Card>
                    ) : (
                      <div className={`p-4 rounded-2xl text-sm shadow-sm ${
                        msg.sender === 'user' 
                          ? 'bg-primary-600 text-white rounded-tr-sm' 
                          : msg.sender === 'system'
                          ? 'bg-slate-100 text-slate-600 rounded-tl-sm font-mono text-xs'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'
                      }`}>
                        <p className="leading-relaxed">{msg.text}</p>
                        {msg.provenance && (
                          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1 text-xs text-slate-500">
                            <FileText className="w-3 h-3" /> Source: {msg.provenance}
                          </div>
                        )}
                        {msg.caseLink && (
                          <div className="mt-3">
                            <Button variant="outline" size="sm" onClick={() => {
                              const c = cases.find(c => c.id === msg.caseLink);
                              if (c) {
                                setSelectedCase(c);
                                setActiveTab('cases');
                              }
                            }} icon={<ExternalLink className="w-4 h-4"/>}>
                              View {msg.caseLink}
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                    <div className={`text-xs text-slate-400 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-1 order-2">
                      <User className="w-5 h-5 text-slate-500" />
                    </div>
                  )}
                </div>
              ))}
              
              {(isTyping || isInvestigating) && (
                <div className="flex gap-4 justify-start">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-primary-500 animate-spin" />
                    <span className="text-sm text-slate-500">Agent is thinking...</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <div className="pt-4 bg-background sticky bottom-0">
              <form onSubmit={handleSend} className="flex gap-2">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isTyping || isInvestigating}
                  placeholder="Ask a question or report an issue..." 
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm disabled:bg-slate-50 disabled:text-slate-400"
                />
                <Button type="submit" disabled={!inputValue.trim() || isTyping || isInvestigating} className="px-6">
                  <Send className="w-5 h-5" />
                </Button>
              </form>
              <div className="text-center mt-2 text-xs text-slate-400">
                HR Octo can make mistakes. Check important info.
              </div>
            </div>
          </div>
        ) : selectedCase ? (
          renderCaseDetail()
        ) : (
          <div className="p-4 md:p-8 max-w-5xl mx-auto h-full overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">My Cases</h2>
            
            <div className="space-y-4">
              {cases.map(c => (
                <Card key={c.id} className="hover:border-primary-300 transition-colors cursor-pointer" action={
                  <Button variant="ghost" size="sm" onClick={() => setSelectedCase(c)}>View</Button>
                }>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4" onClick={() => setSelectedCase(c)}>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-xs text-slate-500">{c.id}</span>
                        <Badge variant={c.status === 'RESOLVED' ? 'success' : c.status === 'AWAITING_HR' ? 'warning' : c.status === 'ESCALATED' ? 'danger' : 'default'} className="flex items-center gap-1">
                          {c.status === 'AWAITING_HR' && <UserCog className="w-3 h-3" />}
                          {c.status === 'ESCALATED' && <AlertTriangle className="w-3 h-3" />}
                          {c.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">{c.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{c.summary}</p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2">
                      <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3"/> {new Date(c.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
