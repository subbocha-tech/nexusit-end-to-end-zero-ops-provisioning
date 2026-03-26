import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useProvisioningStore } from '@/store/use-provisioning-store';
import type { AppEntry } from '@shared/types';
interface RequestModalProps {
  app: AppEntry | null;
  isOpen: boolean;
  onClose: () => void;
}
export function RequestModal({ app, isOpen, onClose }: RequestModalProps) {
  const { t } = useTranslation();
  const submitRequest = useProvisioningStore(s => s.submitRequest);
  const [justification, setJustification] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = async () => {
    if (!app || !justification.trim()) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    await submitRequest({
      appId: app.id,
      userId: 'u1', // Mock current user
      userName: 'Yuki Tanaka',
      department: 'Engineering',
      justification: justification.trim(),
    });
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setJustification('');
    }, 2000);
  };
  if (!app) return null;
  return (
    <Dialog open={isOpen} onOpenChange={(val) => !isSubmitting && !isSuccess && !val && onClose()}>
      <DialogContent className="sm:max-w-[425px] overflow-hidden">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-accent p-1.5">
                    <img src={app.icon} alt="" className="h-full w-full object-contain" />
                  </div>
                  {t('catalog.request')} {app.name}
                </DialogTitle>
                <DialogDescription>
                  Please provide a business justification for this application request.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-6">
                <div className="space-y-2">
                  <Label htmlFor="justification">Business Justification</Label>
                  <Textarea
                    id="justification"
                    placeholder="e.g., Required for upcoming client project..."
                    className="min-h-[100px] resize-none"
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Estimated monthly cost: <span className="font-bold text-foreground">${app.monthlyCost.toFixed(2)}</span>
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting || !justification.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white min-w-[100px]"
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Submit Request'}
                </Button>
              </DialogFooter>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Request Submitted</h3>
                <p className="text-muted-foreground mt-1">Your request is now pending approval.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}