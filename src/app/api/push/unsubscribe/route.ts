import { NextResponse } from 'next/server';
import { getSubscription } from './../subscribe/route';

let subscription = getSubscription();

export async function POST() {
  try {
    console.log('Unsubscribed:', subscription);
    subscription = null;
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error clearing subscription:', error);
    return NextResponse.json({ error: 'Failed to clear subscription' }, { status: 500 });
  }
}
