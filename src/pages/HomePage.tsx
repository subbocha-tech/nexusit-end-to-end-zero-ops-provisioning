import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  Users,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  PlusCircle,
  Key,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProvisioningStore } from '@/store/use-provisioning-store';
import { cn } from '@/lib/utils';
export function HomePage() {
  const { t } = useTranslation();
  const requests = useProvisioningStore(s => s.requests);
  const licenses = useProvisioningStore(s => s.licenses);
  const isLoading = useProvisioningStore(s => s.isLoading);
  const initialize = useProvisioningStore(s => s.initialize);
  useEffect(() => {
    initialize();
  }, [initialize]);
  const sortedRequests = [...requests].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const activeCount = licenses.length;
  const totalSpend = licenses.reduce((sum, l) => sum + l.monthlyCost, 0);
  const stats = [
    { label: t('dashboard.stats.totalSpend'), value: `${totalSpend.toLocaleString()}`, icon: CreditCard, color: 'text-blue-600', trend: '+12%' },
    { label: t('dashboard.stats.activeLicenses'), value: activeCount.toString(), icon: Users, color: 'text-emerald-600', trend: '+5' },
    { label: t('dashboard.stats.pendingRequests'), value: pendingCount.toString(), icon: Clock, color: 'text-orange-600', trend: '-2' },
    { label: t('dashboard.stats.utilization'), value: '94%', icon: ShieldCheck, color: 'text-indigo-600', trend: '+3%' },
  ];
  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'provisioned': return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20">{t('common.status.provisioned')}</Badge>;
      case 'approved': return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20">{t('common.status.approved')}</Badge>;
      case 'pending': return <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20 hover:bg-orange-500/20">{t('common.status.pending')}</Badge>;
      case 'provisioning': return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 animate-pulse">Provisioning</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground">{t('dashboard.welcome')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-border/50 shadow-sm overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={cn("p-2 rounded-lg bg-background border border-border group-hover:scale-110 transition-transform duration-300")}>
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
              <CardDescription>Latest provisioning events across all platforms</CardDescription>
            </div>
            <Link to="/requests">
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                {t('common.viewAll')} <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sortedRequests.slice(0, 5).map((req) => (
                <div key={req.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center font-bold text-xs">
                      {req.appName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{req.userName}</p>
                      <p className="text-xs text-muted-foreground">{req.appName} • {req.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground hidden sm:block">{req.updatedAt}</span>
                    {getStatusBadge(req.status)}
                  </div>
                </div>
              ))}
              {requests.length === 0 && (
                <p className="text-center py-10 text-muted-foreground">No recent activity found.</p>
              )}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card className="border-border/50 shadow-sm bg-blue-600 text-white border-none overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <PlusCircle className="h-24 w-24" />
            </div>
            <CardHeader>
              <CardTitle className="text-white">{t('dashboard.quickActions')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/catalog">
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 border-none justify-start gap-2 h-11">
                  <PlusCircle className="h-4 w-4" /> {t('dashboard.requestNewApp')}
                </Button>
              </Link>
              <Button className="w-full bg-blue-500 text-white hover:bg-blue-400 border-none justify-start gap-2 h-11">
                <Key className="h-4 w-4" /> {t('dashboard.requestReset')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}