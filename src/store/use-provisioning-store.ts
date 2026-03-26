import { create } from 'zustand';
import { 
  MOCK_APPS, 
  MOCK_REQUESTS as INITIAL_REQUESTS 
} from '@shared/mock-data';
import type { 
  AppEntry, 
  ProvisioningRequest, 
  License, 
  RequestStatus 
} from '@shared/types';
interface ProvisioningState {
  apps: AppEntry[];
  requests: ProvisioningRequest[];
  licenses: License[];
  // Actions
  submitRequest: (params: { appId: string; userId: string; userName: string; department: string; justification: string }) => Promise<void>;
  updateRequestStatus: (requestId: string, status: RequestStatus) => void;
  grantLicense: (requestId: string) => void;
  revokeLicense: (licenseId: string) => void;
}
export const useProvisioningStore = create<ProvisioningState>((set, get) => ({
  apps: MOCK_APPS,
  requests: INITIAL_REQUESTS.map(r => ({
    ...r,
    appId: MOCK_APPS.find(a => a.name === r.appName)?.id || 'unknown',
    createdAt: r.date,
    updatedAt: r.date,
    justification: 'Standard access request for project requirements.'
  })),
  licenses: [
    {
      id: 'l1',
      appId: 'a1',
      appName: 'Slack',
      userId: 'u1',
      userName: 'Yuki Tanaka',
      status: 'active',
      seatType: 'Pro',
      monthlyCost: 12.50,
      grantedAt: '2024-01-15'
    },
    {
      id: 'l2',
      appId: 'a2',
      appName: 'GitHub',
      userId: 'u1',
      userName: 'Yuki Tanaka',
      status: 'active',
      seatType: 'Enterprise',
      monthlyCost: 21.00,
      grantedAt: '2024-02-10'
    }
  ],
  submitRequest: async ({ appId, userId, userName, department, justification }) => {
    const app = get().apps.find(a => a.id === appId);
    if (!app) return;
    const newRequest: ProvisioningRequest = {
      id: crypto.randomUUID(),
      appId,
      appName: app.name,
      userId,
      userName,
      department,
      status: 'pending',
      justification,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    set(state => ({
      requests: [newRequest, ...state.requests]
    }));
  },
  updateRequestStatus: (requestId, status) => {
    set(state => ({
      requests: state.requests.map(r => 
        r.id === requestId 
          ? { ...r, status, updatedAt: new Date().toISOString().split('T')[0] } 
          : r
      )
    }));
    // Auto-provisioning simulation
    if (status === 'approved') {
      setTimeout(() => {
        get().updateRequestStatus(requestId, 'provisioning');
        setTimeout(() => {
          get().grantLicense(requestId);
        }, 2000);
      }, 1500);
    }
  },
  grantLicense: (requestId) => {
    const request = get().requests.find(r => r.id === requestId);
    const app = get().apps.find(a => a.id === request?.appId);
    if (!request || !app) return;
    const newLicense: License = {
      id: crypto.randomUUID(),
      appId: app.id,
      appName: app.name,
      userId: request.userId,
      userName: request.userName,
      status: 'active',
      seatType: 'Standard',
      monthlyCost: app.monthlyCost,
      grantedAt: new Date().toISOString().split('T')[0],
    };
    set(state => ({
      licenses: [newLicense, ...state.licenses],
      requests: state.requests.map(r => 
        r.id === requestId 
          ? { ...r, status: 'provisioned', updatedAt: new Date().toISOString().split('T')[0] } 
          : r
      )
    }));
  },
  revokeLicense: (licenseId) => {
    set(state => ({
      licenses: state.licenses.filter(l => l.id !== licenseId)
    }));
  }
}));