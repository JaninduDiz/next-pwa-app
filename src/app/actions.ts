'use server'
 
import webpush from 'web-push'
 
if (!process.env.VAPID_PRIVATE_KEY || !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
  console.warn(
    'VAPID keys are not defined. Push notifications will not work.'
  );
} else {
  webpush.setVapidDetails(
    'mailto:janindu001@gmail.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}
 
let subscription: PushSubscription | null = null
 
export async function subscribeUser(sub: PushSubscription) {
  subscription = sub
  console.log('Subscribed:', subscription);
  // In a production environment, you would want to store the subscription in a database
  return { success: true }
}
 
export async function unsubscribeUser() {
  console.log('Unsubscribed:', subscription);
  subscription = null
  // In a production environment, you would want to remove the subscription from the database
  return { success: true }
}
 
export async function sendNotification(message: string) {
  if (!subscription) {
    console.error('No subscription available to send notification to.');
    return { success: false, error: 'No active subscription' };
  }
 
  try {
    const payload = JSON.stringify({
      title: 'Test Notification',
      body: message,
      icon: '/icons/icon-192x192.png',
    });

    await webpush.sendNotification(
      subscription,
      payload
    )
    return { success: true }
  } catch (error) {
    console.error('Error sending push notification:', error)
    if (error instanceof Error && 'statusCode' in error && (error as any).statusCode === 410) {
        console.log("Subscription expired or invalid.");
        subscription = null; // Clear the invalid subscription
    }
    return { success: false, error: 'Failed to send notification' }
  }
}
