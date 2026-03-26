import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Info, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MOCK_APPS } from '@shared/mock-data';
import { cn } from '@/lib/utils';
export function CatalogPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const filteredApps = MOCK_APPS.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredApps.map((app) => (
          <Card key={app.id} className="group border-border/50 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden flex flex-col">
            <CardHeader className="p-6 pb-0 flex flex-row items-center justify-between">
              <div className="h-12 w-12 rounded-xl bg-accent/30 p-2.5 flex items-center justify-center overflow-hidden">
                <img src={app.icon} alt={app.name} className="h-full w-full object-contain grayscale-[0.3] group-hover:grayscale-0 transition-all duration-300" />
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/50 hover:text-foreground">
                <Info className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-6 flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">{app.name}</h3>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{app.category}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {app.description}
              </p>
              <div className="pt-2">
                <p className="text-xs font-medium text-muted-foreground">Estimated Cost</p>
                <p className="text-sm font-bold text-foreground">${app.monthlyCost.toFixed(2)} / mo</p>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium gap-2 group/btn">
                {t('catalog.request')}
                <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {filteredApps.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground">No applications found matching "{searchQuery}"</p>
          <Button variant="link" onClick={() => setSearchQuery('')} className="mt-2 text-blue-600">Clear search</Button>
        </div>
      )}
    </div>
  );
}