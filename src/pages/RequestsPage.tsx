import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
  Inbox,
  ChevronRight,
  User,
  Loader2
} from 'lucide-react';
import { useProvisioningStore } from '@/store/use-provisioning-store';
import { cn } from '@/lib/utils';
export function RequestsPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const requests = useProvisioningStore(s => s.requests);
  const updateStatus = useProvisioningStore(s => s.updateRequestStatus);
  const initialize = useProvisioningStore(s => s.initialize);
  const [processingId, setProcessingId] = useState<string | null>(null);
  useEffect(() => {
    initialize();
  }, [initialize]);
  const activeTab = location.pathname.includes('/approvals') ? 'approvals' : 'mine';
  const myRequests = requests.filter(r => r.userId === 'u1');
  const pendingApprovals = requests.filter(r => r.status === 'pending');
  const handleAction = async (id: string, status: 'approved' | 'rejected') => {
    setProcessingId(id);
    await updateStatus(id, status);
    setProcessingId(null);
  };
  const StatusBadge = ({ status }: { status: string }) => {
    const labels: Record<string, string> = {
      pending: t('common.status.pending'),
      approved: t('common.status.approved'),
      provisioning: 'Provisioning',
      provisioned: t('common.status.provisioned'),
      rejected: t('common.status.rejected'),
    };
    return (
      <Badge variant="outline" className={cn(
        "capitalize px-2 py-0.5 text-[10px] font-semibold",
        status === 'provisioned' && "bg-emerald-50 text-emerald-700 border-emerald-200",
        status === 'pending' && "bg-orange-50 text-orange-700 border-orange-200",
        status === 'provisioning' && "bg-blue-50 text-blue-700 border-blue-200 animate-pulse"
      )}>
        {labels[status] || status}
      </Badge>
    );
  };
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{activeTab === 'mine' ? t('nav.requests') : t('nav.approvals')}</h1>
        <p className="text-muted-foreground">Manage your application access and approvals.</p>
      </div>
      <Tabs 
        value={activeTab} 
        onValueChange={(val) => navigate(val === 'mine' ? '/requests' : '/approvals')}
        className="w-full"
      >
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted/50">
          <TabsTrigger value="mine">{t('nav.requests')}</TabsTrigger>
          <TabsTrigger value="approvals" className="relative">
            {t('nav.approvals')}
            {pendingApprovals.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                {pendingApprovals.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="mine" className="mt-6 space-y-4">
          {myRequests.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 border-2 border-dashed rounded-xl">
              <Inbox className="h-12 w-12 text-muted-foreground/50" />
              <div className="space-y-1">
                <p className="text-lg font-medium">No requests yet</p>
                <p className="text-sm text-muted-foreground">Applications you request will appear here.</p>
              </div>
            </div>
          ) : (
            myRequests.map((req) => (
              <Card key={req.id} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-accent/50 flex items-center justify-center text-xl font-bold">
                        {req.appName[0]}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{req.appName}</h3>
                        <p className="text-sm text-muted-foreground">Requested on {req.createdAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <StatusBadge status={req.status} />
                      <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        <TabsContent value="approvals" className="mt-6 space-y-6">
          {pendingApprovals.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 border-2 border-dashed rounded-xl">
              <CheckCircle2 className="h-12 w-12 text-emerald-500/50" />
              <div className="space-y-1">
                <p className="text-lg font-medium">All caught up!</p>
                <p className="text-sm text-muted-foreground">No pending approval requests at this time.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pendingApprovals.map((req) => (
                <Card key={req.id} className="border-border/50 shadow-sm border-l-4 border-l-blue-500 overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{req.userName}</CardTitle>
                          <CardDescription className="text-xs">{req.department}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200 text-[10px] font-bold">
                        {req.appName}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-accent/30 p-4 rounded-lg">
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-2">Justification</p>
                      <p className="text-sm italic text-foreground/80">"{req.justification}"</p>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={processingId === req.id}
                        onClick={() => handleAction(req.id, 'approved')}
                      >
                        {processingId === req.id ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Approve'}
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                        disabled={processingId === req.id}
                        onClick={() => handleAction(req.id, 'rejected')}
                      >
                        Deny
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}