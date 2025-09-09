import { NextResponse, type NextRequest } from 'next/server';
import webpush from 'web-push';
import { getSubscription } from '../subscribe/route';

if (!process.env.VAPID_PRIVATE_KEY || !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
  console.warn(
    'VAPID keys are not defined. Push notifications will not work.'
  );
} else {
  webpush.setVapidDetails(
    'mailto:your-email@example.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

export async function POST(request: NextRequest) {
  const subscription = getSubscription();

  if (!subscription) {
    return NextResponse.json({ error: 'No active subscription' }, { status: 404 });
  }

  if (!process.env.VAPID_PRIVATE_KEY || !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
    return NextResponse.json({ error: 'VAPID keys not configured on server' }, { status: 500 });
  }

  try {
    const { message } = await request.json();
    const payload = JSON.stringify({
      title: 'Test Notification',
      body: message,
    });
    
    await webpush.sendNotification(subscription, payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending push notification:', error);
    // If a subscription is invalid, it should be removed.
    if (error instanceof Error && 'statusCode' in error && (error as any).statusCode === 410) {
        // Here you would typically remove the subscription from your database
        console.log("Subscription expired or invalid.");
    }
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
