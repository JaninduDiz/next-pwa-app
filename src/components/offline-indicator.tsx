"use client";

import { WifiOff } from 'lucide-react';
import { usePwa } from '@/lib/pwa-context';

export function OfflineIndicator() {
  const { isOffline } = usePwa();

  if (!isOffline) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="assertive"
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-destructive text-destructive-foreground p-3 animate-in fade-in"
    >
      <WifiOff className="mr-2 h-5 w-5" />
      <p className="font-semibold">You are currently offline.</p>
    </div>
  );
}
