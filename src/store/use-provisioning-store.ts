import { create } from 'zustand';
import { api } from '@/lib/api-client';
import type {
  AppEntry,
  ProvisioningRequest,
  License,
  RequestStatus,
  CreateRequestInput,
  UpdateStatusInput,
  ActivityLog
} from '@shared/types';
interface ProvisioningState {
  apps: AppEntry[];
  requests: ProvisioningRequest[];
  licenses: License[];
  activities: ActivityLog[];
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
  activities: [],
  isLoading: false,
  error: null,
  initialize: async () => {
    const { isLoading, apps, requests, licenses, activities } = get();
    // Only skip if we are already loading or if all data arrays are populated
    if (isLoading || (apps.length > 0 && requests.length > 0 && licenses.length > 0 && activities.length > 0)) return;
    set({ isLoading: true, error: null });
    try {
      const fetches = [
        {key:'apps', fn:()=>api<AppEntry[]>('/api/apps')},
        {key:'requests', fn:()=>api<ProvisioningRequest[]>('/api/requests')},
        {key:'licenses', fn:()=>api<License[]>('/api/licenses')},
        {key:'activities', fn:()=>api<ActivityLog[]>('/api/activities')}
      ];
      const results = await Promise.allSettled(fetches.map(f => f.fn()));
      const newState = {apps:[],requests:[],licenses:[],activities:[]};
      const failed = [];
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          newState[fetches[index].key as keyof typeof newState] = result.value;
        } else {
          failed.push(fetches[index].key);
        }
      });
      if (failed.length > 0) {
        results.forEach((result, index) => {
          if (result.status === 'rejected' && failed.includes(fetches[index].key)) {
            console.error(`Provisioning store initialization failed for ${fetches[index].key}:`, result.reason);
          }
        });
      }
      set({...newState, isLoading: false, error: failed.length === 4 ? 'Failed to load all provisioning data' : null});
    } catch (err) {
      console.error('Failed to initialize provisioning store:', err);
      set({ error: (err as Error)?.message ?? 'An unknown error occurred', isLoading: false });
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
      set({ error: (err as Error)?.message ?? 'An unknown error occurred' });
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
        // Automatically simulate provisioning workflow steps
        setTimeout(async () => {
          await get().updateRequestStatus(requestId, 'provisioning' as RequestStatus);
          setTimeout(async () => {
            await get().grantLicense(requestId);
          }, 2500);
        }, 1200);
      }
    } catch (err) {
      set({ error: (err as Error)?.message ?? 'An unknown error occurred' });
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
      set({ error: (err as Error)?.message ?? 'An unknown error occurred' });
    }
  },
  revokeLicense: async (licenseId) => {
    try {
      await api(`/api/licenses/${licenseId}`, { method: 'DELETE' });
      set(state => ({
        licenses: state.licenses.filter(l => l.id !== licenseId)
      }));
    } catch (err) {
      set({ error: (err as Error)?.message ?? 'An unknown error occurred' });
    }
  },
}));