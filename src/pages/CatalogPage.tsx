import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Info, ChevronRight, CheckCircle2, Clock, SearchX } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useProvisioningStore } from '@/store/use-provisioning-store';
import { RequestModal } from '@/components/RequestModal';
import type { AppEntry } from '@shared/types';
import { cn } from '@/lib/utils';
export function CatalogPage() {
  const { t } = useTranslation();
  const apps = useProvisioningStore(s => s.apps);
  const requests = useProvisioningStore(s => s.requests);
  const licenses = useProvisioningStore(s => s.licenses);
  const isLoading = useProvisioningStore(s => s.isLoading);
  const initialize = useProvisioningStore(s => s.initialize);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<AppEntry | null>(null);
  useEffect(() => {
    if (apps.length === 0) initialize();
  }, [apps.length, initialize]);
  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const getAppState = (appId: string) => {
    const hasLicense = licenses.some(l => l.appId === appId && l.userId === 'u1');
    if (hasLicense) return 'active';
    const pendingRequest = requests.find(r => r.appId === appId && r.userId === 'u1' && (r.status === 'pending' || r.status === 'approved' || r.status === 'provisioning'));
    if (pendingRequest) return 'pending';
    return 'available';
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('catalog.title')}</h1>
            <p className="text-muted-foreground">{t('catalog.subtitle')}</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('catalog.search')}
                className="pl-9 bg-background border-border/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="shrink-0 border-border/50">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="border-border/50 shadow-sm overflow-hidden h-[340px]">
                <div className="p-6 space-y-4">
                  <Skeleton className="h-12 w-12 rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </Card>
            ))}
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 border-2 border-dashed rounded-2xl bg-muted/20">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <SearchX className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{t('catalog.empty')}</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                We couldn't find any applications matching your search criteria. Try a different term or category.
              </p>
            </div>
            <Button variant="outline" onClick={() => setSearchQuery('')}>Clear Search</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredApps.map((app) => {
              const state = getAppState(app.id);
              return (
                <Card key={app.id} className="group border-border/50 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden flex flex-col">
                  <CardHeader className="p-6 pb-0 flex flex-row items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-accent/30 p-2.5 flex items-center justify-center overflow-hidden">
                      <img src={app.icon} alt={app.name} className="h-full w-full object-contain grayscale-[0.3] group-hover:grayscale-0 transition-all duration-300" />
                    </div>
                    {state === 'active' ? (
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1 px-2 py-1">
                        <CheckCircle2 className="h-3 w-3" /> Active
                      </Badge>
                    ) : state === 'pending' ? (
                      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 gap-1 px-2 py-1">
                        <Clock className="h-3 w-3" /> Pending
                      </Badge>
                    ) : (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/50 hover:text-foreground">
                        <Info className="h-4 w-4" />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="p-6 flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg">{app.name}</h3>
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t(`catalog.categories.${app.category}`)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed h-10">
                      {app.description}
                    </p>
                    <div className="pt-2">
                      <p className="text-xs font-medium text-muted-foreground">Estimated Cost</p>
                      <p className="text-sm font-bold text-foreground">${app.monthlyCost.toFixed(2)} / mo</p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button
                      className={cn(
                        "w-full font-medium gap-2 group/btn transition-colors",
                        state === 'available' ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm" : "bg-muted text-muted-foreground pointer-events-none"
                      )}
                      onClick={() => state === 'available' && setSelectedApp(app)}
                    >
                      {state === 'available' ? t('catalog.request') : state === 'active' ? 'Already Provisioned' : 'Request Pending'}
                      {state === 'available' && <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
        <RequestModal
          app={selectedApp}
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      </div>
    </div>
  );
}