import type { User, Chat, ChatMessage } from './types';
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Admin User', department: 'IT', email: 'admin@nexus-it.io' },
  { id: 'u2', name: 'Finance Lead', department: 'Finance', email: 'finance@nexus-it.io' }
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
  category: 'productivity' | 'development' | 'finance' | 'infrastructure' | 'security' | 'marketing';
  icon: string;
  description: string;
  monthlyCost: number;
}
export const MOCK_APPS: AppEntry[] = [
  { id: 'a1', name: 'Slack', category: 'productivity', icon: 'https://cdn-icons-png.flaticon.com/512/3800/3800024.png', description: 'Real-time communication and collaboration for teams.', monthlyCost: 12.50 },
  { id: 'a2', name: 'GitHub', category: 'development', icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png', description: 'World leading AI-powered developer platform.', monthlyCost: 21.00 },
  { id: 'a3', name: 'AWS', category: 'infrastructure', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968313.png', description: 'On-demand cloud computing platforms and APIs.', monthlyCost: 450.00 },
  { id: 'a4', name: 'Salesforce', category: 'finance', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968914.png', description: 'Customer relationship management service.', monthlyCost: 150.00 },
  { id: 'a5', name: 'Notion', category: 'productivity', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968334.png', description: 'The all-in-one workspace for your notes and tasks.', monthlyCost: 10.00 },
  { id: 'a6', name: 'Zoom', category: 'productivity', icon: 'https://cdn-icons-png.flaticon.com/512/4401/4401433.png', description: 'Video conferencing and online meetings.', monthlyCost: 14.99 },
  { id: 'a7', name: 'Datadog', category: 'infrastructure', icon: 'https://cdn-icons-png.flaticon.com/512/5969/5969145.png', description: 'Monitoring and security platform for cloud apps.', monthlyCost: 95.00 },
  { id: 'a8', name: 'Jira', category: 'development', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968875.png', description: 'Project tracking software for agile teams.', monthlyCost: 7.50 },
  { id: 'a9', name: 'Microsoft 365', category: 'productivity', icon: 'https://cdn-icons-png.flaticon.com/512/732/732221.png', description: 'Cloud-based subscription service that brings together the best tools for the way people work today.', monthlyCost: 20.00 },
  { id: 'a10', name: 'Google Workspace', category: 'productivity', icon: 'https://cdn-icons-png.flaticon.com/512/2875/2875394.png', description: 'A collection of cloud computing, productivity and collaboration tools.', monthlyCost: 18.00 },
  { id: 'a11', name: 'Figma', category: 'productivity', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png', description: 'Collaborative interface design tool.', monthlyCost: 15.00 },
  { id: 'a12', name: 'Tableau', category: 'finance', icon: 'https://cdn-icons-png.flaticon.com/512/8727/8727655.png', description: 'Interactive data visualization software focused on business intelligence.', monthlyCost: 75.00 },
  { id: 'a13', name: 'Adobe Creative Cloud', category: 'productivity', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968393.png', description: 'Suite of applications for graphic design, video editing, and web development.', monthlyCost: 54.99 },
  { id: 'a14', name: 'HubSpot', category: 'marketing', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968872.png', description: 'Software products for inbound marketing, sales, and customer service.', monthlyCost: 45.00 },
  { id: 'a15', name: 'Okta', category: 'security', icon: 'https://cdn-icons-png.flaticon.com/512/919/919832.png', description: 'Identity and access management for modern enterprise.', monthlyCost: 8.00 },
  { id: 'a16', name: 'Confluence', category: 'productivity', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968748.png', description: 'Remote-friendly team workspace where knowledge and collaboration meet.', monthlyCost: 6.00 },
];
export interface ProvisioningRequest {
  id: string;
  appId: string;
  appName: string;
  userId: string;
  userName: string;
  department: string;
  status: 'pending' | 'approved' | 'provisioned' | 'rejected' | 'provisioning';
  justification: string;
  createdAt: string;
  updatedAt: string;
}
export const MOCK_REQUESTS: ProvisioningRequest[] = [
  { id: 'r1', appId: 'a2', appName: 'GitHub', userId: 'u1', userName: 'Yuki Tanaka', department: 'Engineering', status: 'provisioned', justification: 'Required for new project source control.', createdAt: '2024-05-10', updatedAt: '2024-05-10' },
  { id: 'r2', appId: 'a4', appName: 'Salesforce', userId: 'u2', userName: 'Kenji Sato', department: 'Sales', status: 'pending', justification: 'Access to CRM for lead management.', createdAt: '2024-05-12', updatedAt: '2024-05-12' },
  { id: 'r3', appId: 'a3', appName: 'AWS', userId: 'u1', userName: 'Admin', department: 'IT', status: 'approved', justification: 'Infrastructure maintenance.', createdAt: '2024-05-11', updatedAt: '2024-05-11' },
];
export const MOCK_BILLING_DATA = [
  { month: 'Jan', spend: 4200, licenses: 145 },
  { month: 'Feb', spend: 4500, licenses: 152 },
  { month: 'Mar', spend: 4100, licenses: 148 },
  { month: 'Apr', spend: 4800, licenses: 160 },
  { month: 'May', spend: 5200, licenses: 172 },
  { month: 'Jun', spend: 5800, licenses: 185 },
];