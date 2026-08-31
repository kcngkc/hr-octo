import { Case, AgentActivity } from '../types.ts';

let cases: Case[] = [];
let activities: AgentActivity[] = [];
let listeners: (() => void)[] = [];

export const store = {
  getCases: () => cases,
  getActivities: () => activities,
  
  addCase: (c: Case) => { 
    cases = [c, ...cases]; 
    emit(); 
  },
  
  updateCase: (id: string, updates: Partial<Case>) => {
    cases = cases.map(c => c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c);
    emit();
  },
  
  addActivity: (a: Omit<AgentActivity, 'id' | 'timestamp'>) => {
    activities = [{
      ...a,
      id: 'act-' + Date.now() + Math.floor(Math.random() * 1000),
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})
    }, ...activities];
    emit();
  },
  
  subscribe: (listener: () => void) => {
    listeners.push(listener);
    return () => { listeners = listeners.filter(l => l !== listener); };
  }
};

function emit() {
  for (let listener of listeners) {
    listener();
  }
}

// Initialize with some seed data for the demo
store.addCase({
  id: 'CAS-2024-0882',
  title: 'Parental Leave Inquiry',
  status: 'RESOLVED',
  createdAt: new Date(Date.now() - 86400000).toISOString(),
  updatedAt: new Date(Date.now() - 80000000).toISOString(),
  employeeId: 'EMP-7721',
  specialist: 'HR Policy Agent',
  summary: 'Clarification on WA PFML concurrent usage with company PTO.'
});
