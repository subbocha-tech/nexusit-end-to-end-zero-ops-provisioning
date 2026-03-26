export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface User {
  id: string;
  name: string;
  email?: string;
  department?: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number;
}
export type RequestStatus = 'pending' | 'approved' | 'provisioning' | 'provisioned' | 'rejected';
export interface ProvisioningRequest {
  id: string;
  appId: string;
  appName: string;
  userId: string;
  userName: string;
  department: string;
  status: RequestStatus;
  justification: string;
  createdAt: string;
  updatedAt: string;
}
export interface License {
  id: string;
  appId: string;
  userId: string;
  userName: string;
  appName: string;
  status: 'active' | 'expired' | 'revoked';
  seatType: 'Standard' | 'Pro' | 'Enterprise';
  monthlyCost: number;
  grantedAt: string;
  expiresAt?: string;
}
export interface AppEntry {
  id: string;
  name: string;
  category: 'productivity' | 'development' | 'finance' | 'infrastructure';
  icon: string;
  description: string;
  monthlyCost: number;
}