import type { User, Chat, ChatMessage } from './types';
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Admin User' },
  { id: 'u2', name: 'Finance Lead' }
];
export const MOCK_CHATS: Chat[] = [
  { id: 'c1', title: 'System Alerts' },
];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', chatId: 'c1', userId: 'u1', text: 'GitHub provisioned for user @john_doe', ts: Date.now() },
];
export interface AppEntry {
  id: string;
  name: string;
  category: 'productivity' | 'development' | 'finance' | 'infrastructure';
  icon: string;
  description: string;
  monthlyCost: number;
}
export const MOCK_APPS: AppEntry[] = [
  { id: 'a1', name: 'Slack', category: 'productivity', icon: 'https://cdn-icons-png.flaticon.com/512/3800/3800024.png', description: 'Real-time communication and collaboration for teams.', monthlyCost: 12.50 },
  { id: 'a2', name: 'GitHub', category: 'development', icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png', description: 'World leading AI-powered developer platform.', monthlyCost: 21.00 },
  { id: 'a3', name: 'AWS', category: 'infrastructure', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968313.png', description: 'On-demand cloud computing platforms and APIs.', monthlyCost: 450.00 },
  { id: 'a4', name: 'Salesforce', category: 'finance', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968914.png', description: 'Customer relationship management service.', monthlyCost: 150.00 },
  { id: 'a5', name: 'Notion', category: 'productivity', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968334.png', description: 'The all-in-one workspace for your notes and tasks.', monthlyCost: 8.00 },
  { id: 'a6', name: 'Zoom', category: 'productivity', icon: 'https://cdn-icons-png.flaticon.com/512/4401/4401433.png', description: 'Video conferencing and online meetings.', monthlyCost: 14.99 },
  { id: 'a7', name: 'Datadog', category: 'development', icon: 'https://cdn-icons-png.flaticon.com/512/5969/5969145.png', description: 'Monitoring and security platform for cloud apps.', monthlyCost: 95.00 },
  { id: 'a8', name: 'Jira', category: 'development', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968875.png', description: 'Project tracking software for agile teams.', monthlyCost: 7.50 },
];
export interface ProvisioningRequest {
  id: string;
  appName: string;
  userName: string;
  department: string;
  status: 'pending' | 'approved' | 'provisioned' | 'rejected';
  date: string;
}
export const MOCK_REQUESTS: ProvisioningRequest[] = [
  { id: 'r1', appName: 'GitHub', userName: 'Yuki Tanaka', department: 'Engineering', status: 'provisioned', date: '2024-05-10' },
  { id: 'r2', appName: 'Salesforce', userName: 'Kenji Sato', department: 'Sales', status: 'pending', date: '2024-05-12' },
  { id: 'r3', appName: 'AWS', userName: 'Admin', department: 'IT', status: 'approved', date: '2024-05-11' },
  { id: 'r4', appName: 'Slack', userName: 'Emi Ito', department: 'Marketing', status: 'provisioned', date: '2024-05-09' },
];
export const MOCK_BILLING_DATA = [
  { month: 'Jan', spend: 4200, licenses: 145 },
  { month: 'Feb', spend: 4500, licenses: 152 },
  { month: 'Mar', spend: 4100, licenses: 148 },
  { month: 'Apr', spend: 4800, licenses: 160 },
  { month: 'May', spend: 5200, licenses: 172 },
  { month: 'Jun', spend: 5800, licenses: 185 },
];