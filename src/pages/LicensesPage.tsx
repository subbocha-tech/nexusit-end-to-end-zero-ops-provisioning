import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Key,
  Trash2,
  Search,
  TrendingDown,
  CreditCard
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useProvisioningStore } from '@/store/use-provisioning-store';
export function LicensesPage() {
  const { t } = useTranslation();
  const licenses = useProvisioningStore(s => s.licenses);
  const revokeLicense = useProvisioningStore(s => s.revokeLicense);
  const initialize = useProvisioningStore(s => s.initialize);
  const [searchQuery, setSearchQuery] = useState('');
  const [revokingId, setRevokingId] = useState<string | null>(null);
  useEffect(() => {
    initialize();
  }, [initialize]);
  const filteredLicenses = licenses.filter(l =>
    l.appName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalCost = licenses.reduce((sum, l) => sum + l.monthlyCost, 0);
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('nav.licenses')}</h1>
        <p className="text-muted-foreground">Audit and manage active software licenses across the organization.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/50 shadow-sm overflow-hidden">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Key className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Total Licenses</p>
                <h3 className="text-2xl font-bold">{licenses.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm overflow-hidden">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Monthly Spend</p>
                <h3 className="text-2xl font-bold">${totalCost.toFixed(2)}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm overflow-hidden">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Unused Seats</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>Active Subscriptions</CardTitle>
            <CardDescription>Real-time view of provisioned accounts.</CardDescription>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter by user or app..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border/40 overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Application</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Provisioned</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLicenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No licenses found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLicenses.map((license) => (
                    <TableRow key={license.id} className="group transition-colors">
                      <TableCell className="font-medium text-sm">{license.userName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-6 h-6 rounded bg-accent flex items-center justify-center text-[10px] font-bold">
                            {license.appName[0]}
                          </span>
                          {license.appName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal text-[10px] uppercase">{license.seatType}</Badge>
                      </TableCell>
                      <TableCell className="text-sm font-medium">${license.monthlyCost.toFixed(2)}</TableCell>
                      <TableCell className="text-muted-foreground text-xs">{license.grantedAt}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground/50 hover:text-red-600 hover:bg-red-50 transition-colors"
                          onClick={() => setRevokingId(license.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <AlertDialog open={!!revokingId} onOpenChange={() => setRevokingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will revoke the user's access to this application. The license will be released back to the pool immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                if (revokingId) revokeLicense(revokingId);
                setRevokingId(null);
              }}
            >
              Revoke Access
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}