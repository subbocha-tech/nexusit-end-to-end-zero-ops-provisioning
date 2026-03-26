import type { User, Chat, ChatMessage, ProvisioningRequest, AppEntry, License, ActivityLog } from './types';
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Yuki Tanaka', department: 'Engineering', email: 'yuki.tanaka@nexus-it.io' },
  { id: 'u2', name: 'Sarah Chen', department: 'Marketing', email: 'sarah.chen@nexus-it.io' },
  { id: 'u3', name: 'Michael Ross', department: 'Legal', email: 'michael.ross@nexus-it.io' },
  { id: 'u4', name: 'Elena Rodriguez', department: 'Finance', email: 'elena.rodriguez@nexus-it.io' }
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
  { id: 'r10', appId: 'a3', appName: 'AWS', userId: 'u2', userName: 'Sarah Chen', department: 'Marketing', status: 'rejected', justification: 'No clear business need for infra access.', createdAt: '2024-05-10', updatedAt: '2024-05-11' },
  { id: 'r11', appId: 'a1', appName: 'Slack', userId: 'u1', userName: 'Yuki Tanaka', department: 'Engineering', status: 'provisioned', justification: 'Standard onboarding.', createdAt: '2024-04-20', updatedAt: '2024-04-21' },
  { id: 'r12', appId: 'a5', appName: 'Notion', userId: 'u2', userName: 'Sarah Chen', department: 'Marketing', status: 'provisioned', justification: 'Campaign planning.', createdAt: '2024-04-22', updatedAt: '2024-04-23' },
];
export const MOCK_LICENSES: License[] = [
  { id: 'l1', appId: 'a1', userId: 'u1', userName: 'Yuki Tanaka', appName: 'Slack', status: 'active', seatType: 'Pro', monthlyCost: 12.50, grantedAt: '2024-01-10' },
  { id: 'l2', appId: 'a2', userId: 'u1', userName: 'Yuki Tanaka', appName: 'GitHub', status: 'active', seatType: 'Enterprise', monthlyCost: 21.00, grantedAt: '2024-05-02' },
  { id: 'l3', appId: 'a5', userId: 'u3', userName: 'Michael Ross', appName: 'Notion', status: 'active', seatType: 'Standard', monthlyCost: 10.00, grantedAt: '2024-05-06' },
  { id: 'l4', appId: 'a6', userId: 'u3', userName: 'Michael Ross', appName: 'Zoom', status: 'active', seatType: 'Pro', monthlyCost: 14.99, grantedAt: '2024-05-04' },
  { id: 'l5', appId: 'a1', userId: 'u2', userName: 'Sarah Chen', appName: 'Slack', status: 'active', seatType: 'Standard', monthlyCost: 12.50, grantedAt: '2024-02-15' },
  { id: 'l6', appId: 'a5', userId: 'u2', userName: 'Sarah Chen', appName: 'Notion', status: 'active', seatType: 'Standard', monthlyCost: 10.00, grantedAt: '2024-04-23' },
  { id: 'l7', appId: 'a8', userId: 'u4', userName: 'Elena Rodriguez', appName: 'Jira', status: 'revoked', seatType: 'Standard', monthlyCost: 7.50, grantedAt: '2023-11-20' },
  { id: 'l8', appId: 'a4', userId: 'u4', userName: 'Elena Rodriguez', appName: 'Salesforce', status: 'expired', seatType: 'Enterprise', monthlyCost: 150.00, grantedAt: '2023-05-01' },
  { id: 'l9', appId: 'a2', userId: 'u4', userName: 'Elena Rodriguez', appName: 'GitHub', status: 'active', seatType: 'Pro', monthlyCost: 21.00, grantedAt: '2024-05-12' },
  { id: 'l10', appId: 'a7', userId: 'u1', userName: 'Yuki Tanaka', appName: 'Datadog', status: 'active', seatType: 'Pro', monthlyCost: 95.00, grantedAt: '2024-03-01' },
  { id: 'l11', appId: 'a3', userId: 'u1', userName: 'Yuki Tanaka', appName: 'AWS', status: 'active', seatType: 'Enterprise', monthlyCost: 450.00, grantedAt: '2024-05-13' },
  { id: 'l12', appId: 'a1', userId: 'u3', userName: 'Michael Ross', appName: 'Slack', status: 'active', seatType: 'Standard', monthlyCost: 12.50, grantedAt: '2024-01-20' },
];
export const MOCK_ACTIVITIES: ActivityLog[] = [
  { id: 'ac1', type: 'security', title: 'Password Reset', message: 'Successful password reset for @yuki_tanaka', status: 'success', timestamp: '2024-05-15T10:30:00Z', userName: 'Yuki Tanaka' },
  { id: 'ac2', type: 'billing', title: 'Budget Alert', message: 'AWS monthly spend exceeded 80% of budget', status: 'warning', timestamp: '2024-05-15T09:15:00Z' },
  { id: 'ac3', type: 'system', title: 'New Admin', message: 'Elena Rodriguez promoted to IT Admin', status: 'info', timestamp: '2024-05-14T16:45:00Z', userName: 'Elena Rodriguez' },
  { id: 'ac4', type: 'security', title: 'Login Warning', message: 'Unusual login detected from new IP (San Francisco)', status: 'warning', timestamp: '2024-05-14T11:20:00Z', userName: 'Sarah Chen' },
  { id: 'ac5', type: 'provisioning', title: 'Auto-Revoke', message: 'Jira access revoked for inactive contractor', status: 'info', timestamp: '2024-05-13T08:00:00Z' },
  { id: 'ac6', type: 'billing', title: 'Invoice Ready', message: 'May 2024 consolidated invoice is now available', status: 'success', timestamp: '2024-05-12T14:00:00Z' },
  { id: 'ac7', type: 'security', title: 'Audit Complete', message: 'Q2 Security Compliance Audit finished with 0 findings', status: 'success', timestamp: '2024-05-10T17:30:00Z' },
  { id: 'ac8', type: 'system', title: 'Platform Update', message: 'NexusIT v2.4.0 deployed successfully', status: 'info', timestamp: '2024-05-09T22:00:00Z' },
];
export const MOCK_BILLING_DATA = [
  { month: 'Jul', spend: 3800, licenses: 130 },
  { month: 'Aug', spend: 3950, licenses: 135 },
  { month: 'Sep', spend: 4100, licenses: 140 },
  { month: 'Oct', spend: 4050, licenses: 142 },
  { month: 'Nov', spend: 4200, licenses: 145 },
  { month: 'Dec', spend: 4350, licenses: 148 },
  { month: 'Jan', spend: 4200, licenses: 145 },
  { month: 'Feb', spend: 4500, licenses: 152 },
  { month: 'Mar', spend: 4100, licenses: 148 },
  { month: 'Apr', spend: 4800, licenses: 160 },
  { month: 'May', spend: 5200, licenses: 172 },
  { month: 'Jun', spend: 5800, licenses: 185 },
];
export const MOCK_CHATS: Chat[] = [
  { id: 'c1', title: 'System Alerts' },
];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', chatId: 'c1', userId: 'u1', text: 'GitHub provisioned for user @yuki_tanaka', ts: Date.now() },
];