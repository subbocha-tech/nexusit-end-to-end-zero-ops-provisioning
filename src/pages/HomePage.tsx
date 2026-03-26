import React, { useEffect, useMemo } from 'react';
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
  Loader2,
  Shield,
  Zap,
  Info,
  AlertTriangle,
  CheckCircle
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
  const activities = useProvisioningStore(s => s.activities);
  const isLoading = useProvisioningStore(s => s.isLoading);
  const initialize = useProvisioningStore(s => s.initialize);
  useEffect(() => {
    initialize();
  }, [initialize]);
  const feedItems = useMemo(() => {
    const requestActivities = requests.map(r => ({
      id: r.id,
      type: 'provisioning' as const,
      title: r.appName,
      message: `${r.userName} requested access to ${r.appName}`,
      status: r.status === 'rejected' ? 'error' : r.status === 'provisioned' ? 'success' : 'info',
      timestamp: r.updatedAt,
      rawStatus: r.status
    }));
    const logs = activities.map(a => ({
      id: a.id,
      type: a.type,
      title: a.title,
      message: a.message,
      status: a.status,
      timestamp: a.timestamp,
      rawStatus: null
    }));
    return [...requestActivities, ...logs].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [requests, activities]);
  const stats = [
    { label: t('dashboard.stats.totalSpend'), value: `$${licenses.reduce((sum, l) => sum + l.monthlyCost, 0).toLocaleString()}`, icon: CreditCard, color: 'text-blue-600', trend: '+18%' },
    { label: t('dashboard.stats.activeLicenses'), value: licenses.filter(l => l.status === 'active').length.toString(), icon: Users, color: 'text-emerald-600', trend: '+12' },
    { label: t('dashboard.stats.pendingRequests'), value: requests.filter(r => r.status === 'pending').length.toString(), icon: Clock, color: 'text-orange-600', trend: '-1' },
    { label: t('dashboard.stats.utilization'), value: '92%', icon: ShieldCheck, color: 'text-indigo-600', trend: '+2%' },
  ];
  const getActivityIcon = (type: string, status: string) => {
    switch (type) {
      case 'security': return <Shield className="h-4 w-4 text-red-500" />;
      case 'billing': return <CreditCard className="h-4 w-4 text-emerald-500" />;
      case 'provisioning': return <Zap className="h-4 w-4 text-blue-500" />;
      case 'system': return <Info className="h-4 w-4 text-slate-500" />;
      default: return <Info className="h-4 w-4" />;
    }
  };
  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
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
                  <div className="p-2 rounded-lg bg-background border border-border group-hover:scale-110 transition-transform duration-300">
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
                <CardDescription>Real-time system events and provisioning requests</CardDescription>
              </div>
              <Link to="/requests">
                <Button variant="ghost" size="sm" className="text-blue-600">
                  {t('common.viewAll')} <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {feedItems.slice(0, 8).map((item) => (
                  <div key={item.id} className="flex items-start justify-between group">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 h-8 w-8 rounded-lg bg-accent/50 flex items-center justify-center">
                        {getActivityIcon(item.type, item.status)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold">{item.title}</p>
                          <Badge variant="outline" className="text-[10px] h-4 px-1 lowercase font-normal border-muted-foreground/20">
                            {t(`dashboard.activityTypes.${item.type}`)}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.message}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1.5">
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                      {item.rawStatus ? (
                         <Badge variant="outline" className={cn(
                          "text-[9px] h-4 px-1.5 uppercase font-bold",
                          item.rawStatus === 'provisioned' && "bg-emerald-50 text-emerald-700 border-emerald-200",
                          item.rawStatus === 'pending' && "bg-orange-50 text-orange-700 border-orange-200",
                          item.rawStatus === 'provisioning' && "bg-blue-50 text-blue-700 border-blue-200 animate-pulse"
                        )}>
                          {item.rawStatus}
                        </Badge>
                      ) : (
                        <div className="flex items-center gap-1">
                          {item.status === 'warning' && <AlertTriangle className="h-3 w-3 text-orange-500" />}
                          {item.status === 'success' && <CheckCircle className="h-3 w-3 text-emerald-500" />}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
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
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Health Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Provisioning Engine</span>
                    <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Healthy
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">SaaS API Sync</span>
                    <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}