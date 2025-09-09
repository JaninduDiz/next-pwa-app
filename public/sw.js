self.addEventListener('push', (event) => {
  const data = event.data.json();
  const title = data.title || 'NextPWA Learner';
  const options = {
    body: data.body || 'You have a new message.',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Basic caching for offline support
const CACHE_NAME = 'nextpwa-cache-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/styles/globals.css', // Note: Next.js might hash this differently in production
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
