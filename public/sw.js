/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || 'NextPWA Learner';
  const options = {
    body: data.body || 'You have a new notification.',
    icon: '/logo.svg',
    badge: '/logo.svg',
    ...data.options,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
