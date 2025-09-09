"use client";

import { Download } from 'lucide-react';
import { usePwa } from '@/lib/pwa-context';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function InstallPromptButton() {
  const { installPromptEvent, setInstallPromptEvent } = usePwa();
  const { toast } = useToast();

  const handleInstallClick = async () => {
    if (!installPromptEvent) {
      return;
    }
    await installPromptEvent.prompt();
    const { outcome } = await installPromptEvent.userChoice;
    if (outcome === 'accepted') {
        toast({ title: "Success", description: "App installed successfully!" });
    }
    setInstallPromptEvent(null);
  };

  if (!installPromptEvent) {
    return null;
  }

  return (
    <Button
      onClick={handleInstallClick}
      className="bg-accent text-accent-foreground hover:bg-accent/90"
    >
      <Download className="mr-2 h-4 w-4" />
      Install App
    </Button>
  );
}
