self.addEventListener('push', function (e) {
  const data = e.data ? e.data.json() : { title: 'Reptile Haven Reminder', body: 'Check your reptile care schedule.' };
  const options = {
    body: data.body || 'Time for feeding, watering, or health check.',
    icon: '/reptiles/geckos/crested-gecko.png',
    badge: '/next.svg',
    tag: data.tag || 'reptile-reminder',
    requireInteraction: true,
  };
  e.waitUntil(self.registration.showNotification(data.title || 'Reptile Haven', options));
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(clients.openWindow('https://reptile-haven.vercel.app/dashboard'));
});
