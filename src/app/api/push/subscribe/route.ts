import { NextResponse, type NextRequest } from 'next/server';

let subscription: PushSubscription | null = null;

export async function POST(request: NextRequest) {
  try {
    subscription = await request.json();
    console.log('Subscribed:', subscription);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error saving subscription:', error);
    return NextResponse.json({ error: 'Failed to save subscription' }, { status: 500 });
  }
}

export function getSubscription() {
  return subscription;
}
