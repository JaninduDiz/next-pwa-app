"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { urlBase64ToUint8Array } from '@/lib/utils';

// These functions will interact with our API routes
async function subscribeUser(subscription: PushSubscription) {
  const response = await fetch('/api/push/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscription),
  });
  if (!response.ok) {
    throw new Error('Failed to subscribe user.');
  }
}

async function unsubscribeUser() {
  const response = await fetch('/api/push/unsubscribe', {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to unsubscribe user.');
  }
}

async function sendNotification(message: string) {
  const response = await fetch('/api/push/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!response.ok) {
    throw new Error('Failed to send notification.');
  }
}


export function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window && window.location.protocol === 'https:') {
      setIsSupported(true);

      const getSubscription = async () => {
        try {
          const registration = await navigator.serviceWorker.ready;
          const sub = await registration.pushManager.getSubscription();
          setSubscription(sub);
        } catch (error) {
          console.error('Error getting push subscription:', error);
        }
      };
      getSubscription();
    }
  }, []);

  const handleSubscribe = async () => {
    if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
      console.error('VAPID public key is not defined.');
      toast({
        variant: 'destructive',
        title: 'Configuration Error',
        description: 'VAPID public key is not configured. Push notifications cannot be enabled.',
      });
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY),
      });
      await subscribeUser(sub);
      setSubscription(sub);
      toast({ title: "Subscribed successfully!" });
    } catch (error) {
      console.error('Failed to subscribe:', error);
      toast({ variant: 'destructive', title: 'Subscription Failed', description: 'Could not subscribe to push notifications. Please ensure you have granted permission.' });
    }
  };

  const handleUnsubscribe = async () => {
    if (!subscription) return;
    try {
      await subscription.unsubscribe();
      await unsubscribeUser();
      setSubscription(null);
      toast({ title: "Unsubscribed successfully." });
    } catch (error) {
      console.error('Failed to unsubscribe:', error);
      toast({ variant: 'destructive', title: 'Unsubscribe Failed', description: 'Could not unsubscribe.' });
    }
  };

  const handleSendTest = async () => {
    if (!subscription) {
      toast({ variant: 'destructive', title: 'Not Subscribed', description: 'You must be subscribed to send a test notification.' });
      return;
    }
    try {
      await sendNotification(message || 'This is a test notification!');
      setMessage('');
      toast({ title: 'Test Notification Sent' });
    } catch (error) {
      console.error('Failed to send notification:', error);
      toast({ variant: 'destructive', title: 'Send Failed', description: 'Could not send test notification.' });
    }
  };

  if (!isSupported) {
    return <p className="text-muted-foreground">Push notifications are not supported in this browser or are disabled (e.g. not on HTTPS).</p>;
  }

  return (
    <div className="space-y-4">
      {subscription ? (
        <>
          <p className="text-sm text-muted-foreground">You are currently subscribed to push notifications.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="text"
              placeholder="Enter notification message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={handleSendTest} className="w-full sm:w-auto">Send Test</Button>
            <Button onClick={handleUnsubscribe} variant="outline" className="w-full sm:w-auto">Unsubscribe</Button>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">Subscribe to receive test push notifications from the server.</p>
          <Button onClick={handleSubscribe}>Subscribe</Button>
        </>
      )}
    </div>
  );
}
