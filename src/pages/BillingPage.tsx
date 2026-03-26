import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  Download,
  FileText,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MOCK_BILLING_DATA } from '@shared/mock-data';
import { useProvisioningStore } from '@/store/use-provisioning-store';
export function BillingPage() {
  const { t } = useTranslation();
  const apps = useProvisioningStore(s => s.apps);
  const initialize = useProvisioningStore(s => s.initialize);
  useEffect(() => {
    initialize();
  }, [initialize]);
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('billing.title')}</h1>
          <p className="text-muted-foreground">{t('billing.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 border-border/50">
            <Calendar className="h-4 w-4" /> Last 6 Months
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Download className="h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-border/50 shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <div>
              <CardTitle>{t('billing.monthlyTrend')}</CardTitle>
              <CardDescription>Visual breakdown of software expenses</CardDescription>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 font-medium">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">+18.5% YoY</span>
            </div>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_BILLING_DATA}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  tickFormatter={(val) => `${val}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="spend"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSpend)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Top Drivers</CardTitle>
            <CardDescription>Major cost contributors this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {(apps.length > 0 ? apps : []).slice(0, 4).map((app) => (
              <div key={app.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-accent flex items-center justify-center p-1.5 overflow-hidden">
                    <img src={app.icon} alt="" className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                  <span className="text-sm font-medium">{app.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">${(app.monthlyCost * 24).toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">24 Seats</p>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-xs text-blue-600 hover:bg-blue-50">View detailed breakdown</Button>
          </CardContent>
        </Card>
      </div>
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle>{t('billing.breakdown')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Application</TableHead>
                <TableHead>{t('billing.department')}</TableHead>
                <TableHead>License Type</TableHead>
                <TableHead className="text-right">{t('billing.amount')}</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(apps.length > 0 ? apps : []).map((app) => (
                <TableRow key={app.id} className="group transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <img src={app.icon} alt="" className="h-5 w-5 grayscale group-hover:grayscale-0 transition-all" />
                      {app.name}
                    </div>
                  </TableCell>
                  <TableCell className="capitalize text-sm">{app.category}</TableCell>
                  <TableCell className="text-sm">Enterprise Plan</TableCell>
                  <TableCell className="text-right font-semibold">${app.monthlyCost.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}