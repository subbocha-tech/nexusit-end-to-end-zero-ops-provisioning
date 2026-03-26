import type { User, Chat, ChatMessage, ProvisioningRequest, AppEntry } from './types';
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Yuki Tanaka', department: 'Engineering', email: 'yuki.tanaka@nexus-it.io' },
  { id: 'u2', name: 'Sarah Chen', department: 'Marketing', email: 'sarah.chen@nexus-it.io' },
  { id: 'u3', name: 'Michael Ross', department: 'Legal', email: 'michael.ross@nexus-it.io' },
  { id: 'u4', name: 'Elena Rodriguez', department: 'Finance', email: 'elena.rodriguez@nexus-it.io' }
];
export const MOCK_CHATS: Chat[] = [
  { id: 'c1', title: 'System Alerts' },
];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', chatId: 'c1', userId: 'u1', text: 'GitHub provisioned for user @yuki_tanaka', ts: Date.now() },
];
export const MOCK_APPS: AppEntry[] = [
  { id: 'a1', name: 'Slack', category: 'productivity', icon: 'https://cdn-icons-png.flaticon.com/512/3800/3800024.png', description: 'Real-time communication and collaboration for teams.', monthlyCost: 12.50 },
  { id: 'a2', name: 'GitHub', category: 'development', icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png', description: 'World leading AI-powered developer platform.', monthlyCost: 21.00 },
  { id: 'a3', name: 'AWS', category: 'infrastructure', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968313.png', description: 'On-demand cloud computing platforms and APIs.', monthlyCost: 450.00 },
  { id: 'a4', name: 'Salesforce', category: 'finance', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968914.png', description: 'Customer relationship management service.', monthlyCost: 150.00 },
  { id: 'a5', name: 'Notion', category: 'productivity', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968334.png', description: 'The all-in-one workspace for your notes and tasks.', monthlyCost: 10.00 },
  { id: 'a6', name: 'Zoom', category: 'productivity', icon: 'https://cdn-icons-png.flaticon.com/512/4401/4401433.png', description: 'Video conferencing and online meetings.', monthlyCost: 14.99 },
  { id: 'a7', name: 'Datadog', category: 'infrastructure', icon: 'https://cdn-icons-png.flaticon.com/512/5969/5969145.png', description: 'Monitoring and security platform for cloud apps.', monthlyCost: 95.00 },
  { id: 'a8', name: 'Jira', category: 'development', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968875.png', description: 'Project tracking software for agile teams.', monthlyCost: 7.50 },
];
export const MOCK_REQUESTS: ProvisioningRequest[] = [
  { id: 'r1', appId: 'a2', appName: 'GitHub', userId: 'u1', userName: 'Yuki Tanaka', department: 'Engineering', status: 'provisioned', justification: 'Source control for Project Phoenix.', createdAt: '2024-05-01', updatedAt: '2024-05-02' },
  { id: 'r2', appId: 'a4', appName: 'Salesforce', userId: 'u2', userName: 'Sarah Chen', department: 'Marketing', status: 'pending', justification: 'Need to track regional campaign leads.', createdAt: '2024-05-14', updatedAt: '2024-05-14' },
  { id: 'r3', appId: 'a3', appName: 'AWS', userId: 'u1', userName: 'Yuki Tanaka', department: 'Engineering', status: 'approved', justification: 'Sandbox environment for API testing.', createdAt: '2024-05-12', updatedAt: '2024-05-13' },
  { id: 'r4', appId: 'a5', appName: 'Notion', userId: 'u3', userName: 'Michael Ross', department: 'Legal', status: 'provisioned', justification: 'Centralized documentation for contract templates.', createdAt: '2024-05-05', updatedAt: '2024-05-06' },
  { id: 'r5', appId: 'a1', appName: 'Slack', userId: 'u4', userName: 'Elena Rodriguez', department: 'Finance', status: 'provisioning', justification: 'Cross-department communication for audits.', createdAt: '2024-05-13', updatedAt: '2024-05-15' },
  { id: 'r6', appId: 'a7', appName: 'Datadog', userId: 'u1', userName: 'Yuki Tanaka', department: 'Engineering', status: 'pending', justification: 'Monitoring setup for production clusters.', createdAt: '2024-05-15', updatedAt: '2024-05-15' },
  { id: 'r7', appId: 'a8', appName: 'Jira', userId: 'u2', userName: 'Sarah Chen', department: 'Marketing', status: 'rejected', justification: 'Requested Enterprise plan when Standard is sufficient.', createdAt: '2024-05-08', updatedAt: '2024-05-09' },
  { id: 'r8', appId: 'a6', appName: 'Zoom', userId: 'u3', userName: 'Michael Ross', department: 'Legal', status: 'provisioned', justification: 'External client video consultations.', createdAt: '2024-05-03', updatedAt: '2024-05-04' },
  { id: 'r9', appId: 'a2', appName: 'GitHub', userId: 'u4', userName: 'Elena Rodriguez', department: 'Finance', status: 'approved', justification: 'Access to financial reporting scripts.', createdAt: '2024-05-11', updatedAt: '2024-05-12' },
  { id: 'r10', appId: 'a3', appName: 'AWS', userId: 'u2', userName: 'Sarah Chen', department: 'Marketing', status: 'rejected', justification: 'No clear business need for infra access in Marketing role.', createdAt: '2024-05-10', updatedAt: '2024-05-11' },
];
export const MOCK_BILLING_DATA = [
  { month: 'Jan', spend: 4200, licenses: 145 },
  { month: 'Feb', spend: 4500, licenses: 152 },
  { month: 'Mar', spend: 4100, licenses: 148 },
  { month: 'Apr', spend: 4800, licenses: 160 },
  { month: 'May', spend: 5200, licenses: 172 },
  { month: 'Jun', spend: 5800, licenses: 185 },
];