import { create } from 'zustand';
import { api } from '@/lib/api-client';
import type {
  AppEntry,
  ProvisioningRequest,
  License,
  RequestStatus,
  CreateRequestInput,
  UpdateStatusInput
} from '@shared/types';
interface ProvisioningState {
  apps: AppEntry[];
  requests: ProvisioningRequest[];
  licenses: License[];
  isLoading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  submitRequest: (params: CreateRequestInput & { appName: string; userName: string; department: string }) => Promise<void>;
  updateRequestStatus: (requestId: string, status: RequestStatus) => Promise<void>;
  grantLicense: (requestId: string) => Promise<void>;
  revokeLicense: (licenseId: string) => Promise<void>;
}
export const useProvisioningStore = create<ProvisioningState>((set, get) => ({
  apps: [],
  requests: [],
  licenses: [],
  isLoading: false,
  error: null,
  initialize: async () => {
    set({ isLoading: true });
    try {
      const [apps, requests, licenses] = await Promise.all([
        api<AppEntry[]>('/api/apps'),
        api<ProvisioningRequest[]>('/api/requests'),
        api<License[]>('/api/licenses'),
      ]);
      set({ apps, requests, licenses, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },
  submitRequest: async (params) => {
    try {
      const newReq = await api<ProvisioningRequest>('/api/requests', {
        method: 'POST',
        body: JSON.stringify(params),
      });
      set(state => ({ requests: [newReq, ...state.requests] }));
    } catch (err) {
      set({ error: (err as Error).message });
    }
  },
  updateRequestStatus: async (requestId, status) => {
    try {
      const updated = await api<ProvisioningRequest>(`/api/requests/${requestId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status } as UpdateStatusInput),
      });
      set(state => ({
        requests: state.requests.map(r => r.id === requestId ? updated : r)
      }));
      if (status === 'approved') {
        // High-fidelity Zero-Ops Simulation
        setTimeout(async () => {
          await get().updateRequestStatus(requestId, 'provisioning');
          setTimeout(async () => {
            await get().grantLicense(requestId);
          }, 2500);
        }, 1200);
      }
    } catch (err) {
      set({ error: (err as Error).message });
    }
  },
  grantLicense: async (requestId) => {
    const currentRequests = get().requests;
    const currentApps = get().apps;
    const request = currentRequests.find(r => r.id === requestId);
    const app = currentApps.find(a => a.id === request?.appId);
    if (!request || !app) return;
    try {
      const newLicense = await api<License>('/api/licenses', {
        method: 'POST',
        body: JSON.stringify({
          appId: app.id,
          appName: app.name,
          userId: request.userId,
          userName: request.userName,
          seatType: 'Standard',
          monthlyCost: app.monthlyCost,
        }),
      });
      const updatedRequest = await api<ProvisioningRequest>(`/api/requests/${requestId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'provisioned' } as UpdateStatusInput),
      });
      set(state => ({
        licenses: [newLicense, ...state.licenses],
        requests: state.requests.map(r => r.id === requestId ? updatedRequest : r)
      }));
    } catch (err) {
      set({ error: (err as Error).message });
    }
  },
  revokeLicense: async (licenseId) => {
    try {
      await api(`/api/licenses/${licenseId}`, { method: 'DELETE' });
      set(state => ({
        licenses: state.licenses.filter(l => l.id !== licenseId)
      }));
    } catch (err) {
      set({ error: (err as Error).message });
    }
  },
}));